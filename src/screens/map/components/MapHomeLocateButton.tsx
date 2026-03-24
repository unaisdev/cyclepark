import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { LocateFixed } from 'lucide-react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { mapHomeChrome } from '../mapHomeTheme';

const ICON = 24;

const styles = StyleSheet.create((theme) => ({
  btn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.app.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...mapHomeChrome.ambientShadow,
  },
}));

type Props = {
  onPress?: () => void;
};

export function MapHomeLocateButton({ onPress }: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <Pressable
      style={styles.btn}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('screens.map.locateA11y')}
    >
      <LocateFixed size={ICON} color={theme.app.textPrimary} strokeWidth={2} />
    </Pressable>
  );
}
