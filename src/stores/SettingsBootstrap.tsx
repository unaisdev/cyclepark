import { useLayoutEffect } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';
import { resolveDeviceLocale, setAppLocale } from '../i18n';
import type { AppearancePreference, LocalePreference } from './preferenceTypes';
import { useSettingsStore } from './settingsStore';

function applyAppearancePreference(mode: AppearancePreference) {
  if (mode === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(mode);
  }
}

async function applyLocalePreference(mode: LocalePreference) {
  if (mode === 'system') {
    await setAppLocale(resolveDeviceLocale());
  } else {
    await setAppLocale(mode);
  }
}

/**
 * Aplica tema e idioma persistidos (MMKV) al arrancar y cuando cambian en el store de ajustes.
 */
export function SettingsBootstrap() {
  const appearance = useSettingsStore((s) => s.appearance);
  const localeMode = useSettingsStore((s) => s.localeMode);

  useLayoutEffect(() => {
    applyAppearancePreference(appearance);
  }, [appearance]);

  useLayoutEffect(() => {
    void applyLocalePreference(localeMode);
  }, [localeMode]);

  return null;
}
