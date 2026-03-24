import { useLocales } from 'expo-localization';
import { useEffect } from 'react';
import { useUserPreferences } from '../preferences/UserPreferencesContext';
import { i18n, resolveDeviceLocale } from './index';

/**
 * Si el idioma está en «automático», mantiene i18next alineado con el sistema.
 * `useLocales` notifica cuando el usuario cambia el idioma en ajustes del móvil.
 */
export function DeviceLocaleSync() {
  const { localeMode } = useUserPreferences();
  const languageTag = useLocales()[0]?.languageTag ?? '';

  useEffect(() => {
    if (localeMode !== 'system') return;
    const next = resolveDeviceLocale();
    if (i18n.language !== next) {
      void i18n.changeLanguage(next);
    }
  }, [languageTag, localeMode]);

  return null;
}
