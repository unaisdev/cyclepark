import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { mapHomeChrome } from '../mapHomeTheme';

const ICON = 26;

const styles = StyleSheet.create((theme) => ({
  btn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    ...mapHomeChrome.ambientShadow,
  },
}));

type Props = {
  onPress?: () => void;
};

/** FAB icono: añadir aparcabicis (etiqueta solo en accesibilidad). */
export function MapHomePrimaryCta({ onPress }: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const isDark = UnistylesRuntime.themeName === 'dark';

  const bg = isDark ? theme.app.primary : mapHomeChrome.primaryCtaLight;
  const fg = isDark ? theme.app.onPrimary : mapHomeChrome.primaryCtaOnLight;

  return (
    <Pressable
      style={[styles.btn, { backgroundColor: bg }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('screens.map.addParking')}
    >
      <Plus size={ICON} color={fg} strokeWidth={2.5} />
    </Pressable>
  );
}
