import { Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { LEGAL_DOCUMENTS_VERSION } from '../../../constants/legalVersion';
import { useOnboardingStore } from '../../../stores/onboardingStore';
import { onboardingStyles } from '../onboardingStyles';
import { OnboardingPrimaryButton } from '../OnboardingPrimaryButton';
import { OnboardingSlideShell } from '../OnboardingSlideShell';

function CheckRow({
  checked,
  onToggle,
  label,
  isLast,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  isLast?: boolean;
}) {
  return (
    <Pressable
      onPress={onToggle}
      style={[onboardingStyles.checkRow, isLast && onboardingStyles.checkRowLast]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[onboardingStyles.checkBox, checked && onboardingStyles.checkBoxOn]}>
        {checked ? <Check size={16} color="#FFFFFF" strokeWidth={3} /> : null}
      </View>
      <Text style={onboardingStyles.checkLabel}>{label}</Text>
    </Pressable>
  );
}

export function OnboardingLegalSlide() {
  const { t } = useTranslation();
  const termsAccepted = useOnboardingStore((s) => s.termsAccepted);
  const privacyAccepted = useOnboardingStore((s) => s.privacyAccepted);
  const marketingOptIn = useOnboardingStore((s) => s.marketingOptIn);
  const setTermsAccepted = useOnboardingStore((s) => s.setTermsAccepted);
  const setPrivacyAccepted = useOnboardingStore((s) => s.setPrivacyAccepted);
  const setMarketingOptIn = useOnboardingStore((s) => s.setMarketingOptIn);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);

  const canFinish = termsAccepted && privacyAccepted;

  return (
    <OnboardingSlideShell
      footer={
        <OnboardingPrimaryButton
          label={t('screens.onboarding.legal.finish')}
          onPress={() => {
            if (!canFinish) return;
            completeOnboarding();
          }}
          disabled={!canFinish}
        />
      }
    >
      <Text style={onboardingStyles.stepTitle}>{t('screens.onboarding.legal.title')}</Text>
      <Text style={onboardingStyles.body}>{t('screens.onboarding.legal.body')}</Text>
      <View style={onboardingStyles.legalPanel}>
        <CheckRow
          checked={termsAccepted}
          onToggle={() => setTermsAccepted(!termsAccepted)}
          label={t('screens.onboarding.legal.termsLabel')}
        />
        <CheckRow
          checked={privacyAccepted}
          onToggle={() => setPrivacyAccepted(!privacyAccepted)}
          label={t('screens.onboarding.legal.privacyLabel')}
        />
        <CheckRow
          checked={marketingOptIn}
          onToggle={() => setMarketingOptIn(!marketingOptIn)}
          label={t('screens.onboarding.legal.marketingLabel')}
          isLast
        />
      </View>
      <Text style={onboardingStyles.versionCaption}>
        {t('screens.onboarding.legal.versionHint', { version: LEGAL_DOCUMENTS_VERSION })}
      </Text>
    </OnboardingSlideShell>
  );
}
