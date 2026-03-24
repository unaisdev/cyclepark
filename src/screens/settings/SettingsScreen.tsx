import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ChevronRight } from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { FLOATING_TAB_BAR_OFFSET } from '../../navigation/FloatingTabBar';
import { useUserPreferences } from '../../preferences/UserPreferencesContext';
import type { AppearancePreference, LocalePreference } from '../../preferences/preferenceStorage';
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
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.35,
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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: theme.app.surface,
  },
  row: {
    minHeight: 48,
    paddingVertical: 11,
    paddingHorizontal: theme.layout.space4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowPressed: {
    opacity: 0.55,
  },
  rowLabel: {
    ...theme.typography.body,
    color: theme.app.textPrimary,
    flex: 1,
  },
  rowValue: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
    maxWidth: '52%',
    textAlign: 'right',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '58%',
  },
}));

function SettingsRow({ label, valueLabel, onPress }: { label: string; valueLabel: string; onPress: () => void }) {
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
        <Text style={styles.rowLabel}>{label}</Text>
        <View style={styles.rowRight}>
          <Text style={styles.rowValue} numberOfLines={1}>
            {valueLabel}
          </Text>
          <ChevronRight size={20} color={theme.app.textMuted} strokeWidth={2} />
        </View>
      </Pressable>
    </View>
  );
}

export function SettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { appearance, localeMode, setAppearance, setLocaleMode } = useUserPreferences();
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
    ],
    [t],
  );

  const openAppearancePicker = useCallback(() => {
    setPickerKind('appearance');
    requestAnimationFrame(() => pickerRef.current?.present());
  }, []);

  const openLocalePicker = useCallback(() => {
    setPickerKind('locale');
    requestAnimationFrame(() => pickerRef.current?.present());
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
            label={t('screens.settings.appearance.rowTitle')}
            valueLabel={appearanceLabel}
            onPress={openAppearancePicker}
          />
        </View>

        <Text style={styles.sectionHeader}>{t('screens.settings.sectionLanguage')}</Text>
        <View style={styles.group}>
          <SettingsRow
            label={t('screens.settings.language.rowTitle')}
            valueLabel={localeLabel}
            onPress={openLocalePicker}
          />
        </View>
      </ScrollView>

      <SettingsOptionPickerSheet
        ref={pickerRef}
        title={sheetTitle}
        options={sheetOptions}
        selectedValue={sheetSelected}
        onSelectValue={onPick}
      />
    </View>
  );
}
