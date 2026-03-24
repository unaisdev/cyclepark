# Color tokens — CiclePark

**CiclePark Transit** is the name of the **app theme** (brand + UI): surfaces, text, and **primary teal**. It does not include safety green or red.

**Golden rule:** **teal** (`app-primary`) is brand identity and product actions. **Green** and **red** exist **only** in the **`feedback-*`** design-system layer (map, votes, semantic banners). Those colors must **not** be configured as Transit `secondary` or `tertiary` in Stitch/Material.

---

## 1. Two color layers

| Layer | Role | Example uses |
|-------|------|----------------|
| **App** ( **CiclePark Transit** theme) | Brand, surfaces, text, borders, primary CTA | Backgrounds, bars, “add” FAB, Save, brand links |
| **Feedback** (design system, separate) | Semantic state and **map** | Markers, 👍/👎, success/error |

Do not mix: do not use `app-primary` for “safe parking”. Use `feedback-success` for that.

---

## 2. **App** layer — CiclePark Transit theme

Core **product** colors only: neutrals + teal. Rationale: readable outdoors and brand primary.

### Light mode

| Token | Hex | Use |
|-------|-----|-----|
| `app-background` | `#F7F8F8` | Root background (non-map screens / lists) |
| `app-surface` | `#FFFFFF` | Cards, sheets, bottom bar |
| `app-surface-muted` | `#F3F4F4` | Grouped areas, inactive inputs |
| `app-surface-highest` | `#E8E9E9` | Soft separation between blocks (no hard lines) |
| `app-text-primary` | `#1A1C1C` | Titles and main body |
| `app-text-secondary` | `#474747` | Subtitles, metadata |
| `app-text-muted` | `#6E6E6E` | Placeholder, hints |
| `app-text-disabled` | `#9E9E9E` | Disabled (also use ~0.38 opacity on controls) |
| `app-border-subtle` | `#C6C6C6` | Ghost borders, dashed upload (lower opacity if needed) |
| `app-primary` | `#00665C` | FAB, brand primary CTA, active links |
| `app-primary-container` | `#008175` | Lighter variant (gradients, hover on web) |
| `app-on-primary` | `#FFFFFF` | Text/icon on `app-primary` |
| `app-primary-pressed` | `#005048` | Pressed (Android ripple / iOS highlight) |
| `app-overlay-scrim` | `#1A1C1C` at **55%** | Modals, bottom sheet over map |

### Dark mode

| Token | Hex | Use |
|-------|-----|-----|
| `app-background` | `#121212` | Root background |
| `app-surface` | `#1E1E1E` | Cards and elevated bars |
| `app-surface-muted` | `#2C2C2C` | Grouping |
| `app-surface-highest` | `#383838` | Troughs, progress tracks |
| `app-text-primary` | `#E8E8E8` | Main text |
| `app-text-secondary` | `#B0B0B0` | Secondary |
| `app-text-muted` | `#8A8A8A` | Hints |
| `app-text-disabled` | `#616161` | Disabled |
| `app-border-subtle` | `#5C5C5C` | Subtle borders |
| `app-primary` | `#4ECDC4` | Brand CTA (readable teal on dark) |
| `app-primary-container` | `#006A60` | Tinted containers |
| `app-on-primary` | `#00332E` | Text on light primary in dark **[tune contrast in implementation]** |
| `app-primary-pressed` | `#3DBDB4` | Pressed |
| `app-overlay-scrim` | `#000000` at **60%** | Scrim |

> **Note:** If `app-on-primary` in dark fails WCAG on `app-primary`, increase text weight or darken teal until **4.5:1**.

### `secondary` and `tertiary` in Stitch / Material 3

Many templates require **Secondary** and **Tertiary** slots. In CiclePark they do **not** mean “safe” or “dangerous”. If you must fill them, use **cool neutrals** alongside teal; green and red live **only** in `feedback-*`.

| Template role (M3 / Stitch) | What **not** to do | Recommended mapping in CiclePark |
|-----------------------------|--------------------|----------------------------------|
| `secondary` | ❌ Green | Neutral: e.g. container `#ECEFF1`, text/icon `#546E7A` |
| `tertiary` | ❌ Red | Neutral: e.g. `#78909C` for tertiary icons or dividers |

Optional tokens if you name them in code:

| Token | Hex (light) | Use |
|-------|-------------|-----|
| `app-neutral-secondary` | `#546E7A` | Outline button, support icons |
| `app-neutral-secondary-container` | `#ECEFF1` | Inactive chip / filter background |
| `app-on-neutral-secondary-container` | `#37474F` | Text on that container |
| `app-neutral-tertiary` | `#78909C` | Lower visual hierarchy (never semantic) |

If the tool allows **leaving** secondary/tertiary unused in components, prefer only main-table `app-*` and `feedback-*` where needed.

