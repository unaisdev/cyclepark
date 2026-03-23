# Alcance de producto — CiclePark

## Objetivo

Ayudar al usuario a responder rápidamente: **“¿Puedo aparcar mi bici aquí con seguridad?”**

La app prioriza **velocidad**, **claridad visual** y **contribución fácil** (fotos y votos).

## Usuario objetivo

- Ciclistas urbanos, uso diario u ocasional.
- Uso en calle, a menudo con **una mano** y poco tiempo.
- Baja tolerancia a curva de aprendizaje.

## Principios de UX (recordatorio)

- Cero fricción; decisión en **menos de ~3 segundos** cuando sea posible.
- **Fotos antes que texto** para generar confianza.
- Fomentar **contribución** sin complicar el consumo.

## MVP — Incluido

- **Home / mapa:** aparcamientos cercanos con marcadores por estado (sin datos / positivo / negativo).
- **Detalle de aparcamiento:** galería, puntuación simple, votos 👍 / 👎, añadir foto.
- **Añadir aparcamiento:** confirmar ubicación en mapa, foto (requerida o fuertemente recomendada según reglas de negocio), guardar.

## Fuera de alcance (MVP explícito)

- Perfiles de usuario, social, comentarios largos, gamificación.
- Navegación compleja o muchas secciones.

## Glosario

| Término | Definición operativa |
|---------|----------------------|
| **Spot** | Punto de aparcamiento en el mapa (entidad principal). |
| **Voto** | Indicación binaria de percepción de seguridad (a favor / en contra). |
| **Estado del marcador** | Derivado de agregados de votos y/o falta de datos (ver [business-rules.md](./business-rules.md)). |
| **Contribución** | Crear spot y/o subir foto y/o votar. |

## Métricas de éxito (borrador)

> **PENDIENTE:** Definir KPIs (p. ej. tiempo hasta primera decisión, tasa de contribución, retención).

---

### Historial de este archivo

| Fecha | Cambio |
|-------|--------|
| 2026-03-23 | Versión inicial. |
