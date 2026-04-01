import { BadgeCheck, Leaf } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  title: {
    ...theme.typography.screenLargeTitle,
    color: theme.app.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
    marginTop: theme.layout.space2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.layout.space5,
  },
  textColumn: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    alignItems: 'flex-start',
  },
  titleStretch: {
    alignSelf: 'stretch',
  },
  trailingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.app.surface,
    borderWidth: 1,
    borderColor: theme.app.borderSubtle,
  },
}));

export type PaywallHeaderVariant = 'pitch' | 'supporter';

type Props = {
  title: string;
  subtitle: string;
  variant?: PaywallHeaderVariant;
};

export function PaywallHeader({ title, subtitle, variant = 'pitch' }: Props) {
  const { theme } = useUnistyles();
  const isSupporter = variant === 'supporter';
  const TrailingIcon = isSupporter ? BadgeCheck : Leaf;

  return (
    <View style={styles.titleRow}>
      <View style={styles.textColumn}>
        <Text style={[styles.title, styles.titleStretch]} accessibilityRole="header">
          {title}
        </Text>
        <Text style={[styles.subtitle, styles.titleStretch]}>{subtitle}</Text>
      </View>
      <View style={styles.trailingCircle} accessible={false} importantForAccessibility="no">
        <TrailingIcon size={38} color={theme.app.textSecondary} strokeWidth={2} />
      </View>
    </View>
  );
}
