import { Pressable, Text, View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { mapHomeChrome } from '../../map/mapHomeTheme';

const styles = StyleSheet.create((theme) => ({
  wrap: {
    gap: theme.layout.space3,
  },
  primaryBtn: {
    minHeight: 52,
    borderRadius: theme.layout.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.layout.space4,
    ...mapHomeChrome.ambientShadow,
  },
  primaryLabel: {
    ...theme.typography.label,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    minHeight: 48,
    borderRadius: theme.layout.radiusLg,
    borderWidth: 1,
    borderColor: theme.app.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.layout.space4,
  },
  secondaryLabel: {
    ...theme.typography.label,
    color: theme.app.textPrimary,
  },
  disabled: {
    opacity: 0.55,
  },
}));

type Props = {
  purchaseLabel: string;
  restoreLabel: string;
  isLoading?: boolean;
  onPressPurchase: () => void;
  onPressRestore: () => void;
};

export function PurchaseButtons({
  purchaseLabel,
  restoreLabel,
  isLoading,
  onPressPurchase,
  onPressRestore,
}: Props) {
  const { theme } = useUnistyles();
  const isDark = UnistylesRuntime.themeName === 'dark';
  const bg = isDark ? theme.app.primary : mapHomeChrome.primaryCtaLight;
  const fg = isDark ? theme.app.onPrimary : mapHomeChrome.primaryCtaOnLight;

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        onPress={onPressPurchase}
        disabled={isLoading}
        style={({ pressed }) => [styles.primaryBtn, { backgroundColor: bg }, pressed && { opacity: 0.94 }, isLoading && styles.disabled]}
      >
        <Text style={[styles.primaryLabel, { color: fg }]}>{purchaseLabel}</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onPressRestore}
        disabled={isLoading}
        style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.8 }, isLoading && styles.disabled]}
      >
        <Text style={styles.secondaryLabel}>{restoreLabel}</Text>
      </Pressable>
    </View>
  );
}
