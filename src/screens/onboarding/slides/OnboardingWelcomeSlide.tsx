import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { CicleParkWordmark } from "../../../components/atoms/CicleParkWordmark";
import { useOnboardingGoToNext } from "../onboardingCarouselContext";
import { onboardingStyles } from "../onboardingStyles";
import { OnboardingPrimaryButton } from "../OnboardingPrimaryButton";
import { OnboardingSlideShell } from "../OnboardingSlideShell";

export function OnboardingWelcomeSlide() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const goToNext = useOnboardingGoToNext();

  return (
    <OnboardingSlideShell
      footer={
        <OnboardingPrimaryButton
          label={t("screens.onboarding.welcome.continue")}
          onPress={goToNext}
        />
      }
    >
      <CicleParkWordmark />
      <Text
        style={[
          onboardingStyles.overline,
          { color: theme.app.primary, opacity: 0.75 },
        ]}
      >
        {t("screens.onboarding.welcome.kicker")}
      </Text>
      <Text style={onboardingStyles.welcomeTagline}>
        {t("screens.onboarding.welcome.title")}
      </Text>
      <Text style={onboardingStyles.body}>
        {t("screens.onboarding.welcome.body")}
      </Text>
    </OnboardingSlideShell>
  );
}
