import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { mapHomeChrome } from '../../screens/map/mapHomeTheme';

const styles = StyleSheet.create((theme) => ({
  mapPill: {
    width: 48,
    height: 48,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...mapHomeChrome.ambientShadow,
  },
}));

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  children: ReactNode;
  accessibilityLabel: string;
  variant?: 'mapPill';
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  children,
  accessibilityLabel,
  variant = 'mapPill',
  style,
  ...pressableProps
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[variant === 'mapPill' && styles.mapPill, style]}
      {...pressableProps}
    >
      {children}
    </Pressable>
  );
}
