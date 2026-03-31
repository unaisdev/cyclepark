import { Platform } from 'react-native';
import { createMMKV } from 'react-native-mmkv';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

function toStateStorage(mmkv: ReturnType<typeof createMMKV>): StateStorage {
  return {
    setItem: (name, value) => {
      mmkv.set(name, value);
    },
    getItem: (name) => mmkv.getString(name) ?? null,
    removeItem: (name) => {
      mmkv.remove(name);
    },
  };
}

function webStorage(prefix: string): StateStorage {
  const key = (name: string) => `${prefix}:${name}`;
  return {
    setItem: (name, value) => {
      try {
        globalThis.localStorage?.setItem(key(name), value);
      } catch {
        /* ignore quota / private mode */
      }
    },
    getItem: (name) => {
      try {
        return globalThis.localStorage?.getItem(key(name)) ?? null;
      } catch {
        return null;
      }
    },
    removeItem: (name) => {
      try {
        globalThis.localStorage?.removeItem(key(name));
      } catch {
        /* ignore */
      }
    },
  };
}

let settingsMmkv: ReturnType<typeof createMMKV> | null = null;
let onboardingMmkv: ReturnType<typeof createMMKV> | null = null;
let billingMmkv: ReturnType<typeof createMMKV> | null = null;

function getSettingsStorage(): StateStorage {
  if (Platform.OS === 'web') {
    return webStorage('ciclepark-settings');
  }
  if (!settingsMmkv) {
    settingsMmkv = createMMKV({ id: 'ciclepark-settings' });
  }
  return toStateStorage(settingsMmkv);
}

function getOnboardingStorage(): StateStorage {
  if (Platform.OS === 'web') {
    return webStorage('ciclepark-onboarding');
  }
  if (!onboardingMmkv) {
    onboardingMmkv = createMMKV({ id: 'ciclepark-onboarding' });
  }
  return toStateStorage(onboardingMmkv);
}

function getBillingStorage(): StateStorage {
  if (Platform.OS === 'web') {
    return webStorage('ciclepark-billing');
  }
  if (!billingMmkv) {
    billingMmkv = createMMKV({ id: 'ciclepark-billing' });
  }
  return toStateStorage(billingMmkv);
}

export const settingsPersistStorage = createJSONStorage(getSettingsStorage);
export const onboardingPersistStorage = createJSONStorage(getOnboardingStorage);
export const billingPersistStorage = createJSONStorage(getBillingStorage);
