import Constants from 'expo-constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Platform } from 'react-native';
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type EventSubscription,
  type PurchaseError,
} from 'react-native-iap';
import { IAP_PRODUCT_IDS, IAP_NON_CONSUMABLE_SKUS } from '../constants/iap';
import {
  bootstrapIapConnection,
  disconnectIapConnection,
  fetchNonConsumableProducts,
  finalizePurchase,
  getAndroidInAppOfferToken,
  hasPremiumEntitlement,
  requestNonConsumablePurchase,
  restoreAllPurchases,
  type IapProduct,
} from '../api/iap';
import { billingPersistStorage } from './mmkv';

type BillingState = {
  isPremium: boolean;
  products: IapProduct[];
  isLoading: boolean;
  isBootstrapped: boolean;
  lastError: string | null;
  bootstrapIap: () => Promise<void>;
  loadProducts: () => Promise<void>;
  purchase: (sku?: string) => Promise<void>;
  restore: () => Promise<void>;
  clearError: () => void;
  teardown: () => Promise<void>;
  setPremium: (value: boolean) => void;
};

let purchaseUpdateSub: EventSubscription | null = null;
let purchaseErrorSub: EventSubscription | null = null;

/** PRE builds use `applicationIdSuffix .pre` — Play Billing only sees SKUs for that exact app listing. */
function androidPrePackageBillingHint(): string | null {
  if (Platform.OS !== 'android') return null;
  const pkg = Constants.expoConfig?.android?.package;
  if (!pkg?.endsWith('.pre')) return null;
  return ` This build is ${pkg}: the in-app product must exist in Play Console for this same application ID. If you only configured billing on the production app (without .pre), use a prod build (e.g. yarn android) or add the same product to the pre app and upload a pre build to a test track.`;
}

function withAndroidPreBillingHint(message: string): string {
  const hint = androidPrePackageBillingHint();
  if (!hint) return message;
  if (
    /not be found|could not be found|item unavailable|ITEM_UNAVAILABLE|product not found/i.test(
      message,
    )
  ) {
    return `${message.trim()}${hint}`;
  }
  return message;
}

function formatBillingError(error: unknown): string {
  const fallback =
    'Billing unavailable on this device. Use a Play Store / App Store test environment.';
  if (!error) return withAndroidPreBillingHint(fallback);

  if (typeof error === 'string') {
    return withAndroidPreBillingHint(error);
  }
  if (error instanceof Error) {
    const trimmed = error.message.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed) as { debugMessage?: string; message?: string };
        const inner = parsed.debugMessage ?? parsed.message ?? fallback;
        return withAndroidPreBillingHint(inner);
      } catch {
        return withAndroidPreBillingHint(fallback);
      }
    }
    return withAndroidPreBillingHint(trimmed || fallback);
  }

  return withAndroidPreBillingHint(fallback);
}

function attachPurchaseListeners() {
  if (!purchaseUpdateSub) {
    purchaseUpdateSub = purchaseUpdatedListener(async (purchase) => {
      try {
        await finalizePurchase(purchase);
        if (hasPremiumEntitlement([purchase])) {
          useBillingStore.getState().setPremium(true);
        }
      } catch (error) {
        useBillingStore.setState({
          lastError: formatBillingError(error),
          isLoading: false,
        });
      }
    });
  }

  if (!purchaseErrorSub) {
    purchaseErrorSub = purchaseErrorListener((error: PurchaseError) => {
      useBillingStore.setState({ lastError: formatBillingError(error), isLoading: false });
    });
  }
}

function detachPurchaseListeners() {
  purchaseUpdateSub?.remove();
  purchaseErrorSub?.remove();
  purchaseUpdateSub = null;
  purchaseErrorSub = null;
}

export const useBillingStore = create<BillingState>()(
  persist(
    (set, get) => ({
      isPremium: false,
      products: [],
      isLoading: false,
      isBootstrapped: false,
      lastError: null,
      setPremium: (isPremium) => set({ isPremium }),
      clearError: () => set({ lastError: null }),
      bootstrapIap: async () => {
        if (get().isBootstrapped) return;
        set({ isLoading: true, lastError: null });
        try {
          const { purchases } = await bootstrapIapConnection();
          attachPurchaseListeners();
          set({
            isPremium: hasPremiumEntitlement(purchases),
            isBootstrapped: true,
            isLoading: false,
          });
          await get().loadProducts();
        } catch (error) {
          set({
            isLoading: false,
            lastError: formatBillingError(error),
          });
        }
      },
      loadProducts: async () => {
        try {
          const products = await fetchNonConsumableProducts();
          set({ products });
        } catch (error) {
          set({ lastError: formatBillingError(error) });
        }
      },
      purchase: async (sku = IAP_PRODUCT_IDS.supporterUnlock) => {
        set({ isLoading: true, lastError: null });
        try {
          let androidOfferToken: string | undefined;
          if (Platform.OS === 'android') {
            const fresh = await fetchNonConsumableProducts();
            set({ products: fresh });
            const product = fresh.find((p) => p.id === sku);
            if (!product) {
              const base = `Play Store did not return product "${sku}". Check the product ID and that this app's package matches the Play app where the product is configured.`;
              set({
                lastError: `${base}${androidPrePackageBillingHint() ?? ''}`,
                isLoading: false,
              });
              return;
            }
            androidOfferToken = getAndroidInAppOfferToken(product);
          }
          await requestNonConsumablePurchase(sku, androidOfferToken);
        } catch (error) {
          set({
            lastError: formatBillingError(error),
            isLoading: false,
          });
          return;
        }
        set({ isLoading: false });
      },
      restore: async () => {
        set({ isLoading: true, lastError: null });
        try {
          const purchases = await restoreAllPurchases();
          set({
            isPremium: hasPremiumEntitlement(purchases),
            isLoading: false,
          });
        } catch (error) {
          set({
            lastError: formatBillingError(error),
            isLoading: false,
          });
        }
      },
      teardown: async () => {
        detachPurchaseListeners();
        await disconnectIapConnection();
        set({ isBootstrapped: false });
      },
    }),
    {
      name: 'ciclepark-billing-v1',
      storage: billingPersistStorage,
      partialize: (state) => ({
        isPremium: state.isPremium,
      }),
    },
  ),
);

export const PRIMARY_SUPPORTER_SKU = IAP_NON_CONSUMABLE_SKUS[0];
