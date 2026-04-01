# Android: PRE builds and Google Maps API keys

This doc explains how **application IDs**, **Gradle flags**, and **Maps SDK keys** work together for CiclePark. It complements the high-level notes in [README.md](./README.md).

## Two Android identities

| Build | Yarn script (examples) | `applicationId` | Maps key source |
|--------|------------------------|-----------------|-----------------|
| **Standard** | `yarn android`, `yarn android:release` | `com.anonymous.ciclepark` | **`google_maps_api_key`** is set per variant in **`android/app/build.gradle`** (`resValue`), from env / Gradle props / `.env` files at the **repo root** (see [Gradle Maps keys](#gradle-debug-release-and-pre-maps-keys)). Debug uses `CICLEPARK_GOOGLE_MAPS_API_KEY_DEBUG`, release uses `CICLEPARK_GOOGLE_MAPS_API_KEY_RELEASE`. The manifest still references `@string/google_maps_api_key`. |
| **PRE** | `yarn android:pre`, `yarn android:pre:release` | `com.anonymous.ciclepark.pre` | **`CICLEPARK_GOOGLE_MAPS_API_KEY_PRE`** (same Gradle resolution as below). The `yarn android:pre*` scripts can also inject the PRE key from `.env` / `.env.local` into the environment before Gradle runs. |

PRE is toggled with the Gradle project property **`cicleparkPre=true`**. The repo passes it via `ORG_GRADLE_PROJECT_cicleparkPre=true` in `package.json` for the `android:pre*` scripts.

Implementation: `android/app/build.gradle` — `applicationIdSuffix '.pre'` when `isCicleparkPre` is true, and `resValue "string", "google_maps_api_key", …` only after validation passes.

## How the Maps SDK reads the key

1. **`AndroidManifest.xml`** declares  
   `com.google.android.geo.API_KEY` with  
   `@string/google_maps_api_key`  
   (not a hardcoded literal in the manifest).

2. **`strings.xml`** may define a fallback `google_maps_api_key` for tooling; **release/debug/PRE variants** normally override it via **`resValue`** in `android/app/build.gradle` once a valid key is resolved.

3. **All active variants** get `google_maps_api_key` from Gradle (`resValue`) after validation for that variant’s build task (see [Gradle Maps keys](#gradle-debug-release-and-pre-maps-keys)).

`react-native-maps` uses the same native Google Maps SDK entry point.

## Repository root for `.env` / `.env.local` (important)

`android/app/build.gradle` loads **`.env`** and **`.env.local`** from the **repository root** (next to `package.json`), not from `android/`.

In Gradle, the `:app` subproject’s **`rootDir` is the Android root** (`android/`, where `settings.gradle` lives), **not** `android/app/`. The script therefore must **not** walk up two directories from `rootDir` to find the monorepo root (that would point *above* the repo and `.env.local` would never load).

The build reuses the same base path as Metro / Expo: **`projectRoot`** at the top of `android/app/build.gradle` (`rootDir.parentFile` → repo root), and sets:

```text
cicleparkRepoRootDir = new File(projectRoot)
```

So keys in `.env.local` (gitignored via `.env*.local`) are visible to Gradle when the file lives at `<repo>/.env.local`.

## Gradle: DEBUG, RELEASE, and PRE Maps keys

`android/app/build.gradle` picks one env var name per variant, then resolves the key in this **order** (first non-empty wins):

1. **Environment variable** — e.g. `CICLEPARK_GOOGLE_MAPS_API_KEY_DEBUG`, `_PRE`, or `_RELEASE`.
2. **Gradle property** — `cicleparkGoogleMapsApiKeyDebug`, `cicleparkGoogleMapsApiKeyPre`, or `cicleparkGoogleMapsApiKeyRelease` (e.g. in `android/gradle.properties` or `-P…`).
3. **Repo-root dotenv** — same variable name in **`<repo>/.env`** then **`<repo>/.env.local`** (`.env.local` overrides `.env`).

| Variant | Env var | Gradle property (optional) |
|---------|---------|----------------------------|
| PRE (`cicleparkPre=true`) | `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE` | `cicleparkGoogleMapsApiKeyPre` |
| Debug (standard, not PRE) | `CICLEPARK_GOOGLE_MAPS_API_KEY_DEBUG` | `cicleparkGoogleMapsApiKeyDebug` |
| Release (standard, not PRE) | `CICLEPARK_GOOGLE_MAPS_API_KEY_RELEASE` | `cicleparkGoogleMapsApiKeyRelease` |

### Validation

When that variant **actually builds**, the `preBuild` task fails unless the resolved key is non-empty, at least **30** characters, and starts with **`AIza`**.

### Why checks run in `preBuild` (not only at configuration time)

Gradle **configures every variant** (debug and release) even if you only run **`bundleRelease`**. If the Maps key were asserted only during configuration, a missing **debug** key would break **`bundleRelease`** even though you are not building debug. The script therefore:

- Writes `google_maps_api_key` from the resolved key when it looks valid; otherwise an empty string at configure time (for variants that are not built).
- Runs the strict assertion in each variant’s **`preBuild`** `doFirst`, so only variants that are part of the build must have their key set.

CI that only builds release still needs **`CICLEPARK_GOOGLE_MAPS_API_KEY_RELEASE`** (or equivalent); local **`assembleDebug`** still needs the **debug** key.

## PRE build: Google Maps key (secret)

Google Cloud **application restrictions** are per Android app (package name + signing certificate SHA-1). Because PRE uses **`com.anonymous.ciclepark.pre`**, create a **dedicated API key** restricted to that package and to the **debug** (or release) signing SHA-1 you use for PRE builds.

The PRE key must **not** be committed.

**Primary resolution (current `build.gradle`):** env → Gradle property `cicleparkGoogleMapsApiKeyPre` → **`<repo>/.env`** / **`<repo>/.env.local`** under the name `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE`. See the table in [Gradle: DEBUG, RELEASE, and PRE Maps keys](#gradle-debug-release-and-pre-maps-keys).

**`yarn android:pre*`** still runs `scripts/android-pre-run.cjs`, which can copy the value from **`.env`** / **`.env.local`** into `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE` before Gradle starts—useful when you rely on dotenv only and do not export the variable globally.

Older docs mentioned extra fallbacks in `local.properties`; if those are still present in tooling scripts, treat them as optional—**the canonical source for Gradle is env / `-P` / repo-root `.env` files** as above. Template: **`.env.example`** at repo root.

### Validation (mandatory)

If PRE is enabled, Gradle **fails the build** unless the resolved key:

- is **non-empty** after trim  
- is at least **30 characters**  
- **starts with** `AIza` (typical Google API key prefix)  
- does **not** contain obvious placeholder substrings (`changeme`, `pon_aqui`, `put_here`)

This blocks empty config, pasted examples, and truncated copy-paste mistakes before you ship an APK.

### Template

Use **`.env.example`** at the repo root and copy the `CICLEPARK_GOOGLE_MAPS_API_KEY_*` lines into **`.env.local`**. For Android Studio, **`android/local.properties`** is still used for **`sdk.dir`** only (see **`android/local.properties.example`**).

## Standard build key (`strings.xml`, Gradle, and Expo)

- **`android/app/build.gradle`** injects **`google_maps_api_key`** per variant when a valid DEBUG / RELEASE key is resolved (see [Gradle: DEBUG, RELEASE, and PRE Maps keys](#gradle-debug-release-and-pre-maps-keys)).
- **`android/app/src/main/res/values/strings.xml`** can still hold a fallback for tooling; variant **`resValue`** overrides it for real builds.
- **`app.json`** lists `android.config.googleMaps.apiKey` and `ios.config.googleMapsApiKey` for **Expo prebuild** and consistency with Expo docs. After `expo prebuild`, keep the manifest on `@string/google_maps_api_key` so Gradle can inject the key.

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
| **Missing or invalid Google Maps API key for *release* build** (e.g. `preReleaseBuild`) | Set `CICLEPARK_GOOGLE_MAPS_API_KEY_RELEASE` (env), `cicleparkGoogleMapsApiKeyRelease` (Gradle), or the same name in **`<repo>/.env` / `.env.local`**. Confirm **`cicleparkRepoRootDir`** resolves to the repo root (same folder as `package.json`) so Gradle reads dotenv files. |
| **Missing or invalid … for *debug* build** | Set `CICLEPARK_GOOGLE_MAPS_API_KEY_DEBUG` (or Gradle prop / dotenv). Required when running **`assembleDebug`** / `yarn android`, not when only fixing release if you only build release. |
| **GradleException: PRE build requires a real Google Maps API key** (or PRE validation error) | Set `CICLEPARK_GOOGLE_MAPS_API_KEY_PRE` via env, `-P`, or repo-root dotenv; enable PRE only when `cicleparkPre=true`. |
| **Keys exist in `.env.local` but Gradle says missing** | Wrong working directory is rare; the usual bug is resolving the repo root with **`rootDir.parentFile.parentFile`** from `:app` (one level too high). Use **`new File(projectRoot)`** as in `build.gradle`. |
| **Gray / blank map tiles** on PRE | Wrong key, or Cloud Console restriction mismatch (package must be `com.anonymous.ciclepark.pre`, SHA-1 must match the signing cert). |
| **OSM / markers errors in Metro logs** | Separate from Maps tiles: bike data uses the OpenStreetMap API; zoom or bbox limits are unrelated to Google’s SDK key. |

## Change history

| Date | Note |
|------|------|
| 2026-04-01 | Initial doc: PRE vs standard IDs, manifest `@string` wiring, secret key resolution order, Cloud restrictions, troubleshooting. |
| 2026-04-01 | PRE key mandatory again: Gradle fails if missing/invalid; documented validation rules. |
| 2026-04-01 | Documented repo-root path for `.env` / `.env.local` (`projectRoot` vs double `parentFile` from `:app`), DEBUG / RELEASE / PRE key names, `preBuild` validation vs `bundleRelease`, troubleshooting for “keys in `.env.local` but Gradle missing”. |
