import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheet,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { mapHomeChrome } from '../mapHomeTheme';

const SNAP_POINTS = ['40%', '86%'] as const;

const styles = StyleSheet.create((theme) => ({
  sheetView: {
    flex: 1,
    paddingHorizontal: theme.layout.space4,
    paddingBottom: theme.layout.space4,
  },
  title: {
    ...theme.typography.titleLarge,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space3,
  },
  body: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
    marginBottom: theme.layout.space4,
    lineHeight: 22,
  },
  actions: {
    gap: theme.layout.space3,
  },
  row: {
    flexDirection: 'row',
    gap: theme.layout.space3,
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: theme.layout.space3,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: {
    ...theme.typography.label,
    fontSize: 16,
  },
  ghostBtn: {
    paddingVertical: theme.layout.space3,
    paddingHorizontal: theme.layout.space4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  ghostLabel: {
    ...theme.typography.label,
    fontSize: 16,
    color: theme.app.textSecondary,
  },
}));

type FlowBodyProps = {
  step: 0 | 1;
  setStep: (s: 0 | 1) => void;
};

function AddParkingFlowBody({ step, setStep }: FlowBodyProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { close, snapToIndex } = useBottomSheet();

  const onContinue = useCallback(() => {
    setStep(1);
    requestAnimationFrame(() => snapToIndex(1));
  }, [setStep, snapToIndex]);

  const onBack = useCallback(() => {
    setStep(0);
    requestAnimationFrame(() => snapToIndex(0));
  }, [setStep, snapToIndex]);

  const onCancel = useCallback(() => close(), [close]);

  const onSubmit = useCallback(() => {
    Alert.alert('', t('screens.map.addParkingFlow.comingSoon'));
  }, [t]);

  const primaryBg = theme.app.primary;
  const primaryFg = theme.app.onPrimary;
  const secondaryBg = theme.app.surfaceMuted;

  if (step === 0) {
    return (
      <BottomSheetView style={styles.sheetView}>
        <Text style={styles.title}>{t('screens.map.addParkingFlow.step1Title')}</Text>
        <Text style={styles.body}>{t('screens.map.addParkingFlow.step1Body')}</Text>
        <View style={styles.actions}>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: primaryBg }]}
            onPress={onContinue}
            accessibilityRole="button"
            accessibilityLabel={t('screens.map.addParkingFlow.continue')}
          >
            <Text style={[styles.primaryLabel, { color: primaryFg }]}>
              {t('screens.map.addParkingFlow.continue')}
            </Text>
          </Pressable>
          <Pressable
            style={styles.ghostBtn}
            onPress={onCancel}
            accessibilityRole="button"
            accessibilityLabel={t('screens.map.addParkingFlow.cancel')}
          >
            <Text style={styles.ghostLabel}>{t('screens.map.addParkingFlow.cancel')}</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    );
  }

  return (
    <BottomSheetView style={styles.sheetView}>
      <Text style={styles.title}>{t('screens.map.addParkingFlow.step2Title')}</Text>
      <Text style={styles.body}>{t('screens.map.addParkingFlow.step2Body')}</Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.primaryBtn, { flex: 0, backgroundColor: secondaryBg, ...mapHomeChrome.ambientShadow }]}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={t('screens.map.addParkingFlow.back')}
        >
          <Text style={[styles.primaryLabel, { color: theme.app.textPrimary }]}>
            {t('screens.map.addParkingFlow.back')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.primaryBtn, { backgroundColor: primaryBg }]}
          onPress={onSubmit}
          accessibilityRole="button"
          accessibilityLabel={t('screens.map.addParkingFlow.submit')}
        >
          <Text style={[styles.primaryLabel, { color: primaryFg }]}>
            {t('screens.map.addParkingFlow.submit')}
          </Text>
        </Pressable>
      </View>
    </BottomSheetView>
  );
}

export const AddParkingFlowSheet = forwardRef<BottomSheetModalMethods>(function AddParkingFlowSheet(_, ref) {
  const { theme } = useUnistyles();
  const [step, setStep] = useState<0 | 1>(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.45} />
    ),
    [],
  );

  const handleDismiss = useCallback(() => {
    setStep(0);
  }, []);

  const snapPoints = useMemo(() => [...SNAP_POINTS], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.app.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.app.borderSubtle }}
      onDismiss={handleDismiss}
    >
      <AddParkingFlowBody step={step} setStep={setStep} />
    </BottomSheetModal>
  );
});
