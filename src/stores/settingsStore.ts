import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { applyAppearancePreference } from '../theme/applyAppearancePreference';
import type {
  AppearancePreference,
  LocalePreference,
  MapTypePreference,
} from './preferenceTypes';
import { settingsPersistStorage } from './mmkv';

type SettingsState = {
  appearance: AppearancePreference;
  localeMode: LocalePreference;
  mapHomeMapType: MapTypePreference;
  setAppearance: (value: AppearancePreference) => void;
  setLocaleMode: (value: LocalePreference) => void;
  setMapHomeMapType: (value: MapTypePreference) => void;
};

export type {
  AppearancePreference,
  LocalePreference,
  MapTypePreference,
} from './preferenceTypes';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      appearance: 'system',
      localeMode: 'system',
      mapHomeMapType: 'standard',
      setAppearance: (appearance) => {
        applyAppearancePreference(appearance);
        set({ appearance });
      },
      setLocaleMode: (localeMode) => set({ localeMode }),
      setMapHomeMapType: (mapHomeMapType) => set({ mapHomeMapType }),
    }),
    {
      name: 'ciclepark-settings-v1',
      storage: settingsPersistStorage,
      partialize: (s) => ({
        appearance: s.appearance,
        localeMode: s.localeMode,
        mapHomeMapType: s.mapHomeMapType,
      }),
    },
  ),
);
