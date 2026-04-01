import type { ConfigContext, ExpoConfig } from 'expo/config';

const PRE_ENV_VALUE = 'pre';

function isDebugBuild(): boolean {
  if (process.env.APP_BUILD_TYPE === 'release') return false;
  if (process.env.APP_BUILD_TYPE === 'debug') return true;
  return process.env.EAS_BUILD !== 'true';
}

function isPreVariant(): boolean {
  return process.env.APP_VARIANT === PRE_ENV_VALUE;
}

/**
 * Nombre de app, `android.package`, `ios.bundleIdentifier` y clave de Google Maps en iOS
 * según `APP_VARIANT` / `APP_BUILD_TYPE` y variables de entorno (ver `.env.example`).
 * Android Maps sigue resolviéndose en Gradle + `.env.local` tras prebuild.
 * Evita `expo prebuild` si versionas `ios/` o `android/` a mano: puede pisar cambios nativos.
 */
function resolveIosGoogleMapsApiKey(
  ios: ExpoConfig['ios'] | undefined,
  pre: boolean,
  debug: boolean,
): string {
  const fallback =
    typeof ios?.config?.googleMapsApiKey === 'string'
      ? ios.config.googleMapsApiKey
      : '';

  const iosOnly = process.env.CICLEPARK_GOOGLE_MAPS_API_KEY_IOS?.trim();
  if (iosOnly) return iosOnly;

  if (pre) {
    const v = process.env.CICLEPARK_GOOGLE_MAPS_API_KEY_PRE?.trim();
    if (v) return v;
  } else if (debug) {
    const v = process.env.CICLEPARK_GOOGLE_MAPS_API_KEY_DEBUG?.trim();
    if (v) return v;
  } else {
    const v = process.env.CICLEPARK_GOOGLE_MAPS_API_KEY_RELEASE?.trim();
    if (v) return v;
  }

  return fallback;
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const pre = isPreVariant();
  const debug = isDebugBuild();
  const prodPackage =
    typeof config.android?.package === 'string'
      ? config.android.package
      : 'com.anonymous.ciclepark';
  let androidPackage = pre ? `${prodPackage}.pre` : prodPackage;
  if (debug) {
    androidPackage = `${androidPackage}.debug`;
  }
  const baseName = config.name ?? 'CyclePark';
  const appName =
    (pre ? 'PRE' : '') +
    (debug ? 'DEBUG' : '') +
    baseName;

  const googleMapsApiKey = resolveIosGoogleMapsApiKey(config.ios, pre, debug);

  return {
    ...config,
    name: appName,
    android: {
      ...config.android,
      package: androidPackage,
    },
    ios: {
      ...config.ios,
      bundleIdentifier: androidPackage,
      config: {
        ...config.ios?.config,
        googleMapsApiKey,
      },
    },
  } as ExpoConfig;
};
