# Android: PRE builds and Google Maps API keys

This doc explains how **application IDs**, **Gradle flags**, and **Maps SDK keys** work together for CiclePark. It complements the high-level notes in [README.md](./README.md).

## Two Android identities

| Build | Yarn script (examples) | `applicationId` | Maps key source |
|--------|------------------------|-----------------|-----------------|
| **Standard** | `yarn android`, `yarn android:release` | `com.anonymous.ciclepark` | `android/app/src/main/res/values/strings.xml` → `google_maps_api_key`, wired in the manifest (see below). |
| **PRE** | `yarn android:pre`, `yarn android:pre:release` | `com.anonymous.ciclepark.pre` | **Required**, not committed: resolved at Gradle time (see [PRE Maps key](#pre-build-google-maps-key-secret)). Standard `strings.xml` is **not** a fallback — the build fails if the PRE key is missing or invalid. |

PRE is toggled with the Gradle project property **`cicleparkPre=true`**. The repo passes it via `ORG_GRADLE_PROJECT_cicleparkPre=true` in `package.json` for the `android:pre*` scripts.

Implementation: `android/app/build.gradle` — `applicationIdSuffix '.pre'` when `isCicleparkPre` is true, and `resValue "string", "google_maps_api_key", …` only after validation passes.

## How the Maps SDK reads the key

1. **`AndroidManifest.xml`** declares  
   `com.google.android.geo.API_KEY` with  
   `@string/google_maps_api_key`  
   (not a hardcoded literal in the manifest).

2. **`strings.xml`** defines the default `google_maps_api_key` for the **standard** package only.

3. **PRE builds** always inject a dedicated value via **`resValue`** in `defaultConfig` after Gradle checks it (see validation below).

`react-native-maps` uses the same native Google Maps SDK entry point.

## PRE build: Google Maps key (secret)

Google Cloud **application restrictions** are per Android app (package name + signing certificate SHA-1). Because PRE uses **`com.anonymous.ciclepark.pre`**, create a **dedicated API key** restricted to that package and to the **debug** (or release) signing SHA-1 you use for PRE builds.

The PRE key must **not** be committed. Gradle resolves it in this **order** (first non-empty wins):

1. **Gradle property** &mdash; `-PcicleparkGoogleMapsApiKeyPre=...` or `~/.gradle/gradle.properties`, or `ORG_GRADLE_PROJECT_cicleparkGoogleMapsApiKeyPre`.

2. **Environment variable** &mdash; `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE`  
   **`yarn android:pre`** runs `scripts/android-pre-run.cjs`, which copies the value from **`.env`** then **`.env.local`** (repo root) into that env var if it is not already set—so you can keep the key only in `.env.local` (gitignored via `.env*.local`) without `local.properties`.

3. **`<repo>/android/local.properties`** (typical; same file Android Studio uses for `sdk.dir`, gitignored)

4. **`<repo>/local.properties`** at the repository root.

   ```properties
   ciclepark.googleMapsApiKeyPre=YOUR_REAL_KEY
   ```

Gradle checks 1 → 2 → 3 → 4 in order (first non-empty wins). On failure, the build error prints whether each `local.properties` path **exists** (without printing secret values). Template: **`.env.example`** at repo root.

### Validation (mandatory)

If PRE is enabled, Gradle **fails the build** unless the resolved key:

- is **non-empty** after trim  
- is at least **30 characters**  
- **starts with** `AIza` (typical Google API key prefix)  
- does **not** contain obvious placeholder substrings (`changeme`, `pon_aqui`, `put_here`)

This blocks empty config, pasted examples, and truncated copy-paste mistakes before you ship an APK.

### Template

Copy from **`android/local.properties.example`** to **`android/local.properties`** and replace the placeholder with your real PRE-restricted key.

## Standard build key (`strings.xml` and Expo)

- The default key lives in **`android/app/src/main/res/values/strings.xml`** for local/dev convenience.
- **`app.json`** still lists `android.config.googleMaps.apiKey` and `ios.config.googleMapsApiKey` for **Expo prebuild** and consistency with Expo docs. After `expo prebuild`, re-check that the native manifest still uses `@string/google_maps_api_key` if you rely on the Gradle injection for PRE.

Rotate keys if they ever appeared in a public history; prefer **restricted** keys in Google Cloud.

## Scripts reference

| Script | Notes |
|--------|--------|
| `yarn android:pre` | Debug PRE; sets `APP_VARIANT=pre`, `ORG_GRADLE_PROJECT_cicleparkPre=true`, targets `--app-id com.anonymous.ciclepark.pre`. |
| `yarn android:pre:release` | Release PRE variant; requires release signing as configured in `android/app/build.gradle`. |
| `yarn prebuild:android:pre` | Prebuild with `APP_VARIANT=pre` (Expo app config may change Android package name). |

Related: `app.config.ts` adjusts `android.package` when `APP_VARIANT=pre` (e.g. `.pre` suffix) for Expo config; native Gradle must stay aligned with the same ID you register in Play Console / Google Cloud.

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| **GradleException: PRE build requires a real Google Maps API key** | Add a valid key via `local.properties`, env, or `-P` (see above). Ensure it matches validation (length, `AIza` prefix, no placeholder text). |
| **Gray / blank map tiles** on PRE | Wrong key, or Cloud Console restriction mismatch (package must be `com.anonymous.ciclepark.pre`, SHA-1 must match the signing cert). |
| **OSM / markers errors in Metro logs** | Separate from Maps tiles: bike data uses the OpenStreetMap API; zoom or bbox limits are unrelated to Google’s SDK key. |

## Change history

| Date | Note |
|------|------|
| 2026-04-01 | Initial doc: PRE vs standard IDs, manifest `@string` wiring, secret key resolution order, Cloud restrictions, troubleshooting. |
| 2026-04-01 | PRE key mandatory again: Gradle fails if missing/invalid; documented validation rules. |
