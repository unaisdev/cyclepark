import { BadgeCheck, Leaf } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  heroWrap: {
    marginBottom: theme.layout.space3,
  },
  heroCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.app.surface,
    borderWidth: 1,
    borderColor: theme.app.borderSubtle,
  },
  title: {
    ...theme.typography.screenLargeTitle,
    color: theme.app.textPrimary,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
    marginTop: theme.layout.space2,
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
  const HeroIcon = variant === 'supporter' ? BadgeCheck : Leaf;
  return (
    <View>
      <View style={styles.heroWrap}>
        <View style={styles.heroCircle} accessible={false}>
          <HeroIcon size={32} color={theme.app.textSecondary} strokeWidth={2} />
        </View>
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
