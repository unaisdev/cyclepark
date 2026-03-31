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
 * Solo nombre y `android.package` según APP_VARIANT / APP_BUILD_TYPE.
 * Claves de Maps: `app.json` (y en Android, `android/app/build.gradle` + `.env.local` por variante).
 * Evita `expo prebuild --platform android` si ya versionas `android/`: regenera nativo y puede pisar tus cambios.
 */
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

  return {
    ...config,
    name: appName,
    android: {
      ...config.android,
      package: androidPackage,
    },
  } as ExpoConfig;
};
