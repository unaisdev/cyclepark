import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheet,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import type { LucideIcon } from 'lucide-react-native';
import { forwardRef, useCallback } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { SettingsPickerOptionCard } from './SettingsPickerOptionCard';

const styles = StyleSheet.create((theme) => ({
  content: {
    paddingHorizontal: theme.layout.space4,
    paddingBottom: theme.layout.space6,
  },
  header: {
    marginBottom: theme.layout.space4,
    alignSelf: 'stretch',
  },
  title: {
    ...theme.typography.titleLarge,
    fontSize: 30,
    lineHeight: 36,
    color: theme.app.textPrimary,
    textAlign: 'left',
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.app.textSecondary,
    textAlign: 'left',
    marginTop: theme.layout.space3,
    lineHeight: 20,
  },
  options: {
    gap: theme.layout.space3,
  },
}));

export type SettingsPickerOption = {
  value: string;
  label: string;
  description?: string;
  Icon?: LucideIcon;
  leadingCode?: string;
};

type SettingsOptionPickerSheetProps = {
  title: string;
  subtitle?: string;
  options: SettingsPickerOption[];
  selectedValue: string;
  onSelectValue: (value: string) => void;
};

function PickerBody({
  title,
  subtitle,
  options,
  selectedValue,
  onSelectValue,
}: SettingsOptionPickerSheetProps) {
  const { close } = useBottomSheet();

  const onPick = useCallback(
    (value: string) => {
      onSelectValue(value);
      close();
    },
    [close, onSelectValue],
  );

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View
        style={styles.options}
        accessibilityRole="radiogroup"
        accessibilityLabel={title}
      >
        {options.map((opt) => {
          const selected = opt.value === selectedValue;
          return (
            <SettingsPickerOptionCard
              key={opt.value}
              label={opt.label}
              description={opt.description}
              selected={selected}
              onPress={() => onPick(opt.value)}
              Icon={opt.Icon}
              leadingCode={opt.leadingCode}
            />
          );
        })}
      </View>
    </BottomSheetScrollView>
  );
}

export const SettingsOptionPickerSheet = forwardRef<
  BottomSheetModalMethods,
  SettingsOptionPickerSheetProps
>(function SettingsOptionPickerSheet(props, ref) {
  const { theme } = useUnistyles();

  const renderBackdrop = useCallback(
    (p: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...p} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.45} />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.app.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.app.borderSubtle }}
    >
      <PickerBody {...props} />
    </BottomSheetModal>
  );
});
