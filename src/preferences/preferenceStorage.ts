import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LOCALES, type AppLocale } from '../i18n';

export type AppearancePreference = 'system' | 'light' | 'dark';
export type LocalePreference = 'system' | AppLocale;

export type StoredUserPreferences = {
  appearance: AppearancePreference;
  locale: LocalePreference;
};

const STORAGE_KEY = '@ciclepark/user_prefs_v1';

function isAppearance(v: unknown): v is AppearancePreference {
  return v === 'system' || v === 'light' || v === 'dark';
}

function isLocale(v: unknown): v is LocalePreference {
  return v === 'system' || APP_LOCALES.includes(v as AppLocale);
}

export async function loadUserPreferences(): Promise<StoredUserPreferences | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      appearance: isAppearance(parsed.appearance) ? parsed.appearance : 'system',
      locale: isLocale(parsed.locale) ? parsed.locale : 'system',
    };
  } catch {
    return null;
  }
}

export async function saveUserPreferences(p: StoredUserPreferences): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
