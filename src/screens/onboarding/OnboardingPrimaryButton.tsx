import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { mapHomeChrome } from '../map/mapHomeTheme';

const styles = StyleSheet.create((theme) => ({
  btn: {
    minHeight: 56,
    borderRadius: theme.layout.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.layout.space5,
    ...mapHomeChrome.ambientShadow,
  },
  label: {
    ...theme.typography.label,
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.38,
  },
}));

type Props = {
  onPress: () => void;
  disabled?: boolean;
  label: string;
  style?: StyleProp<ViewStyle>;
};

/** CTA alineado con el FAB del mapa (Stitch): negro en claro, `app.primary` en oscuro. */
export function OnboardingPrimaryButton({ onPress, disabled, label, style }: Props) {
  const { theme } = useUnistyles();
  const isDark = UnistylesRuntime.themeName === 'dark';
  const bg = isDark ? theme.app.primary : mapHomeChrome.primaryCtaLight;
  const fg = isDark ? theme.app.onPrimary : mapHomeChrome.primaryCtaOnLight;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg },
        disabled && styles.disabled,
        pressed && !disabled && { opacity: 0.92 },
        style,
      ]}
      accessibilityRole="button"
    >
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}
