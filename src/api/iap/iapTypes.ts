import type { Product, Purchase } from 'react-native-iap';

export type IapProduct = Product;
export type IapPurchase = Purchase;

export type RequestPurchaseResult = {
  requested: boolean;
};
