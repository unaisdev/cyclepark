import * as Location from 'expo-location';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useOnboardingStore } from '../../../stores/onboardingStore';
import { useOnboardingGoToNext } from '../onboardingCarouselContext';
import { onboardingStyles } from '../onboardingStyles';
import { OnboardingPrimaryButton } from '../OnboardingPrimaryButton';
import { OnboardingSlideShell } from '../OnboardingSlideShell';

export function OnboardingLocationSlide() {
  const { t } = useTranslation();
  const goToNext = useOnboardingGoToNext();
  const setLocationOutcome = useOnboardingStore((s) => s.setLocationOutcome);
  const [busy, setBusy] = useState(false);

  const onAllow = async () => {
    setBusy(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationOutcome(status === 'granted' ? 'granted' : 'denied');
    } finally {
      setBusy(false);
    }
    goToNext();
  };

  const onSkip = () => {
    setLocationOutcome('skipped');
    goToNext();
  };

  return (
    <OnboardingSlideShell
      footer={
        <View style={onboardingStyles.footerActionsColumn}>
          <OnboardingPrimaryButton
            label={t('screens.onboarding.location.allow')}
            onPress={() => void onAllow()}
            disabled={busy}
          />
          <Pressable onPress={onSkip} style={onboardingStyles.linkBtn} accessibilityRole="button">
            <Text style={onboardingStyles.linkLabel}>{t('screens.onboarding.location.skip')}</Text>
          </Pressable>
        </View>
      }
    >
      <Text style={onboardingStyles.stepTitle}>{t('screens.onboarding.location.title')}</Text>
      <Text style={onboardingStyles.body}>{t('screens.onboarding.location.body')}</Text>
    </OnboardingSlideShell>
  );
}
