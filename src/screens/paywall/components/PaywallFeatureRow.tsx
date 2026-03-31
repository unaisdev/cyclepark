import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.layout.space3,
  },
  iconWell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.app.surface,
    borderWidth: 1,
    borderColor: theme.app.borderSubtle,
  },
  label: {
    flex: 1,
    ...theme.typography.body,
    color: theme.app.textPrimary,
    paddingTop: 2,
  },
}));

type Props = {
  icon: LucideIcon;
  text: string;
};

export function PaywallFeatureRow({ icon: Icon, text }: Props) {
  const { theme } = useUnistyles();
  return (
    <View style={styles.row}>
      <View style={styles.iconWell}>
        <Icon size={20} color={theme.app.textSecondary} strokeWidth={2.2} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}
