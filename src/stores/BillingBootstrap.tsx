import { useEffect } from 'react';
import { useBillingStore } from './billingStore';

export function BillingBootstrap() {
  const bootstrapIap = useBillingStore((s) => s.bootstrapIap);

  useEffect(() => {
    void bootstrapIap();
  }, [bootstrapIap]);

  return null;
}
