# Tokens de color — CiclePark

**CiclePark Transit** es el nombre del **tema de app** (marca + interfaz): superficies, textos y **color primario teal**. No incluye verde ni rojo de seguridad.

**Regla de oro:** el **teal** (`app-primary`) es identidad y acciones de producto. El **verde** y el **rojo** existen **solo** en la capa **`feedback-*`** del sistema de diseño (mapa, votos, banners semánticos). Esos colores **no** deben configurarse como `secondary` ni `tertiary` del tema Transit en Stitch/Material.

---

## 1. Dos capas de color

| Capa | Rol | Ejemplos de uso |
|------|-----|------------------|
| **App** (tema **CiclePark Transit**) | Marca, superficies, texto, bordes, CTA principal | Fondos, barras, FAB “añadir”, Guardar, enlaces de marca |
| **Feedback** (sistema de diseño, aparte) | Estado semántico y **mapa** | Marcadores, 👍/👎, éxito/error |

Prohibido mezclar: no usar `app-primary` para “aparcamiento seguro”. Para eso existe `feedback-success`.

---

## 2. Capa **App** — tema CiclePark Transit

Solo colores **principales** de producto: neutros + teal. Origen: superficies legibles al aire libre y primario de marca.

### Modo claro

| Token | Hex | Uso |
|-------|-----|-----|
| `app-background` | `#F7F8F8` | Fondo raíz (pantallas no mapa / listas) |
| `app-surface` | `#FFFFFF` | Tarjetas, hojas, bottom bar |
| `app-surface-muted` | `#F3F4F4` | Zonas agrupadas, inputs inactivos |
| `app-surface-highest` | `#E8E9E9` | Separación suave entre bloques (sin líneas duras) |
| `app-text-primary` | `#1A1C1C` | Títulos y cuerpo principal |
| `app-text-secondary` | `#474747` | Subtítulos, metadata |
| `app-text-muted` | `#6E6E6E` | Placeholder, hints |
| `app-text-disabled` | `#9E9E9E` | Deshabilitado (cumplir también opacidad ~0.38 en controles) |
| `app-border-subtle` | `#C6C6C6` | Bordes fantasma, dashed upload (baja opacidad si aplica) |
| `app-primary` | `#00665C` | FAB, CTA principal de marca, enlaces activos |
| `app-primary-container` | `#008175` | Variante más clara (gradientes, estados hover en web) |
| `app-on-primary` | `#FFFFFF` | Texto/icono sobre `app-primary` |
| `app-primary-pressed` | `#005048` | Pulsado (Android ripple / iOS highlight) |
| `app-overlay-scrim` | `#1A1C1C` al **55%** | Modales, bottom sheet sobre mapa |

### Modo oscuro

| Token | Hex | Uso |
|-------|-----|-----|
| `app-background` | `#121212` | Fondo raíz |
| `app-surface` | `#1E1E1E` | Tarjetas y barras elevadas |
| `app-surface-muted` | `#2C2C2C` | Agrupación |
| `app-surface-highest` | `#383838` | Troughs, pistas de progreso |
| `app-text-primary` | `#E8E8E8` | Texto principal |
| `app-text-secondary` | `#B0B0B0` | Secundario |
| `app-text-muted` | `#8A8A8A` | Hints |
| `app-text-disabled` | `#616161` | Deshabilitado |
| `app-border-subtle` | `#5C5C5C` | Bordes sutiles |
| `app-primary` | `#4ECDC4` | CTA marca (teal legible sobre oscuro) |
| `app-primary-container` | `#006A60` | Contenedores tintados |
| `app-on-primary` | `#00332E` | Texto sobre primary claro en dark **[ajustar contraste en implementación]** |
| `app-primary-pressed` | `#3DBDB4` | Pulsado |
| `app-overlay-scrim` | `#000000` al **60%** | Scrim |

> **Nota:** Si `app-on-primary` en oscuro no pasa WCAG sobre `app-primary`, subir peso de texto o oscurecer el teal hasta cumplir **4.5:1**.

### `secondary` y `tertiary` en Stitch / Material 3

En muchas plantillas, **Secondary** y **Tertiary** son huecos obligatorios. En CiclePark **no** representan “seguro” ni “peligroso”. Si debes rellenarlos, usa **neutros fríos** que acompañen al teal; el verde y el rojo viven **únicamente** en `feedback-*`.

