/** One-time unlock product IDs in App Store Connect / Play Console. */
export const IAP_PRODUCT_IDS = {
  supporterUnlock: 'ciclepark_supporter_unlock',
} as const;

export const IAP_NON_CONSUMABLE_SKUS = [IAP_PRODUCT_IDS.supporterUnlock] as const;
