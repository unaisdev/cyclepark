import { Platform } from 'react-native';
import {
  endConnection,
  fetchProducts,
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  requestPurchase,
  restorePurchases,
  type Product,
  type Purchase,
} from 'react-native-iap';
import { IAP_NON_CONSUMABLE_SKUS } from '../../constants/iap';

type BootstrapIapResult = {
  purchases: Purchase[];
};

let hasConnection = false;

function getProductIdsFromPurchase(purchase: Purchase): string[] {
  const ids = purchase.ids ?? [];
  return ids.length > 0 ? ids : [purchase.productId];
}

export function hasPremiumEntitlement(purchases: Purchase[]): boolean {
  const skuSet = new Set(IAP_NON_CONSUMABLE_SKUS);
  return purchases.some((purchase) =>
    getProductIdsFromPurchase(purchase).some((id) => skuSet.has(id as (typeof IAP_NON_CONSUMABLE_SKUS)[number])),
  );
}

export async function bootstrapIapConnection(): Promise<BootstrapIapResult> {
  if (!hasConnection) {
    await initConnection();
    hasConnection = true;
  }
  const purchases = await getAvailablePurchases({ onlyIncludeActiveItemsIOS: true });
  return { purchases };
}

export async function disconnectIapConnection() {
  if (!hasConnection) return;
  await endConnection();
  hasConnection = false;
}

export async function fetchNonConsumableProducts(): Promise<Product[]> {
  const products = (await fetchProducts({ skus: [...IAP_NON_CONSUMABLE_SKUS], type: 'in-app' })) ?? [];
  return products.filter((product): product is Product => product.type === 'in-app');
}

/** Token from Play Billing 7+ purchase options; required for some one-time products. */
export function getAndroidInAppOfferToken(product: Product): string | undefined {
  if (product.platform !== 'android') return undefined;
  const details = product.oneTimePurchaseOfferDetailsAndroid;
  const fromLegacy = details?.[0]?.offerToken;
  if (fromLegacy) return fromLegacy;
  const offers = product.discountOffers;
  const fromDiscount = offers?.map((o) => o.offerTokenAndroid).find(Boolean);
  return fromDiscount ?? undefined;
}

export async function requestNonConsumablePurchase(sku: string, androidOfferToken?: string | null) {
  if (Platform.OS === 'android') {
    const token = androidOfferToken?.trim();
    await requestPurchase({
      type: 'in-app',
      request: {
        google: {
          skus: [sku],
          ...(token ? { offerToken: token } : {}),
        },
      },
    });
    return;
  }
  await requestPurchase({ type: 'in-app', request: { apple: { sku } } });
}

export async function restoreAllPurchases() {
  await restorePurchases();
  return getAvailablePurchases({ onlyIncludeActiveItemsIOS: true });
}

export async function finalizePurchase(purchase: Purchase) {
  await finishTransaction({ purchase, isConsumable: false });
}