---

## 3. **Feedback** layer (design system)

Defined **independently** of the Transit theme. Green and red **only** here.

### Success / safe (green)

| Token | Hex (light) | Hex (dark) | Use |
|-------|---------------|------------|-----|
| `feedback-success` | `#2E7D32` | `#81C784` | “Safe” marker, active 👍, clear success |
| `feedback-success-container` | `#E8F5E9` | `#1B3D1F` | Positive chip/banner backgrounds |
| `feedback-success-on-container` | `#1B5E20` | `#C8E6C9` | Text/icon on container |

### Error / danger (red)

| Token | Hex (light) | Hex (dark) | Use |
|-------|---------------|------------|-----|
| `feedback-error` | `#C62828` | `#EF5350` | “Not safe” marker, active 👎, errors |
| `feedback-error-container` | `#FFEBEE` | `#3E1A1C` | Soft alert backgrounds |
| `feedback-error-on-container` | `#B71C1C` | `#FFCDD2` | Text on container |

### Warning (optional, MVP)

| Token | Hex (light) | Hex (dark) | Use |
|-------|---------------|------------|-----|
| `feedback-warning` | `#F9A825` | `#FFD54F` | Imprecise GPS, stale data **[if used]** |
| `feedback-warning-container` | `#FFF8E1` | `#3D3500` | Background |
| `feedback-warning-on-container` | `#6D4C41` | `#FFECB3` | Text |

### No data / neutral (map)

| Token | Hex (light) | Hex (dark) | Use |
|-------|---------------|------------|-----|
| `feedback-unknown` | `#757575` | `#9E9E9E` | Marker with no votes / no data |
| `feedback-unknown-on-map` | `#FFFFFF` | `#121212` | Pin halo on map |

### Pin stroke (map)

| Token | Value | Use |
|-------|--------|-----|
| `map-pin-stroke` | `#FFFFFF` **2–3 px** | Pin outline on light map |
| `map-pin-stroke-dark` | `#1A1C1C` **2 px** | Outline if map/tiles are dark **[TBD by tile provider]** |

> **Map application:** shape, interaction, and use of these tokens on pins are detailed in **§4 Specification: map markers**.

---

## 4. Specification: map markers

Dedicated to **parking pins** on the map (not the “place new location” pin in Add flow — that uses **`app-primary`**, see §4.4).

### 4.1 Goals

- Read **spot state** at a glance (sunlight, one hand, low attention).
- **One color system** for all in-app maps: fills come **only** from `feedback-*`; teal **`app-primary`** does not paint data pins.

### 4.2 Marker states → tokens

| Spot state | Fill token | Hex (light mode) | Hex (dark mode) |
|------------|------------|------------------|-----------------|
| **Safe** consensus / perception | `feedback-success` | `#2E7D32` | `#81C784` |
| **Not safe** consensus / perception | `feedback-error` | `#C62828` | `#EF5350` |
| **No data** or neutral (no votes or neutral business rule) | `feedback-unknown` | `#757575` | `#9E9E9E` |

`feedback-*-container` tokens are usually not pin fills; they suit chips, legends, or UI around the map.

### 4.3 Stroke, shadow, legibility

| Property | Token / value | Note |
|----------|---------------|------|
| Outer pin outline | `map-pin-stroke` `#FFFFFF` | **3 px** in light mode (recommended; minimum 2 px). Separates pin from streets and map vegetation. |
| Outline on dark map / tiles | `map-pin-stroke-dark` `#1A1C1C` | **2 px** if the map background is light and white stroke loses contrast; **[TBD]** per map provider. |
| Optional inner halo | `feedback-unknown-on-map` | Only if the design uses a double ring; does not replace semantic fill. |
| Pin shadow | — | Soft, low opacity (e.g. `rgba(26,28,28,0.2)`, Y offset 1–2 px, blur 4 px) **[TBD]** so it does not compete with stroke. |

### 4.4 Placement pin (Add parking) vs spot pin

| Type | Color | Token |
|------|--------|--------|
| **Existing spot** (data on map) | Green / red / gray per §4.2 | `feedback-success` / `feedback-error` / `feedback-unknown` |
| **New location** (user drags before save) | Brand teal | `app-primary` `#00665C` + stroke `map-pin-stroke` |

This separates “I am creating” (app) from “what the community thinks” (feedback).

### 4.5 User location

- **My position** dot: map SDK default blue **or** ring in `app-primary` — **never** `feedback-success` / `feedback-error` (do not confuse the user with a spot).

### 4.6 Size and accessibility

| Criterion | Guideline |
|-----------|-----------|
| Minimum touch target | ≥ **44 × 44 pt** (iOS HIG / Material), even if the pin graphic is smaller. |
| Visual pin size | **~24–32 pt** wide at baseline; scale with map zoom **[TBD]**. |
| Contrast | Fill + white stroke must read outdoors; avoid pastel greens/reds on the pin body. |

