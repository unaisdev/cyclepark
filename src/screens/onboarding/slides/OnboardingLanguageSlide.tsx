import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';
import type { LocalePreference } from '../../../stores/settingsStore';
import { useOnboardingStore } from '../../../stores/onboardingStore';
import { useSettingsStore } from '../../../stores/settingsStore';
import { useOnboardingGoToNext } from '../onboardingCarouselContext';
import { onboardingStyles } from '../onboardingStyles';
import { OnboardingPrimaryButton } from '../OnboardingPrimaryButton';
import { OnboardingSlideShell } from '../OnboardingSlideShell';

const OPTIONS: LocalePreference[] = ['system', 'es', 'en', 'ca', 'eu'];

export function OnboardingLanguageSlide() {
  const { t } = useTranslation();
  const goToNext = useOnboardingGoToNext();
  const selected = useOnboardingStore((s) => s.localeChoice);
  const setLocaleChoice = useOnboardingStore((s) => s.setLocaleChoice);
  const setLocaleMode = useSettingsStore((s) => s.setLocaleMode);

  const labelFor = (value: LocalePreference) =>
    value === 'system'
      ? t('screens.settings.language.system')
      : t(`screens.settings.language.${value}` as 'screens.settings.language.es');

  const pick = (value: LocalePreference) => {
    setLocaleChoice(value);
    setLocaleMode(value);
  };

  return (
    <OnboardingSlideShell
      footer={
        <OnboardingPrimaryButton label={t('screens.onboarding.language.continue')} onPress={goToNext} />
      }
    >
      <Text style={onboardingStyles.stepTitle}>{t('screens.onboarding.language.title')}</Text>
      <Text style={onboardingStyles.body}>{t('screens.onboarding.language.body')}</Text>
      {OPTIONS.map((value) => {
        const isOn = selected === value;
        return (
          <Pressable
            key={value}
            onPress={() => pick(value)}
            style={({ pressed }) => [
              onboardingStyles.optionRow,
              isOn && onboardingStyles.optionRowSelected,
              pressed && { opacity: 0.9 },
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isOn }}
          >
            <Text style={[onboardingStyles.optionLabel, isOn && onboardingStyles.optionLabelOnPrimary]}>
              {labelFor(value)}
            </Text>
            {isOn ? <Check size={22} color="#FFFFFF" strokeWidth={2.5} /> : null}
          </Pressable>
        );
      })}
    </OnboardingSlideShell>
  );
}
