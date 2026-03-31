---
name: google-play-release
description: >-
  Guides Google Play uploads for this Expo/React Native app (AAB release vs in-app products), Play Console checks, signing, and automation options (EAS Submit, Fastlane, manual). Use when the user asks to publish to Google Play, upload an Android bundle, release a build, configure Play Console, or automate store submission.
---

# Google Play release (Ciclepark)

## Clarify intent

- **App / release**: upload an `.aab` to a track (internal, closed, open, production).
- **Store “product” (IAP)**: base plans, subscriptions, or one-time products in **Monetize → Products**; IDs must match `react-native-iap` configuration in the app.

## What the human must have (agent cannot replace)

1. **Play Console developer account** (paid), app created with the same **applicationId** as `android.package` in Expo config (see `app.config.ts` / `app.json`).
2. **Signing**  
   - **Upload key** (local or CI) for signing the AAB.  
   - **App Signing by Google** enabled in Play Console (recommended); register the upload key there.
3. **For automation (API / CI)**: a **Google Cloud service account** JSON, granted access in Play Console (**Users and permissions** → invite the service account → **Release apps** / **View app information** as needed). **Never commit** the JSON; use env vars or secret store.
4. **Optional**: **service account linking** in Play Console (**API access**) if using Play Developer API or Fastlane with JSON key.

## Build path for this repo

- Local scripts: `package.json` has `android:release` (release variant via Expo run). After `expo prebuild`, the Android Gradle project can produce `app-release.aab` (typically under `android/app/build/outputs/bundle/release/`), **if** signing is configured in `android/app/build.gradle` / `gradle.properties`.
- **EAS Build + EAS Submit**: add `eas.json` and Expo account; submit without maintaining Gradle signing locally (often simplest for Expo SDK 54).

## Upload options

| Method | Best when |
|--------|-----------|
| Play Console (manual) | First release, low automation |
| **EAS Submit** | Already using EAS Build |
| **Fastlane supply** | Team knows Fastlane, has JSON key |
| **Gradle Play Publisher** | Fully Gradle-centric CI |

## Release checklist (app)

- Version **versionCode** incremented (Android); **versionName** / Expo `version` aligned with policy.
- Target/compile SDK and permissions meet Play policy (location, photos, etc.).
- Release notes, countries, content rating, Data safety, and store listing complete for the track.
- For **production**: staged rollout vs full rollout decision.

## In-app products checklist

- Product ID matches code (e.g. `react-native-iap`).
- Product activated; license testers / internal testing track for validation.
- Play Billing configured; obfuscation / backend validation if applicable (per product design).

## Play Console: configurar producto (in-app vs suscripción)

### Cómo encaja Ciclepark hoy

- En `src/constants/iap.ts` el ID es `ciclepark_supporter_unlock`.
- `iapService.ts` usa `type: 'in-app'` y compra no consumible → en Play debe ser **Producto integrado en la aplicación** (compra única / “managed”), **no** una suscripción, salvo que se cambie el código a `subs`.

### Producto in-app (compra única / no consumible)

1. **Play Console** → la app → **Monetizar con Play** (o **Monetization**) → **Productos** → **Productos integrados en la aplicación**.
2. **Crear producto**. El **ID del producto** debe ser **exactamente** el del código (p. ej. `ciclepark_supporter_unlock`) — no se puede cambiar después.
3. Nombre, descripción y **precio predeterminado** (y países si aplica).
4. **Activar** el producto cuando el formulario esté completo.
5. Publicar una versión de la app que incluya **Billing Library** compatible (Google suele exigir la versión mínima indicada en la consola); `react-native-iap` suele arrastrar la dependencia Gradle adecuada tras prebuild.

### Suscripción

1. **Productos** → **Suscripciones** → **Crear suscripción**.
2. Definir **ID de la suscripción** (debe coincidir con lo que ponga la app en `fetchProducts` / `requestPurchase` con `type: 'subs'`).
3. Crear al menos un **plan base** (precio, periodo de facturación, renovación).
4. Activar y revisar políticas (prueba gratuita, ofertas, etc.).
5. **Importante**: el código actual de Ciclepark está pensado para **in-app**; pasar a suscripción implica cambiar tipos y flujos en `iapService.ts` y en el store.

### Probar compras

- **Prueba de licencias**: **Configuración** → **Configuración de la cuenta de prueba de licencias** → añadir correos Gmail de testers.
- Instalar un **AAB firmado** subido a **prueba interna/cerrada** (o producción) con ese mismo `applicationId` que en Play.
- Los tester deben instalar desde Play Store, no un APK lateral arbitrario, para que Billing responda bien.

### Requisitos previos frecuentes

- Cuenta de **comerciante** vinculada si hace falta cobrar (Play guía en la consola).
- La ficha de la app y, a veces, un primer release en una pista de prueba antes de ver productos en dispositivos reales.

## Agent behavior

- Do not invent package names or signing passwords; read `app.config.ts`, `app.json`, and `android/` Gradle outputs.
- Prefer documenting commands and Play Console steps over storing credentials in the repo.
- If the user has no `eas.json`, mention EAS as an option alongside local `bundleRelease`.
