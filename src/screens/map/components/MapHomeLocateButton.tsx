import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
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
  btnFollowActive: {
    borderWidth: 2,
    borderColor: theme.app.primary,
  },
}));

type Props = {
  onPress?: () => void;
  onLongPress?: () => void;
  followMeActive?: boolean;
};

export function MapHomeLocateButton({
  onPress,
  onLongPress,
  followMeActive = false,
}: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const longPressConsumedRef = useRef(false);

  return (
    <Pressable
      style={[styles.btn, followMeActive && styles.btnFollowActive]}
      onPressIn={() => {
        longPressConsumedRef.current = false;
      }}
      onLongPress={() => {
        longPressConsumedRef.current = true;
        onLongPress?.();
      }}
      onPress={() => {
        if (longPressConsumedRef.current) {
          longPressConsumedRef.current = false;
          return;
        }
        onPress?.();
      }}
      accessibilityRole="button"
      accessibilityLabel={
        followMeActive
          ? t('screens.map.locateFollowMeActiveA11y')
          : t('screens.map.locateA11y')
      }
      accessibilityHint={
        followMeActive
          ? t('screens.map.locateFollowMeStopHint')
          : t('screens.map.locateFollowMeHint')
      }
    >
      <LocateFixed
        size={ICON}
        color={followMeActive ? theme.app.primary : theme.app.textPrimary}
        strokeWidth={2}
      />
    </Pressable>
  );
}