### 4.7 Interaction states

| Interaction | Suggested behavior |
|-------------|---------------------|
| **Default** | Colors §4.2 + stroke §4.3 |
| **Pressed / selected** | Slight scale **1.05–1.1×** or **2 px** `app-primary` ring **[TBD]** without changing semantic fill. |
| **Cluster** | Badge with number on circle using `app-surface` + `app-text-primary` or `app-primary` **[TBD]**; when expanded, pins follow §4.2. |

### 4.8 Do not

- Do not use `#00665C` as fill for a “safe” spot.
- Do not use M3 **Secondary/Tertiary** green/red for pins (only `feedback-*`).
- Do not mix two meanings in one pin (one color = one logical state).

### 4.9 `theme.map` snippet (reference)

```ts
mapMarkers: {
  success: '#2E7D32',
  error: '#C62828',
  unknown: '#757575',
  pinStroke: '#FFFFFF',
  pinStrokeWidth: 3,
  placementPinFill: '#00665C', // app-primary — Add flow only
},
```

---

## 5. Quick component → token map

| Component | Primary token |
|-----------|----------------|
| Standard “+” add FAB | `app-primary` / `app-on-primary`; diameter **~56 pt** |
| “+” FAB (Home with no results in area) | Same colors; diameter **~72–80 pt** — see [feature-behavior.md](./feature-behavior.md) F1 |
| Save button | `app-primary` |
| Cancel / secondary UI | `app-surface-highest` + `app-text-primary` or `app-neutral-secondary` |
| No-data marker | `feedback-unknown` + `map-pin-stroke` |
| Safe marker | `feedback-success` + `map-pin-stroke` |
| Not-safe marker | `feedback-error` + `map-pin-stroke` |
| 👍 / 👎 votes | `feedback-success*` / `feedback-error*` |
| Semantic toasts | `feedback-*-container` + `feedback-*-on-container` |
| Skeleton | `app-surface-muted` → `app-surface` |
| Map markers (detail) | Full §4 |

---

## 6. Stitch: what to set in CiclePark Transit

| Theme field | Value |
|-------------|--------|
| Primary / brand | `#00665C` (light) · dark teal per §2 dark |
| Surfaces / background / on-surface | **`app-*`** tokens from §2 |
| Secondary | **Neutral** §2 (e.g. `#546E7A` / `#ECEFF1`), **never** green |
| Tertiary | **Neutral** §2 (e.g. `#78909C`), **never** red |
| Success / error on map and votes | Not in Transit theme: use **`feedback-*`** and **§4** in components / **CiclePark Color Tokens** sheet |

---

## 7. Suggested implementation (React Native)

```ts
export const lightTheme = {
  app: {
    background: '#F7F8F8',
    surface: '#FFFFFF',
    primary: '#00665C',
    onPrimary: '#FFFFFF',
    // …remaining app-*
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

Map components (pins): **`theme.map`** + **`theme.feedback`** per **§4**. Map chrome (bars, FAB): **`theme.app`**.

---

## 8. Reference in Google Stitch

| Deliverable | Description |
|-------------|-------------|
| **CiclePark Color Tokens - Map Marker Spec Expansion** | Written spec §4 on canvas: states, stroke, placement vs feedback pin, user, 44pt, prohibitions. |
| **CiclePark Color Tokens - Map Markers Expansion** | Large pins with hex (visual complement to §4). |
| **CiclePark Color Tokens Specification v2** | App + Feedback (prior context). |
| **CiclePark Home Map - Official Colors** | Redesigned map: markers **only** with these hex; optional legend; FAB `app-primary` **#00665C**. |
| **CiclePark Add Parking - Official Colors** | Central location pin = **#00665C** (not feedback); rest `app-*`. |
| **Home Map — Empty State** | No pins; **enlarged FAB** (~72–80 pt); nearby empty copy. |
| **CiclePark: Buscar en esta zona** | Top pill **“Search this area”**; standard-size FAB; pins with `feedback-*` tokens. |

Project ID: `3973785432635225853`.

---

### Change history (this file)

| Date | Change |
|------|--------|
| 2026-03-23 | First version (App + Feedback, Stitch reference). |
| 2026-03-23 | Removed Kinetic Mono; Transit = app colors only; secondary/tertiary neutral; green/red only in `feedback-*`. |
| 2026-03-23 | Stitch: “Official Colors” sheets + map marker expansion aligned to §3. |
| 2026-03-23 | New **§4 Specification: map markers**; renumber §5–§8. |
| 2026-03-23 | §5: standard vs enlarged FAB (empty Home); §8: Stitch Home states. |
| 2026-03-24 | Translated to English. |
