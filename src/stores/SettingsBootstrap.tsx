import { useLayoutEffect } from 'react';
import { applyAppearancePreference } from '../theme/applyAppearancePreference';
import { resolveDeviceLocale, setAppLocale } from '../i18n';
import type { LocalePreference } from './preferenceTypes';
import { useSettingsStore } from './settingsStore';

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
