import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheet,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Check } from 'lucide-react-native';
import { forwardRef, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  content: {
    paddingHorizontal: theme.layout.space4,
    paddingBottom: theme.layout.space6,
  },
  title: {
    ...theme.typography.titleMedium,
    color: theme.app.textPrimary,
    textAlign: 'center',
    marginBottom: theme.layout.space4,
    paddingHorizontal: theme.layout.space2,
  },
  optionRow: {
    minHeight: 52,
    paddingVertical: theme.layout.space3,
    paddingHorizontal: theme.layout.space3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.layout.radiusMd,
  },
  optionLabel: {
    ...theme.typography.body,
    color: theme.app.textPrimary,
    flex: 1,
    paddingRight: theme.layout.space3,
  },
}));

export type SettingsPickerOption = {
  value: string;
  label: string;
};

type SettingsOptionPickerSheetProps = {
  title: string;
  options: SettingsPickerOption[];
  selectedValue: string;
  onSelectValue: (value: string) => void;
};

function PickerBody({
  title,
  options,
  selectedValue,
  onSelectValue,
}: SettingsOptionPickerSheetProps) {
  const { theme } = useUnistyles();
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
      <Text style={styles.title}>{title}</Text>
      <View>
        {options.map((opt) => {
          const selected = opt.value === selectedValue;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onPick(opt.value)}
              style={({ pressed }) => [
                styles.optionRow,
                { backgroundColor: pressed ? theme.app.surfaceMuted : 'transparent' },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text style={styles.optionLabel}>{opt.label}</Text>
              {selected ? <Check size={22} color={theme.app.primary} strokeWidth={2.5} /> : null}
            </Pressable>
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
