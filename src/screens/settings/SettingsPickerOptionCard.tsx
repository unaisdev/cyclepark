import { Check } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  pressable: {
    borderRadius: theme.layout.radiusLg,
    borderWidth: 1.5,
    paddingVertical: theme.layout.space3,
    paddingHorizontal: theme.layout.space3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.space3,
    minHeight: 72,
  },
  pressableSelected: {
    borderWidth: 2,
  },
  leadingTile: {
    width: 48,
    height: 48,
    borderRadius: theme.layout.radiusMd,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadingCode: {
    ...theme.typography.label,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 2,
  },
  title: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  description: {
    ...theme.typography.caption,
    lineHeight: 16,
  },
  trailingRadio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trailingRadioSelected: {
    borderWidth: 0,
  },
}));

export type SettingsPickerOptionCardProps = {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  Icon?: LucideIcon;
  /** Código corto en el tile izquierdo (p. ej. "ES") si no hay Icon */
  leadingCode?: string;
};

export function SettingsPickerOptionCard({
  label,
  description,
  selected,
  onPress,
  Icon,
  leadingCode,
}: SettingsPickerOptionCardProps) {
  const { theme } = useUnistyles();
  const isDark = UnistylesRuntime.themeName === 'dark';

  const borderColor = selected
    ? theme.app.primary
    : isDark
      ? '#4A4A4A'
      : '#E2E2E2';
  const cardBg = selected
    ? `${theme.app.primary}14`
    : isDark
      ? '#2E2E2E'
      : theme.app.surface;
  const tileBg = selected ? `${theme.app.primary}22` : isDark ? '#3A3A3A' : '#F1F2F2';
  const iconColor = selected ? theme.app.primary : theme.app.textMuted;
  const titleColor = theme.app.textPrimary;
  const descColor = theme.app.textSecondary;

  const showLeading = Boolean(Icon || leadingCode);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        selected && styles.pressableSelected,
        {
          borderColor,
          backgroundColor: cardBg,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={description ? `${label}. ${description}` : label}
    >
      {showLeading ? (
        <View style={[styles.leadingTile, { backgroundColor: tileBg }]}>
          {Icon ? (
            <Icon size={24} color={iconColor} strokeWidth={2} />
          ) : (
            <Text style={[styles.leadingCode, { color: iconColor }]}>{leadingCode ?? ''}</Text>
          )}
        </View>
      ) : null}
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: titleColor }]} numberOfLines={2}>
          {label}
        </Text>
        {description ? (
          <Text style={[styles.description, { color: descColor }]} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
      {selected ? (
        <View
          style={[
            styles.trailingRadio,
            styles.trailingRadioSelected,
            { backgroundColor: theme.app.primary },
          ]}
        >
          <Check size={16} color={theme.app.onPrimary} strokeWidth={2.8} />
        </View>
      ) : (
        <View style={[styles.trailingRadio, { borderColor }]} />
      )}
    </Pressable>
  );
}
