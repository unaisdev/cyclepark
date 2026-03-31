import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, Text, View } from 'react-native';
import { useOnboardingStore } from '../../../stores/onboardingStore';
import { useOnboardingGoToNext } from '../onboardingCarouselContext';
import { onboardingStyles } from '../onboardingStyles';
import { OnboardingPrimaryButton } from '../OnboardingPrimaryButton';
import { OnboardingSlideShell } from '../OnboardingSlideShell';

export function OnboardingNotificationsSlide() {
  const { t } = useTranslation();
  const goToNext = useOnboardingGoToNext();
  const setNotificationsOutcome = useOnboardingStore((s) => s.setNotificationsOutcome);
  const [busy, setBusy] = useState(false);

  const onAllow = async () => {
    setBusy(true);
    try {
      if (Platform.OS === 'web') {
        setNotificationsOutcome('skipped');
      } else {
        const { status } = await Notifications.requestPermissionsAsync();
        setNotificationsOutcome(status === 'granted' ? 'granted' : 'denied');
      }
    } finally {
      setBusy(false);
    }
    goToNext();
  };

  const onSkip = () => {
    setNotificationsOutcome('skipped');
    goToNext();
  };

  return (
    <OnboardingSlideShell
      footer={
        <View style={onboardingStyles.footerActionsColumn}>
          <OnboardingPrimaryButton
            label={t('screens.onboarding.notifications.allow')}
            onPress={() => void onAllow()}
            disabled={busy}
          />
          <Pressable onPress={onSkip} style={onboardingStyles.linkBtn} accessibilityRole="button">
            <Text style={onboardingStyles.linkLabel}>{t('screens.onboarding.notifications.skip')}</Text>
          </Pressable>
        </View>
      }
    >
      <Text style={onboardingStyles.stepTitle}>{t('screens.onboarding.notifications.title')}</Text>
      <Text style={onboardingStyles.body}>{t('screens.onboarding.notifications.body')}</Text>
    </OnboardingSlideShell>
  );
}
