# Reglas de negocio — CiclePark

Documento vivo. Las reglas marcadas como **PENDIENTE** o **[DECIDIR]** deben cerrarse antes o durante el desarrollo.

---

## 1. Entidad: Spot (aparcamiento)

| ID | Regla | Estado |
|----|--------|--------|
| BR-SP-01 | Un spot tiene **coordenadas** (lat/lng) y opcionalmente metadatos mínimos (p. ej. dirección aproximada si el backend la resuelve). | Activa |
| BR-SP-02 | Dos spots no pueden ocupar **exactamente** las mismas coordenadas **[DECIDIR umbral de fusión]** (p. ej. &lt; 10 m → mismo spot o sugerir unificar). | Pendiente |
| BR-SP-03 | El creador del spot queda registrado en servidor si hay autenticación; si el MVP es anónimo, **[DECIDIR]** política de abuso. | Pendiente |

---

## 2. Fotos

| ID | Regla | Estado |
|----|--------|--------|
| BR-PH-01 | Al crear un spot, la foto es **[DECIDIR: obligatoria vs “fuertemente recomendada”]**; si es opcional, el spot puede nacer sin foto y mostrar estado vacío en detalle. | Pendiente |
| BR-PH-02 | Una foto pertenece a **un** spot; orden por fecha de subida (más reciente primero) salvo **[DECIDIR]**. | Activa (propuesta) |
| BR-PH-03 | Límites: tamaño máximo, formato (JPEG/WEBP), y número máximo de fotos por spot/usuario **[DECIDIR]**. | Pendiente |
| BR-PH-04 | Moderación: **[DECIDIR]** manual, reportes, filtro automático — MVP puede ser “reportar” en iteración posterior. | Pendiente |

---

## 3. Votos (seguro / no seguro)

| ID | Regla | Estado |
|----|--------|--------|
| BR-VT-01 | Voto **binario**: “Seguro” / “No seguro” (equivalente 👍 / 👎). | Activa |
| BR-VT-02 | **Un voto por usuario y spot** **[DECIDIR]** si se permite cambiar de opinión (recomendado: sí, último voto gana). | Pendiente |
| BR-VT-03 | Agregación mostrada en UI: **[DECIDIR]** formato exacto (`+12 / -3`, porcentaje, ambos). | Pendiente |
| BR-VT-04 | Con **cero votos**, el marcador es **neutro** (sin sesgo positivo/negativo). | Activa |
| BR-VT-05 | Criterio de color del marcador **[DECIDIR]**: p. ej. verde si `positivos - negativos ≥ umbral` y ratio &gt; X; rojo si al revés; gris si empate bajo umbral o sin datos. | Pendiente |

---

## 4. Estados del marcador en mapa

| Estado | Significado propuesto |
|--------|------------------------|
| **Neutro** | Sin votos o empate / por debajo del umbral **[DECIDIR]**. |
| **Positivo (verde)** | Consenso favorable según fórmula acordada. |
| **Negativo (rojo)** | Consenso desfavorable según fórmula acordada. |

> **PENDIENTE:** Definir fórmula y si los spots **sin foto** se tratan distinto en el mapa (p. ej. siempre neutro hasta primera foto).

---

## 5. Privacidad, legal y ubicación

| ID | Regla | Estado |
|----|--------|--------|
| BR-LC-01 | La app solicita permiso de **ubicación**; sin permiso, el mapa puede centrarse en una ciudad por defecto o pedir búsqueda **[DECIDIR]**. | Pendiente |
| BR-LC-02 | Texto legal: Términos, privacidad, uso de imágenes **[DECIDIR]** quién redacta y cuándo se muestra (registro vs primera contribución). | Pendiente |

---

## 6. Sincronización y offline (MVP)

| ID | Regla | Estado |
|----|--------|--------|
| BR-SY-01 | MVP: **[DECIDIR]** solo online vs cola offline para crear spot/voto/foto. | Pendiente |
| BR-SY-02 | En error de red: mensaje claro y reintento; no perder datos del formulario si es posible. | Activa (propuesta) |

---

### Historial de este archivo

| Fecha | Cambio |
|-------|--------|
| 2026-03-23 | Versión inicial con IDs de regla y huecos explícitos para decisión. |
