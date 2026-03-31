import { ChevronLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';
import { IconButton } from '../../components/atoms/IconButton';

type Props = {
  onPress: () => void;
};

export function OnboardingBackButton({ onPress }: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <IconButton accessibilityLabel={t('screens.onboarding.legal.backA11y')} onPress={onPress}>
      <ChevronLeft size={26} color={theme.app.textPrimary} strokeWidth={2} />
    </IconButton>
  );
}