| Rol plantilla (M3 / Stitch) | Qué NO hacer | Asignación recomendada en CiclePark |
|-----------------------------|---------------|-------------------------------------|
| `secondary` | ❌ Verde | Neutro: p. ej. contenedor `#ECEFF1`, texto/icono `#546E7A` |
| `tertiary` | ❌ Rojo | Neutro: p. ej. `#78909C` para iconografía terciaria o divisores |

Tokens opcionales si quieres nombrarlos en código:

| Token | Hex (claro) | Uso |
|-------|-------------|-----|
| `app-neutral-secondary` | `#546E7A` | Botón outline, iconos de apoyo |
| `app-neutral-secondary-container` | `#ECEFF1` | Fondo de chip / filtro inactivo |
| `app-on-neutral-secondary-container` | `#37474F` | Texto sobre ese contenedor |
| `app-neutral-tertiary` | `#78909C` | Menos jerarquía visual (nunca semántica) |

Si la herramienta permite **dejar sin usar** secondary/tertiary en componentes, prioriza solo `app-*` de la tabla principal y `feedback-*` donde toque.

---

## 3. Capa **Feedback** (sistema de diseño)

Definición **independiente** del tema Transit. Verde y rojo **solo** aquí.

### Éxito / seguro (verde)

| Token | Hex (claro) | Hex (oscuro) | Uso |
|-------|-------------|--------------|-----|
| `feedback-success` | `#2E7D32` | `#81C784` | Marcador “seguro”, 👍 activo, éxito claro |
| `feedback-success-container` | `#E8F5E9` | `#1B3D1F` | Fondos de chip/banner positivo |
| `feedback-success-on-container` | `#1B5E20` | `#C8E6C9` | Texto/icono sobre container |

### Error / peligro (rojo)

| Token | Hex (claro) | Hex (oscuro) | Uso |
|-------|-------------|--------------|-----|
| `feedback-error` | `#C62828` | `#EF5350` | Marcador “no seguro”, 👎 activo, errores |
| `feedback-error-container` | `#FFEBEE` | `#3E1A1C` | Fondos de alerta suave |
| `feedback-error-on-container` | `#B71C1C` | `#FFCDD2` | Texto sobre container |

### Advertencia (opcional, MVP)

| Token | Hex (claro) | Hex (oscuro) | Uso |
|-------|-------------|--------------|-----|
| `feedback-warning` | `#F9A825` | `#FFD54F` | GPS impreciso, datos antiguos **[si se usa]** |
| `feedback-warning-container` | `#FFF8E1` | `#3D3500` | Fondo |
| `feedback-warning-on-container` | `#6D4C41` | `#FFECB3` | Texto |

### Sin datos / neutro (mapa)

| Token | Hex (claro) | Hex (oscuro) | Uso |
|-------|-------------|--------------|-----|
| `feedback-unknown` | `#757575` | `#9E9E9E` | Marcador sin votos / sin datos |
| `feedback-unknown-on-map` | `#FFFFFF` | `#121212` | Halo del pin sobre mapa |

### Trazo de pin (mapa)

| Token | Valor | Uso |
|-------|--------|-----|
| `map-pin-stroke` | `#FFFFFF` **2–3 px** | Contorno pins en mapa claro |
| `map-pin-stroke-dark` | `#1A1C1C` **2 px** | Contorno si el mapa es oscuro **[DECIDIR según tile]** |

> **Aplicación en el mapa:** forma, interacción y reglas de uso de estos tokens en pins están detalladas en la **§4 Especificación: marcadores de mapa**.

---

## 4. Especificación: marcadores de mapa

Apartado dedicado a los **pins de aparcamientos** sobre el mapa (no al pin de “colocar nueva ubicación” del flujo Añadir — ese usa **`app-primary`**, ver §4.4).

### 4.1 Objetivo

- Leer el **estado del spot** a golpe de vista (sol, una mano, poca atención).
- **Un solo sistema de color** para todos los mapas de la app: los rellenos salen **solo** de `feedback-*`; el teal **`app-primary`** no pinta pins de datos.

### 4.2 Estados del marcador → tokens

