# Documentación CiclePark — Cómo iterar

Este directorio concentra **reglas de negocio** y **comportamiento esperado** de la app. Los archivos están separados para que podáis editar un ámbito sin mezclar todo en un solo documento.

## Estructura

| Archivo | Contenido |
|---------|-----------|
| [product-scope.md](./product-scope.md) | Objetivo del producto, MVP, fuera de alcance, glosario |
| [business-rules.md](./business-rules.md) | Reglas explícitas (datos, votos, fotos, estados, límites) |
| [feature-behavior.md](./feature-behavior.md) | Comportamiento por pantalla/funcionalidad, flujos, estados UI |
| [design-tokens.md](./design-tokens.md) | Transit (app), **Feedback**, y **§4 marcadores de mapa** (estados, trazo, pin colocación) |

## Convenciones al actualizar

1. **Cambios importantes:** añade una línea en la tabla de historial del archivo que toques (pie de cada documento).
2. **Decisiones abiertas:** usa el bloque `> **PENDIENTE**` o `[DECIDIR]` para marcar lo que falta cerrar con negocio/legal.
3. **Versión del conjunto:** cuando hagáis un “corte” para desarrollo, anotad fecha y breve nota aquí abajo.

## Historial del conjunto `docs/`

| Fecha | Nota |
|-------|------|
| 2026-03-23 | Creación inicial a partir del brief MVP (mapa, detalle, añadir, votos, fotos). |
| 2026-03-23 | Añadido `design-tokens.md` (App Transit + Feedback + especificación mapa §4). |
