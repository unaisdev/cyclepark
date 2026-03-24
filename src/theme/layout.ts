import { radius } from './tokens/radius';
import { sizing } from './tokens/sizing';
import { spacing } from './tokens/spacing';

export const layout = {
  ...spacing,
  ...radius,
  ...sizing,
} as const;
