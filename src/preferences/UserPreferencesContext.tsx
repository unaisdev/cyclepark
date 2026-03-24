import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { InteractionManager } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';
import { resolveDeviceLocale, setAppLocale } from '../i18n';
import {
  loadUserPreferences,
  saveUserPreferences,
  type AppearancePreference,
  type LocalePreference,
} from './preferenceStorage';

type UserPreferencesContextValue = {
  appearance: AppearancePreference;
  localeMode: LocalePreference;
  setAppearance: (value: AppearancePreference) => void;
  setLocaleMode: (value: LocalePreference) => void;
};

const UserPreferencesContext = createContext<UserPreferencesContextValue | null>(null);

function applyAppearancePreference(mode: AppearancePreference) {
  if (mode === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(mode);
  }
}

const PREFERENCES_SAVE_DEBOUNCE_MS = 450;

async function applyLocalePreference(mode: LocalePreference, options?: { defer?: boolean }) {
  const run = async () => {
    if (mode === 'system') {
      await setAppLocale(resolveDeviceLocale());
    } else {
      await setAppLocale(mode);
    }
  };

  if (options?.defer) {
    await new Promise<void>((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        void run().finally(() => resolve());
      });
    });
    return;
  }

  await run();
}

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearanceState] = useState<AppearancePreference>('system');
  const [localeMode, setLocaleModeState] = useState<LocalePreference>('system');
  const snapshot = useRef({ appearance, localeMode });
  snapshot.current = { appearance, localeMode };
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedulePreferencesSave = useCallback(() => {
    if (saveTimerRef.current !== null) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null;
      const { appearance: a, localeMode: l } = snapshot.current;
      void saveUserPreferences({ appearance: a, locale: l });
    }, PREFERENCES_SAVE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void loadUserPreferences().then((loaded) => {
      if (cancelled || !loaded) return;
      setAppearanceState(loaded.appearance);
      setLocaleModeState(loaded.locale);
      applyAppearancePreference(loaded.appearance);
      void applyLocalePreference(loaded.locale);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(
    () => () => {
      if (saveTimerRef.current !== null) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
        const { appearance: a, localeMode: l } = snapshot.current;
        void saveUserPreferences({ appearance: a, locale: l });
      }
    },
    [],
  );

  const setAppearance = useCallback((value: AppearancePreference) => {
    setAppearanceState(value);
    applyAppearancePreference(value);
    schedulePreferencesSave();
  }, [schedulePreferencesSave]);

  const setLocaleMode = useCallback((value: LocalePreference) => {
    setLocaleModeState(value);
    void applyLocalePreference(value, { defer: true });
    schedulePreferencesSave();
  }, [schedulePreferencesSave]);

  const value = useMemo(
    () => ({
      appearance,
      localeMode,
      setAppearance,
      setLocaleMode,
    }),
    [appearance, localeMode, setAppearance, setLocaleMode],
  );

  return <UserPreferencesContext.Provider value={value}>{children}</UserPreferencesContext.Provider>;
}

export function useUserPreferences() {
  const ctx = useContext(UserPreferencesContext);
  if (!ctx) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return ctx;
}
