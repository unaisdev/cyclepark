import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LEGAL_DOCUMENTS_VERSION } from '../constants/legalVersion';
import type { LocalePreference } from './preferenceTypes';
import { onboardingPersistStorage } from './mmkv';

export type OnboardingPermissionOutcome =
  | 'not_requested'
  | 'granted'
  | 'denied'
  | 'skipped';

export type OnboardingPersistedSlice = {
  hasCompletedOnboarding: boolean;
  completedAt: number | null;
  /** Idioma elegido en el paso de onboarding (copia explícita de la elección del usuario). */
  localeChoice: LocalePreference;
  locationOutcome: OnboardingPermissionOutcome;
  notificationsOutcome: OnboardingPermissionOutcome;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingOptIn: boolean;
  /** Versión legal aceptada al finalizar; vacío hasta completar. */
  agreedLegalVersion: string;
};

type OnboardingState = OnboardingPersistedSlice & {
  setLocaleChoice: (value: LocalePreference) => void;
  setLocationOutcome: (value: OnboardingPermissionOutcome) => void;
  setNotificationsOutcome: (value: OnboardingPermissionOutcome) => void;
  setTermsAccepted: (value: boolean) => void;
  setPrivacyAccepted: (value: boolean) => void;
  setMarketingOptIn: (value: boolean) => void;
  completeOnboarding: () => void;
};

const initialPersisted: OnboardingPersistedSlice = {
  hasCompletedOnboarding: false,
  completedAt: null,
  localeChoice: 'system',
  locationOutcome: 'not_requested',
  notificationsOutcome: 'not_requested',
  termsAccepted: false,
  privacyAccepted: false,
  marketingOptIn: false,
  agreedLegalVersion: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialPersisted,
      setLocaleChoice: (localeChoice) => set({ localeChoice }),
      setLocationOutcome: (locationOutcome) => set({ locationOutcome }),
      setNotificationsOutcome: (notificationsOutcome) => set({ notificationsOutcome }),
      setTermsAccepted: (termsAccepted) => set({ termsAccepted }),
      setPrivacyAccepted: (privacyAccepted) => set({ privacyAccepted }),
      setMarketingOptIn: (marketingOptIn) => set({ marketingOptIn }),
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
          completedAt: Date.now(),
          agreedLegalVersion: LEGAL_DOCUMENTS_VERSION,
        }),
    }),
    {
      name: 'ciclepark-onboarding-v1',
      storage: onboardingPersistStorage,
      partialize: (s) => ({
        hasCompletedOnboarding: s.hasCompletedOnboarding,
        completedAt: s.completedAt,
        localeChoice: s.localeChoice,
        locationOutcome: s.locationOutcome,
        notificationsOutcome: s.notificationsOutcome,
        termsAccepted: s.termsAccepted,
        privacyAccepted: s.privacyAccepted,
        marketingOptIn: s.marketingOptIn,
        agreedLegalVersion: s.agreedLegalVersion,
      }),
    },
  ),
);
