import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { SlideInLeft, SlideOutLeft, type SharedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { OnboardingAnimatedPagination } from './OnboardingAnimatedPagination';
import { OnboardingBackButton } from './OnboardingBackButton';
import type { OnboardingSlideItem } from './onboardingData';

const headerStyles = StyleSheet.create((theme) => ({
  wrap: {
    paddingHorizontal: theme.layout.space4,
    paddingBottom: theme.layout.space3,
  },
  header: {
    minHeight: 56,
    justifyContent: 'center',
  },
  progressLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backSlot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backPlaceholder: {
    width: 48,
    height: 48,
  },
}));

const backEntering = SlideInLeft.springify().damping(19).stiffness(220).mass(0.7);
const backExiting = SlideOutLeft.springify().damping(22).stiffness(280).mass(0.75);

type Props = {
  progress: SharedValue<number>;
  slides: OnboardingSlideItem[];
  activeIndex: number;
  onBack: () => void;
};

export function OnboardingHeader({ progress, slides, activeIndex, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const showBack = activeIndex > 0;

  return (
    <View style={[headerStyles.wrap, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
      <View style={headerStyles.header}>
        <View style={headerStyles.progressLayer} pointerEvents="none">
          <OnboardingAnimatedPagination progress={progress} data={slides} />
        </View>
        <View style={headerStyles.backSlot}>
          {showBack ? (
            <Animated.View entering={backEntering} exiting={backExiting}>
              <OnboardingBackButton onPress={onBack} />
            </Animated.View>
          ) : (
            <View style={headerStyles.backPlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
}
