import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { FLOATING_TAB_BAR_OFFSET } from '../navigation/FloatingTabBar';

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
    paddingHorizontal: theme.layout.space4,
  },
  title: {
    ...theme.typography.titleLarge,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space2,
  },
  caption: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
  },
}));

export function ListScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top + 12, paddingBottom: FLOATING_TAB_BAR_OFFSET }]}>
      <Text style={styles.title}>{t('screens.list.title')}</Text>
      <Text style={styles.caption}>{t('screens.list.caption')}</Text>
    </View>
  );
}