| Estado del spot | Token de relleno | Hex (modo claro) | Hex (modo oscuro) |
|-----------------|------------------|------------------|---------------------|
| Consenso / percepción **segura** | `feedback-success` | `#2E7D32` | `#81C784` |
| Consenso / percepción **no segura** | `feedback-error` | `#C62828` | `#EF5350` |
| **Sin datos** o neutro (sin votos o regla de negocio neutra) | `feedback-unknown` | `#757575` | `#9E9E9E` |

Los contenedores `feedback-*-container` no suelen usarse como relleno del pin; sirven para chips, leyendas o UI alrededor del mapa.

### 4.3 Trazo, sombra y legibilidad

| Propiedad | Token / valor | Nota |
|-----------|---------------|------|
| Contorno exterior del pin | `map-pin-stroke` `#FFFFFF` | Grosor **3 px** en modo claro (recomendado; mínimo 2 px). Separa el pin de calles y vegetación del tile. |
| Contorno en mapa / tiles oscuros | `map-pin-stroke-dark` `#1A1C1C` | **2 px** si el fondo del mapa es claro y el trazo blanco pierde contraste; **[DECIDIR]** según proveedor de mapas. |
| Halo interior opcional | `feedback-unknown-on-map` | Solo si el diseño usa doble anillo; no sustituye al relleno semántico. |
| Sombra del pin | — | Sombra suave y baja opacidad (p. ej. `rgba(26,28,28,0.2)`, offset Y 1–2 px, blur 4 px) **[DECIDIR]** para no competir con el trazo. |

### 4.4 Pin de colocación (Añadir aparcamiento) vs pin de spot

| Tipo | Color | Token |
|------|--------|--------|
| **Spot existente** (datos en el mapa) | Verde / rojo / gris según §4.2 | `feedback-success` / `feedback-error` / `feedback-unknown` |
| **Nueva ubicación** (usuario arrastra antes de guardar) | Teal de marca | `app-primary` `#00665C` + trazo `map-pin-stroke` |

Así se distingue “estoy creando” (app) de “esto es lo que piensa la comunidad” (feedback).

### 4.5 Ubicación del usuario

- Punto de **mi posición**: azul estándar del SDK de mapas **o** anillo en `app-primary` — **nunca** `feedback-success` / `feedback-error` (no confundir usuario con un spot).

### 4.6 Tamaño y accesibilidad

| Criterio | Valor orientativo |
|----------|-------------------|
| Área táctil mínima | ≥ **44 × 44 pt** (iOS HIG / Material), aunque el dibujo del pin sea más pequeño. |
| Tamaño visual del pin | **~24–32 pt** de ancho en base; escala con zoom del mapa **[DECIDIR]**. |
| Contraste | El relleno + trazo blanco debe distinguirse en exterior; no usar verdes/rojos pastel en el cuerpo del pin. |

### 4.7 Estados de interacción

| Interacción | Comportamiento sugerido |
|-------------|-------------------------|
| **Normal** | Colores §4.2 + trazo §4.3 |
| **Pulsado / seleccionado** | Ligera escala **1,05–1,1×** o anillo `app-primary` **2 px** alrededor del pin **[DECIDIR]** sin cambiar el relleno semántico. |
| **Cluster** | Badge con número sobre círculo que use `app-surface` + `app-text-primary` o `app-primary` **[DECIDIR]**; al expandir, pins siguen §4.2. |

### 4.8 Qué no hacer

- No usar `#00665C` como relleno de un spot “seguro”.
- No usar verde/rojo del tema M3 **Secondary/Tertiary** para pins (solo `feedback-*`).
- No mezclar dos significados en un solo pin (un color = un estado lógico).

### 4.9 Fragmento `theme.map` (referencia)

```ts
mapMarkers: {
  success: '#2E7D32',
  error: '#C62828',
  unknown: '#757575',
  pinStroke: '#FFFFFF',
  pinStrokeWidth: 3,
  placementPinFill: '#00665C', // app-primary — solo flujo Añadir
},
```

---

## 5. Mapeo rápido componente → token

