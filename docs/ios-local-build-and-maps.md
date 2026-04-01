# iOS: local dev client, prebuild, and Google Maps

This doc covers **first-time setup** and **day-to-day debugging** with the **Expo dev client** on iOS. It complements the Android-focused [android-maps-and-pre-builds.md](./android-maps-and-pre-builds.md) and the shared IAP notes in [in-app-purchases.md](./in-app-purchases.md).

## Prerequisites (macOS)

- **Xcode** (install from the App Store; open it once to finish components and accept the license).
- **Xcode Command Line Tools** (`xcode-select --install` if `xcode-select -p` fails).
- **CocoaPods** (`pod --version`); Expo runs `pod install` during prebuild / `expo run:ios`, but CocoaPods must be installed globally.
- **Node.js** (LTS) and **Yarn** (or npm), same as the root [README.md](../README.md).

**Physical device:** an Apple ID with a **Development Team** in Xcode (Signing & Capabilities → Team). The **simulator** does not require a paid Apple Developer Program for basic local runs.

## Repository layout

The repo **gitignores** [`/ios`](../.gitignore) and [`/android`](../.gitignore). Native projects are **generated** with `expo prebuild`; they are not committed.

## Install JS dependencies

From the repo root:

```bash
yarn install
```

## Environment and Maps API keys

Copy [`.env.example`](../.env.example) to **`.env.local`** (gitignored) for local secrets.

[`app.config.ts`](../app.config.ts) sets **`ios.config.googleMapsApiKey`** at prebuild time. Resolution order:

1. **`CICLEPARK_GOOGLE_MAPS_API_KEY_IOS`** — use when iOS should use a different key than Android for the same variant.
2. Otherwise, by **variant** (same names as Android for consistency):
   - **PRE** (`APP_VARIANT=pre`): `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE`
   - **Debug** (local default when not an EAS release build): `CICLEPARK_GOOGLE_MAPS_API_KEY_DEBUG`
   - **Release** (e.g. `APP_BUILD_TYPE=release` or EAS production): `CICLEPARK_GOOGLE_MAPS_API_KEY_RELEASE`
3. Fallback: **`app.json`** → `expo.ios.config.googleMapsApiKey`.

After changing env or `app.config.ts`, run **`expo prebuild --platform ios`** again (or delete `ios/` and prebuild) so the native project picks up the new key.

### Google Cloud Console (iOS)

- Enable **Maps SDK for iOS** (and any other Maps APIs you use) for your project.
- Restrict the key used on iOS by **iOS apps** and set the **bundle identifier** to match the app (see table below). For local debug the bundle id usually ends with **`.debug`**.

## Bundle identifier and display name

[`app.config.ts`](../app.config.ts) keeps **`ios.bundleIdentifier`** aligned with **`android.package`** for the same `APP_VARIANT` / `APP_BUILD_TYPE`:

| Variant | Typical `APP_VARIANT` / `APP_BUILD_TYPE` | Example bundle id |
|--------|------------------------------------------|-------------------|
| Standard debug (local) | default (no `APP_VARIANT`, not EAS release) | `com.anonymous.ciclepark.debug` |
| Standard release | `APP_BUILD_TYPE=release`, EAS prod | `com.anonymous.ciclepark` |
| PRE debug | `APP_VARIANT=pre` | `com.anonymous.ciclepark.pre.debug` |
| PRE release | `APP_VARIANT=pre` + release | `com.anonymous.ciclepark.pre` |

The **display name** is prefixed with `DEBUG` and/or `PRE` when those modes apply (same as Android).

## Generate `ios/` and run

**First time (or after deleting `ios/`):**

```bash
npx expo prebuild --platform ios
```

Then build and install the **development client** on the simulator (or a connected device):

```bash
yarn ios
```

Equivalent: `npx expo run:ios`.

**Daily workflow:**

1. Terminal A: `yarn start` (Metro with **dev client**). On the **iOS Simulator**, if you see an error like *Failed to load app from http://192.168.x.x:8081*, use **`yarn start:localhost`** instead so Metro uses `127.0.0.1` (same machine as the simulator). Keep **`yarn start`** (LAN) when you debug on a **physical device** on the same Wi‑Fi.
2. If you only changed JS: reload the app in the simulator.
3. If you changed **native config**, plugins, or `app.config.ts` / `app.json`: run `npx expo prebuild --platform ios` again, then `yarn ios`.

Use `yarn start:clean` if Metro cache causes odd bundler errors.

## Xcode workspace

Open **`ios/*.xcworkspace`** (not the `.xcodeproj`) if you need to tweak signing, capabilities, or debug native issues. After `prebuild`, the project name reflects the debug app name (e.g. **DEBUGCyclePark**).

## In-app purchases and notifications

- **IAP:** See [in-app-purchases.md](./in-app-purchases.md) for App Store Connect, the shared SKU, and sandbox testing. StoreKit in the **simulator** is limited; use a **device** and a **sandbox Apple ID** for realistic purchase flows.
- **Location / notifications:** Copy is configured via Expo plugins in `app.json`. If Xcode reports missing capabilities, compare with a fresh `expo prebuild` output.

## EAS Build (optional)

[`eas.json`](../eas.json) includes a **`development`** profile with `developmentClient: true`. You can run `eas build --profile development --platform ios` when you prefer a cloud-built installable app; Apple credentials must be set up on [expo.dev](https://expo.dev). Local `yarn ios` remains the fastest loop for everyday debugging.

## Troubleshooting

| Symptom | Things to try |
|--------|----------------|
| `pod install` fails | Update CocoaPods; run `cd ios && pod install --repo-update`; ensure Xcode CLI tools point at the correct Xcode. |
| Blank map / Google logo only | Key restrictions: bundle id must match **exactly**; enable Maps SDK for iOS; confirm env was present at **prebuild** time. |
| Signing errors on device | Xcode → target → Signing & Capabilities → select your **Team**; ensure bundle id is unique to your team if needed. |
| Wrong JS bundle | Dev client should load from Metro; start `yarn start` and confirm the URL shown in the terminal. |
| “Failed to load app from http://…:8081” | **1)** En la raíz del repo, deja Metro en marcha (`yarn start` o `yarn start:localhost`). **2)** En simulador, preferible `yarn start:localhost` para evitar IP LAN incorrecta o firewall. **3)** Pulsa **Reload** en la pantalla de error; si sigue igual, cierra la app en el simulador y ábrela desde la terminal con `npx expo start --dev-client --localhost` y la tecla **i**, o en el menú de desarrollo del dev client cambia la URL del bundler a `http://127.0.0.1:8081`. |

---

## Change history

| Date | Note |
|------|------|
| 2026-04-02 | Initial iOS local build, Maps env resolution via `app.config.ts`, bundle id table, EAS/troubleshooting. |
| 2026-04-02 | Simulator Metro: `yarn start:localhost`, troubleshooting for LAN IP load failures. |
