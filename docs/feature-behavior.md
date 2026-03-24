# Feature behavior — CiclePark

Specification of **what the app does** in each flow: screens, states, transitions, and errors. Aligned with the MVP (map, detail, add).

---

## Implementation status (client) — March 2026

The following describes **what is implemented in the client** versus this spec; packages and folders are detailed in [README.md](./README.md) (*Technical stack and code*).

- **Navigation:** **Map**, **List**, and **Settings** tabs with a floating bar; stack includes **Profile** from the root. The product MVP mentioned few sections; the current shell already includes list/settings/profile as a base.
- **F1 Map:** map screen with `react-native-maps`, search/filter/locate UI, Unistyles theme, and components under `src/screens/map/`. Parity with every F1 UI state and flow (“Search this area”, loading spots by viewport, etc.) should be checked point by point against the numbered behavior below.
- **F2 Detail / F3 Add / F4 Photos:** this document remains the reference; wire each flow to real screens and APIs when backend and data exist.
- **i18n:** Spanish, English, and Catalan; sync with device language and persisted preferences.
- **Theme:** light/dark via tokens and `react-native-unistyles`.

---

## Conventions

- **Entry:** how the user arrives.
- **Behaviour:** what happens on interaction.
- **Exit:** next screen or effect.
- **States:** empty, loading, error, success.

---

## F1 — Home / Map

### Purpose

Discover nearby spots and decide whether to go to one or add a new one.

### Entry

- App launch (after splash / permissions if applicable).

### Behavior

1. Request **location permission** if not granted; explain why in one short paragraph.
2. Centre the map on the **user position** when signal exists; if not, **[TBD]** default view.
3. Load spots in **viewport** or radius **[TBD]** around the user.
4. **Markers:** color per business rules ([business-rules.md](./business-rules.md) §4).
5. **Tap marker:** navigate to **Spot detail** (F2).
6. **FAB `+`:** navigate to **Add parking** (F3).
7. **Recenter:** animate map to current location; if GPS is off, show an actionable message (open settings / explanation).
8. **Map moved (viewport differs from last fetch):** show at the **top** (below header / notch) a pill control **“Search this area”**, Google Maps–style. On tap, **reload** spots for the current visible area (bounds or centre+zoom **[TBD]**). While loading, show loading state on the button or disable it **[TBD]**; on success, **hide** the pill until the map is out of sync with the last loaded result again.
9. **“Map moved” threshold:** consider showing the pill if the map centre moved more than **[TBD: e.g. 200 m or 10% of viewport]** from the centre used in the last load, or if bounds change materially.

### UI states

| State | Behavior |
|-------|-----------|
| Initial load | Map visible with **skeleton** or discreet overlay spinner; do not block the base map if tiles already show. |
| **No parking in loaded area** (0 results after request) | Map **without pins**. **Enlarged FAB “+”** vs normal state (same action: Add parking) to prioritise contribution. Short optional copy above or below the FAB, e.g. *“No parking here”* / *“Be the first”*. Recenter and rest of UI unchanged. |
| **Map panned away from loaded data** | Top pill **“Search this area”** visible; FAB **normal size** (unless empty state applies simultaneously — see note). |
| Load after “Search this area” | Keep map interactive when possible; indicator on pill or light overlay; avoid duplicate burst requests **[TBD debounce]**. |
| Spots in area | FAB **normal** size; pill hidden if viewport matches last fetch. |
| Network error | Banner or toast + **Retry**; keep last data in cache **[TBD]**. |
| Location denied | Generic map + CTA for permission or search **[TBD]**. |

> **Note:** If there are **0 spots** and the user has **not** tapped “Search this area” but the map is already misaligned, you may show **both**: top pill + large FAB; or prioritise only large FAB **[TBD]** to avoid clutter.

### Exit

- Detail (F2), Add (F3), or stay on map.

---

## F2 — Spot detail

### Purpose

See visual evidence and **vote** or **add a photo** quickly.

### Entry

- Tap marker from F1.

### Behavior

1. Show **gallery** at top; **swipe** between photos if more than one.
2. Show **aggregated score** per BR-VT-03.
3. **Vote:** tap 👍 or 👎 → immediate feedback (optimistic UI **[TBD]**); respect BR-VT-02.
4. **Add photo:** open camera / gallery picker → upload → new photo visible when complete.
5. **Back:** return to map keeping position and zoom reasonable.

### UI states

| State | Behavior |
|-------|-----------|
| Loading | Skeleton in image area; disabled button placeholders if applicable. |
| No photos | Clear empty state + prominent “Add photo” CTA. |
| Load error | Message + retry; do not leave a blank screen. |
| Vote / upload error | Revert optimistic state; short message. |

### Exit

- Map (F1) or others **[TBD]** (e.g. share in a future iteration).

---

## F3 — Add parking

### Purpose

Create a spot with **confirmed location** and **photo** per business rules.

### Entry

- FAB from F1.

### Behavior

1. Map with **draggable pin** or fixed crosshair and map underneath **[TBD UX pattern]**.
2. **Confirm location:** advance to photo step or enable primary CTA **[TBD steps]**.
3. **Photo:** satisfy BR-PH-01; preview before save **[TBD]**.
4. **Save:** validate coordinates + photo rules; send to backend; on success, **[TBD]** go to new spot detail or map with pin selected.
5. **Cancel:** confirm if there is unsaved data **[TBD]**.

### UI states

| State | Behavior |
|-------|-----------|
| Saving | Primary button loading; prevent double submit. |
| Offline | Banner (as in Stitch design) + queue or block **[TBD BR-SY-01]**. |
| Validation | If photo required and missing, focus upload area + short message. |

### Exit

- Map (F1) or new spot detail (F2).

---

## F4 — Permissions and first launch (cross-cutting)

> **TODO:** Exact order (location → notifications → legal) and whether there is a one-screen onboarding.

### Minimum proposed behavior

- Explain **why** location is needed before the system dialog.
- Do not block the whole app if denied; degrade to F1 with a “no location” state.

---

## MVP navigation summary

```text
F1 Map  ──tap pin──►  F2 Detail
   │                        │
   │                        └── vote / photo
   │
   ├── FAB+  ──►  F3 Add  ──► success ──► F1 or F2
   └── "Search this area"  ──► reload spots (visible area / viewport)
```

---

### Change history (this file)

| Date | Change |
|------|--------|
| 2026-03-23 | Initial version: F1–F4 and UI states. |
| 2026-03-23 | F1: empty state (large FAB), “Search this area”, viewport threshold. |
| 2026-03-24 | Added *Implementation status* and link to technical docs in `README.md`. |
| 2026-03-24 | Translated to English. |
