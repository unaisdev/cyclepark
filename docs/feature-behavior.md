# Comportamiento por funcionalidad — CiclePark

Especificación de **qué hace la app** en cada flujo: pantallas, estados, transiciones y errores. Alineado al MVP (mapa, detalle, añadir).

---

## Convenciones

- **Entrada:** cómo llega el usuario.
- **Comportamiento:** qué ocurre al interactuar.
- **Salida:** siguiente pantalla o efecto.
- **Estados:** vacío, carga, error, éxito.

---

## F1 — Home / Mapa

### Propósito

Descubrir spots cercanos y decidir si acercarse a uno o añadir uno nuevo.

### Entrada

- Apertura de la app (tras splash / permisos si aplica).

### Comportamiento

1. Solicitar **permiso de ubicación** si no está concedido; explicar en un solo párrafo por qué.
2. Centrar mapa en **posición del usuario** cuando haya señal; si no, **[DECIDIR]** vista por defecto.
3. Cargar spots en **viewport** o radio **[DECIDIR]** alrededor del usuario.
4. **Marcadores:** mostrar color según reglas de negocio ([business-rules.md](./business-rules.md) §4).
5. **Toque en marcador:** navegar a **Detalle del spot** (F2).
6. **FAB `+`:** navegar a **Añadir aparcamiento** (F3).
7. **Recentrar:** animar mapa a la ubicación actual; si GPS desactivado, mostrar mensaje accionable (abrir ajustes / explicación).
8. **Mapa movido (viewport distinto al último fetch):** mostrar en la **zona superior** (debajo del header / notch) un control tipo pastilla **“Buscar en esta zona”**, estilo Google Maps. Al pulsar, **volver a cargar** spots para el área visible actual (bounds o centro+zoom **[DECIDIR]**). Mientras carga, el botón muestra estado cargando o se deshabilita **[DECIDIR]**; al terminar con éxito, **ocultar** la pastilla hasta que el mapa vuelva a desalinearse del último resultado cargado.
9. **Umbral de “mapa movido”:** considerar mostrar la pastilla si el centro del mapa se alejó más de **[DECIDIR: p. ej. 200 m o 10 % del viewport]** respecto al centro usado en la última carga, o si los bounds cambian de forma relevante.

### Estados UI

| Estado | Comportamiento |
|--------|----------------|
| Carga inicial | Mapa visible con **skeleton** o spinner discreto en overlay; no bloquear mapa base si ya hay tiles. |
| **Sin parkings en la zona cargada** (resultado 0 tras petición) | Mapa **sin pins**. **FAB “+” ampliado** respecto al estado normal (misma acción: Añadir aparcamiento) para priorizar la contribución. Texto corto opcional encima o bajo el FAB, p. ej. *“No hay aparcamientos aquí”* / *“Sé el primero”*. Recenter y resto de UI sin cambios. |
| **Mapa desplazado respecto a datos cargados** | Pastilla superior **“Buscar en esta zona”** visible; FAB en **tamaño normal** (salvo que simultáneamente aplique estado vacío — ver nota). |
| Carga tras “Buscar en esta zona” | Mantener mapa interactivo si es posible; indicador en la pastilla o overlay ligero; no duplicar peticiones en ráfaga **[DECIDIR debounce]**. |
| Con spots en zona | FAB tamaño **normal**; pastilla oculta si el viewport coincide con el último fetch. |
| Error de red | Banner o toast + **Reintentar**; conservar últimos datos en caché **[DECIDIR]**. |
| Ubicación denegada | Mapa genérico + CTA para permiso o búsqueda **[DECIDIR]**. |

> **Nota:** Si hay **0 spots** y el usuario **aún no** ha pulsado “Buscar en esta zona” pero el mapa ya está desalineado, pueden mostrarse **ambos**: pastilla arriba + FAB grande; o priorizar solo FAB grande **[DECIDIR]** para no saturar.

### Salida

- Detalle (F2), Añadir (F3), o permanencia en mapa.

---

## F2 — Detalle de spot

### Propósito

Ver evidencia visual y **votar** o **añadir foto** rápidamente.

### Entrada

- Toque en marcador desde F1.

### Comportamiento

1. Mostrar **galería** arriba; **swipe** entre fotos si hay más de una.
2. Mostrar **puntuación agregada** según BR-VT-03.
3. **Votar:** toque en 👍 o 👎 → feedback inmediato (optimistic UI **[DECIDIR]**); respetar BR-VT-02.
4. **Añadir foto:** abrir selector cámara / galería → subida → nueva foto visible al completar.
5. **Volver:** regreso al mapa manteniendo posición y zoom razonable.

### Estados UI

| Estado | Comportamiento |
|--------|----------------|
| Carga | Skeleton en zona de imagen; placeholders en botones deshabilitados si aplica. |
| Sin fotos | Empty state claro + CTA “Añadir foto” prominente. |
| Error de carga | Mensaje + reintentar; no dejar pantalla en blanco. |
| Error al votar / subir | Revertir estado optimista; mensaje breve. |

### Salida

- Mapa (F1) u otras **[DECIDIR]** (p. ej. compartir en iteración futura).

---

## F3 — Añadir aparcamiento

### Propósito

Crear un spot con **ubicación confirmada** y **foto** según negocio.

### Entrada

- FAB desde F1.

### Comportamiento

1. Mapa con **pin arrastrable** o crhair fijo y mapa bajo él **[DECIDIR patrón UX]**.
2. **Confirmar ubicación:** avanza a paso de foto o habilita CTA principal **[DECIDIR pasos]**.
3. **Foto:** cumplir BR-PH-01; preview antes de guardar **[DECIDIR]**.
4. **Guardar:** validar coordenadas + reglas de foto; enviar al backend; al éxito, **[DECIDIR]** ir a detalle del nuevo spot o al mapa con el pin seleccionado.
5. **Cancelar:** confirmar si hay datos no guardados **[DECIDIR]**.

### Estados UI

| Estado | Comportamiento |
|--------|----------------|
| Carga al guardar | Botón principal en loading; evitar doble envío. |
| Sin conexión | Banner (como en diseño Stitch) + cola o bloqueo **[DECIDIR BR-SY-01]**. |
| Validación | Si falta foto obligatoria, foco en área de subida + mensaje corto. |

### Salida

- Mapa (F1) o Detalle del nuevo spot (F2).

---

## F4 — Permisos y primera ejecución (transversal)

> **PENDIENTE:** Orden exacto (ubicación → notificaciones → legal) y si hay onboarding de 1 pantalla.

### Comportamiento mínimo propuesto

- Explicar **por qué** se pide ubicación antes del diálogo del sistema.
- No bloquear la app entera si se deniega; degradar a F1 con estado “sin ubicación”.

---

## Resumen de navegación MVP

```text
F1 Mapa  ──tap pin──►  F2 Detalle
   │                        │
   │                        └── votar / foto
   │
   ├── FAB+  ──►  F3 Añadir  ──►  éxito ──►  F1 o F2
   └── "Buscar en esta zona"  ──►  recarga spots (área visible / viewport)
```

---

### Historial de este archivo

| Fecha | Cambio |
|-------|--------|
| 2026-03-23 | Versión inicial: F1–F4 y estados UI. |
| 2026-03-23 | F1: estado vacío (FAB grande), “Buscar en esta zona”, umbral viewport. |
