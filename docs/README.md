# CiclePark documentation — How we iterate

This directory holds **business rules** and **expected app behavior**. Files are split so you can edit one area without mixing everything into a single document.

## Structure

| File | Contents |
|------|----------|
| [android-maps-and-pre-builds.md](./android-maps-and-pre-builds.md) | Android **PRE** vs standard `applicationId`, **Google Maps** keys, `local.properties`, Gradle/env secrets |
| [product-scope.md](./product-scope.md) | Product goal, MVP, out of scope, glossary |
| [business-rules.md](./business-rules.md) | Explicit rules (data, votes, photos, states, limits) |
| [feature-behavior.md](./feature-behavior.md) | Behavior per screen/feature, flows, UI states |
| [design-tokens.md](./design-tokens.md) | Transit (app), **Feedback**, and **§4 map markers** (states, stroke, pin placement) |
| [git-conventions.md](./git-conventions.md) | Commit message convention (Conventional Commits) and atomic commits |

## Conventions when updating

1. **Material changes:** add a line to the change history table at the bottom of the file you edit.
2. **Open decisions:** use `> **TODO**` or `[TBD]` for items pending product/legal sign-off.
3. **Set snapshot:** when you cut a release for development, note the date and a short note in the history below.

## Technical stack and code (March 2026)

The app lives at the repo root (`package.json`, `app.json`, `index.ts`). Product code is under **`src/`** (the entry used to be root `App.tsx`; the root component is now registered from `index.ts` → `src/App.tsx`).

### Main versions

| Area | Version / note |
|------|----------------|
| Expo SDK | ~54 |
| React | 19.x |
| React Native | 0.81.x |
| TypeScript | ~5.7 (dev) |

### Useful scripts

| Script | Purpose |
|--------|---------|
| `yarn start` / `npm run start` | Expo with **dev client** (`expo start --dev-client`). |
| `yarn start:go` | Expo Go (`expo start`). |
| `yarn start:clean` | Bundler with clean cache (`expo start -c`). |
| `yarn android` / `yarn ios` | `expo run:android` / `expo run:ios` (native build after prebuild if applicable). |
| `yarn android:pre` / `yarn android:pre:release` | Android **PRE** package (`com.anonymous.ciclepark.pre`). Injects Maps key from `.env.local` / `.env` into Gradle when set; see [android-maps-and-pre-builds.md](./android-maps-and-pre-builds.md). |
| `yarn prebuild` | Generate/update native projects (`expo prebuild`). |
| `yarn prebuild:android:pre` | Prebuild Android with `APP_VARIANT=pre`. |
| `yarn web` | `expo start --web`. |

### `src/` layout (summary)

| Path | Role |
|------|------|
| `App.tsx` | UI root: `GestureHandlerRootView`, settings bootstrap (theme/locale), i18n sync, bottom sheets, safe area, navigation. |
| `navigation/` | `NavigationContainer`, root stack (onboarding or `Main` → tabs + `Profile`), floating tabs Map / List / Settings. |
| `screens/` | Screens: map (`screens/map/`), list, settings, profile; map UI (search bar, filters, FAB, locate, add sheet, etc.). |
| `components/` | Reusable atoms/molecules (inputs, buttons, search). |
| `theme/` | Unistyles registration, light/dark themes, tokens (app/feedback/map color, spacing, typography). |
| `i18n/` | `i18next` + `react-i18next`, **es / en / ca** resources, device locale sync (`expo-localization`). |
| `stores/` | Zustand: **settings** (appearance, language) and **onboarding** (permissions, legal, marketing opt-in), persisted with **MMKV** (localStorage fallback on web). |

### Runtime dependencies (by role)

| Package | Role in the project |
|---------|---------------------|
| `expo` | Base SDK. |
| `expo-dev-client` | Development with a custom native client. |
| `expo-localization` | System locales for i18n. |
| `expo-location` | Map location (plugin in `app.json` with permission copy; may be localized in app config). |
| `expo-notifications` | Onboarding notification permission (plugin in `app.json`). |
| `zustand`, `react-native-mmkv` | Client state + fast persisted storage (native). |
| `expo-status-bar` | Status bar aligned with theme. |
| `@react-navigation/native`, `native-stack`, `bottom-tabs` | Stack + tab navigation. |
| `react-native-screens`, `react-native-safe-area-context` | Navigation integration and safe areas. |
| `react-native-gesture-handler` | Gestures (required at entry startup). |
| `react-native-reanimated`, `react-native-worklets` | Animations (Reanimated 4); Babel plugin must be **last** in `babel.config.js`. |
| `react-native-reanimated-carousel` | Onboarding horizontal carousel (`OnboardingFlow`). |
| `react-native-unistyles` | Styles and themes; Babel plugin with `root: 'src'`. |
| `react-native-edge-to-edge` | Expo plugin for edge-to-edge UI. |
| `react-native-maps` | Map (Google Maps on iOS/Android via keys in `app.json`). |
| `@gorhom/bottom-sheet` | Modal sheets (e.g. map flows). |
| `lucide-react-native` | Icons; `metro.config.js` includes a **resolver** workaround for npm `exports` issues. |
| `react-native-svg` | SVG support for vector icons. |
| `@react-native/normalize-colors` | Color normalization (internal/utilities). |
| `react-native-nitro-modules` | Transitive dependency required by parts of the current native stack. |
| `i18next`, `react-i18next` | Translations and `useTranslation`. |

### Notable configuration

- **`babel.config.js`:** `babel-preset-expo`, `react-native-unistyles/plugin` (`root: 'src'`), `react-native-reanimated/plugin` last.
- **`metro.config.js`:** Expo `getDefaultConfig`; `resolveRequest` to resolve `lucide-react-native` to the real ESM bundle.
- **`index.ts`:** imports `gesture-handler`, `./src/theme/register`, `./src/i18n`, then registers `App` from `./src/App`.
- **`app.json` → plugins:** `expo-dev-client`, `react-native-edge-to-edge`, `expo-localization`, `expo-location` (when-in-use message). **Google Maps:** default keys in `app.json` / `android/.../strings.xml`; **PRE** builds inject a separate secret via Gradle — see [android-maps-and-pre-builds.md](./android-maps-and-pre-builds.md).

### Remote repository

Public code on GitHub: [github.com/unaisdev/cyclepark](https://github.com/unaisdev/cyclepark) (repo name **cyclepark**; local npm package name remains `ciclepark`).

---

## `docs/` change log

| Date | Note |
|------|------|
| 2026-03-23 | Initial creation from MVP brief (map, detail, add, votes, photos). |
| 2026-03-23 | Added `design-tokens.md` (App Transit + Feedback + map spec §4). |
| 2026-03-24 | Documented Expo 54 stack, dependencies, `src/` layout, Babel/Metro, scripts, GitHub remote. |
| 2026-03-24 | Added `git-conventions.md` (Git convention kept out of root README). |
| 2026-03-24 | Translated all documentation to English. |
| 2026-04-01 | Added `android-maps-and-pre-builds.md` (PRE package, Maps secrets, scripts). Linked from index and configuration notes. |
| 2026-04-01 | `yarn android:pre*` runs `scripts/android-pre-run.cjs` so `.env.local` can supply `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE`. |
| 2026-04-01 | `android-maps-and-pre-builds.md`: Gradle reads repo-root `.env` / `.env.local`, DEBUG/RELEASE/PRE keys, `preBuild` checks, troubleshooting for wrong repo path. |
