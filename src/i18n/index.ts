import { type Locale, getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ca } from './locales/ca';
import { en } from './locales/en';
import { es } from './locales/es';

export const APP_LOCALES = ['es', 'en', 'ca'] as const;
export type AppLocale = (typeof APP_LOCALES)[number];

/** Idioma de la app (es/en/ca) a partir del locale del sistema. */
export function resolveDeviceLocale(locales?: readonly Pick<Locale, 'languageCode'>[]): AppLocale {
  const code = (locales ?? getLocales())[0]?.languageCode?.toLowerCase() ?? '';
  if (code === 'ca' || code.startsWith('ca')) return 'ca';
  if (code === 'en' || code.startsWith('en')) return 'en';
  return 'es';
}

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    es: { translation: es },
    en: { translation: en },
    ca: { translation: ca },
  },
  lng: resolveDeviceLocale(),
  fallbackLng: 'es',
  supportedLngs: [...APP_LOCALES],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export function setAppLocale(lng: AppLocale) {
  return i18n.changeLanguage(lng);
}

export { i18n };
export type { TranslationResources } from './TranslationResources';