| Componente | Token principal |
|------------|-----------------|
| FAB “+” añadir (estándar) | `app-primary` / `app-on-primary`; diámetro **~56 pt** |
| FAB “+” (Home sin resultados en zona) | Mismos colores; diámetro **~72–80 pt** — ver [feature-behavior.md](./feature-behavior.md) F1 |
| Botón Guardar | `app-primary` |
| Botón Cancelar / secundario UI | `app-surface-highest` + `app-text-primary` o `app-neutral-secondary` |
| Marcador sin datos | `feedback-unknown` + `map-pin-stroke` |
| Marcador seguro | `feedback-success` + `map-pin-stroke` |
| Marcador no seguro | `feedback-error` + `map-pin-stroke` |
| Voto 👍 / 👎 | `feedback-success*` / `feedback-error*` |
| Toasts semánticos | `feedback-*-container` + `feedback-*-on-container` |
| Skeleton | `app-surface-muted` → `app-surface` |
| Marcadores mapa (detalle) | §4 completa |

---

## 6. Stitch: qué configurar en CiclePark Transit

| Campo tema | Valor |
|------------|--------|
| Primary / marca | `#00665C` (claro) · teal oscuro según §2 dark |
| Surfaces / background / on-surface | Tokens **`app-*`** de la §2 |
| Secondary | **Neutro** §2 (p. ej. `#546E7A` / `#ECEFF1`), **nunca** verde |
| Tertiary | **Neutro** §2 (p. ej. `#78909C`), **nunca** rojo |
| Success / error en mapa y votos | No van al tema Transit: usar **`feedback-*`** y **§4** en componentes / lámina **CiclePark Color Tokens** |

---

## 7. Implementación sugerida (React Native)

```ts
export const lightTheme = {
  app: {
    background: '#F7F8F8',
    surface: '#FFFFFF',
    primary: '#00665C',
    onPrimary: '#FFFFFF',
    // …resto app-*
    neutralSecondary: '#546E7A',
    neutralTertiary: '#78909C',
  },
  feedback: {
    success: '#2E7D32',
    successContainer: '#E8F5E9',
    successOnContainer: '#1B5E20',
    error: '#C62828',
    errorContainer: '#FFEBEE',
    errorOnContainer: '#B71C1C',
    unknown: '#757575',
  },
  map: {
    pinStroke: '#FFFFFF',
    pinStrokeWidth: 3,
    markerSuccess: '#2E7D32',
    markerError: '#C62828',
    markerUnknown: '#757575',
    placementPin: '#00665C',
  },
};
```

Componentes de mapa (pins): **`theme.map`** + **`theme.feedback`** según **§4**. Chrome del mapa (barras, FAB): **`theme.app`**.

---

## 8. Referencia en Google Stitch

| Entregable | Descripción |
|------------|-------------|
| **CiclePark Color Tokens - Map Marker Spec Expansion** | Especificación **escrita** §4 en canvas: estados, trazo, pin de colocación vs feedback, usuario, 44pt, prohibiciones. |
| **CiclePark Color Tokens - Map Markers Expansion** | Pins grandes con hex (complemento visual de la §4). |
| **CiclePark Color Tokens Specification v2** | App + Feedback (contexto previo). |
| **CiclePark Home Map - Official Colors** | Mapa rediseñado: marcadores **solo** con esos hex; leyenda opcional; FAB `app-primary` **#00665C**. |
| **CiclePark Add Parking - Official Colors** | Pin central de ubicación = **#00665C** (no es feedback); resto `app-*`. |
| **Home Map — Empty State** | Sin pins; **FAB ampliado** (~72–80 pt); copy vacío cercano. |
| **CiclePark: Buscar en esta zona** | Pastilla superior **“Buscar en esta zona”**; FAB tamaño estándar; pins con tokens `feedback-*`. |

ID de proyecto: `3973785432635225853`.

---

### Historial de este archivo

| Fecha | Cambio |
|-------|--------|
| 2026-03-23 | Primera versión (App + Feedback, referencia Stitch). |
| 2026-03-23 | Eliminado Kinetic Mono; Transit = solo colores app; secondary/tertiary neutros; verde/rojo solo en `feedback-*`. |
| 2026-03-23 | Stitch: láminas “Official Colors” + expansión map markers alineadas a §3. |
| 2026-03-23 | Nueva **§4 Especificación: marcadores de mapa**; renumeración §5–§8. |
| 2026-03-23 | §5: FAB estándar vs ampliado (Home vacía); §8: pantallas Stitch Home estados. |
