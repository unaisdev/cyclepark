import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronRight, HeartHandshake, Languages, Palette, type LucideIcon } from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { FLOATING_TAB_BAR_OFFSET } from '../../navigation/FloatingTabBar';
import { mapHomeChrome } from '../map/mapHomeTheme';
import type { RootStackParamList } from '../../navigation/types';
import { useBillingStore } from '../../stores/billingStore';
import type { AppearancePreference, LocalePreference } from '../../stores/settingsStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { SettingsOptionPickerSheet, type SettingsPickerOption } from './SettingsOptionPickerSheet';

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
  },
  scrollContent: {
    paddingHorizontal: theme.layout.space4,
    paddingBottom: FLOATING_TAB_BAR_OFFSET + theme.layout.space4,
  },
  largeTitle: {
    ...theme.typography.screenLargeTitle,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space4,
  },
  sectionHeader: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '400',
    color: theme.app.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.15,
    marginLeft: theme.layout.space3,
    marginBottom: theme.layout.space2,
    marginTop: theme.layout.space5,
  },
  sectionHeaderFirst: {
    marginTop: theme.layout.space2,
  },
  group: {
    borderRadius: theme.layout.radiusLg,
    overflow: 'hidden',
    backgroundColor: theme.app.surface,
    ...mapHomeChrome.ambientShadow,
  },
  row: {
    minHeight: 48,
    paddingVertical: 11,
    paddingHorizontal: theme.layout.space4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.layout.space3,
  },
  rowPressed: {
    opacity: 0.55,
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.space3,
    minWidth: 0,
  },
  rowIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    ...theme.typography.body,
    color: theme.app.textPrimary,
    flexShrink: 1,
  },
  rowValue: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
    textAlign: 'right',
  },
  rowRight: {
    flex: 1.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    minWidth: 0,
  },
  rowValueWrap: {
    flex: 1,
    minWidth: 0,
    alignItems: 'flex-end',
  },
}));

function SettingsRow({
  label,
  valueLabel,
  onPress,
  Icon,
}: {
  label: string;
  valueLabel: string;
  onPress: () => void;
  Icon: LucideIcon;
}) {
  const { theme } = useUnistyles();
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={valueLabel}
      >
        <View style={styles.rowLeft}>
          <View style={styles.rowIconWrap} accessible={false} importantForAccessibility="no-hide-descendants">
            <Icon size={22} color={theme.app.textSecondary} strokeWidth={2} />
          </View>
          <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <View style={styles.rowRight}>
          <View style={styles.rowValueWrap}>
            <Text style={styles.rowValue}>{valueLabel}</Text>
          </View>
          <ChevronRight size={20} color={theme.app.textMuted} strokeWidth={2} />
        </View>
      </Pressable>
    </View>
  );
}

type SettingsNav = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export function SettingsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<SettingsNav>();
  const insets = useSafeAreaInsets();
  useUnistyles();
  const appearance = useSettingsStore((s) => s.appearance);
  const localeMode = useSettingsStore((s) => s.localeMode);
  const setAppearance = useSettingsStore((s) => s.setAppearance);
  const setLocaleMode = useSettingsStore((s) => s.setLocaleMode);
  const isPremium = useBillingStore((s) => s.isPremium);
  const pickerRef = useRef<BottomSheetModalMethods>(null);
  const [pickerKind, setPickerKind] = useState<'appearance' | 'locale'>('appearance');

  const appearanceOptions: SettingsPickerOption[] = useMemo(
    () => [
      { value: 'system', label: t('screens.settings.appearance.system') },
      { value: 'light', label: t('screens.settings.appearance.light') },
      { value: 'dark', label: t('screens.settings.appearance.dark') },
    ],
    [t],
  );

  const localeOptions: SettingsPickerOption[] = useMemo(
    () => [
      { value: 'system', label: t('screens.settings.language.system') },
      { value: 'es', label: t('screens.settings.language.es') },
      { value: 'en', label: t('screens.settings.language.en') },
      { value: 'ca', label: t('screens.settings.language.ca') },
      { value: 'eu', label: t('screens.settings.language.eu') },
    ],
    [t],
  );

  const openAppearancePicker = useCallback(() => {
    setPickerKind('appearance');
    queueMicrotask(() => pickerRef.current?.present());
  }, []);

  const openLocalePicker = useCallback(() => {
    setPickerKind('locale');
    queueMicrotask(() => pickerRef.current?.present());
  }, []);

  const appearanceLabels: Record<AppearancePreference, string> = {
    system: t('screens.settings.appearance.system'),
    light: t('screens.settings.appearance.light'),
    dark: t('screens.settings.appearance.dark'),
  };
  const appearanceLabel = appearanceLabels[appearance];

  const localeLabels: Record<LocalePreference, string> = {
    system: t('screens.settings.language.system'),
    es: t('screens.settings.language.es'),
    en: t('screens.settings.language.en'),
    ca: t('screens.settings.language.ca'),
    eu: t('screens.settings.language.eu'),
  };
  const localeLabel = localeLabels[localeMode];

  const onPick = useCallback(
    (value: string) => {
      if (pickerKind === 'appearance') {
        setAppearance(value as AppearancePreference);
      } else {
        setLocaleMode(value as LocalePreference);
      }
    },
    [pickerKind, setAppearance, setLocaleMode],
  );

  const sheetTitle =
    pickerKind === 'appearance'
      ? t('screens.settings.appearance.sheetTitle')
      : t('screens.settings.language.sheetTitle');

  const sheetOptions = pickerKind === 'appearance' ? appearanceOptions : localeOptions;
  const sheetSelected = pickerKind === 'appearance' ? appearance : localeMode;
  const premiumStatusLabel = isPremium
    ? t('screens.settings.premium.statusActive')
    : t('screens.settings.premium.statusInactive');

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 8 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.largeTitle} accessibilityRole="header">
          {t('screens.settings.title')}
        </Text>

        <Text style={[styles.sectionHeader, styles.sectionHeaderFirst]}>
          {t('screens.settings.sectionAppearance')}
        </Text>
        <View style={styles.group}>
          <SettingsRow
            Icon={Palette}
            label={t('screens.settings.appearance.rowTitle')}
            valueLabel={appearanceLabel}
            onPress={openAppearancePicker}
          />
        </View>

        <Text style={styles.sectionHeader}>{t('screens.settings.sectionLanguage')}</Text>
        <View style={styles.group}>
          <SettingsRow
            Icon={Languages}
            label={t('screens.settings.language.rowTitle')}
            valueLabel={localeLabel}
            onPress={openLocalePicker}
          />
        </View>

        <Text style={styles.sectionHeader}>{t('screens.settings.sectionSupport')}</Text>
        <View style={styles.group}>
          <SettingsRow
            Icon={HeartHandshake}
            label={t('screens.settings.premium.rowTitle')}
            valueLabel={premiumStatusLabel}
            onPress={() => navigation.navigate('Paywall')}
          />
        </View>
      </ScrollView>

      <SettingsOptionPickerSheet
        ref={pickerRef}
        sheetInstanceKey={pickerKind}
        title={sheetTitle}
        options={sheetOptions}
        selectedValue={sheetSelected}
        onSelectValue={onPick}
      />
    </View>
  );
}
