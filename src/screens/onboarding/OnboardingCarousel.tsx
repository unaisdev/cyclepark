import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { onboardingStyles } from './onboardingStyles';
import { OnboardingCarouselNavProvider } from './onboardingCarouselContext';
import { OnboardingHeader } from './OnboardingHeader';
import { ONBOARDING_SLIDES } from './onboardingData';
import { OnboardingLanguageSlide } from './slides/OnboardingLanguageSlide';
import { OnboardingLegalSlide } from './slides/OnboardingLegalSlide';
import { OnboardingLocationSlide } from './slides/OnboardingLocationSlide';
import { OnboardingNotificationsSlide } from './slides/OnboardingNotificationsSlide';
import { OnboardingWelcomeSlide } from './slides/OnboardingWelcomeSlide';

const overlayStyles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});

export function OnboardingFlow() {
  const { width, height } = useWindowDimensions();
  const carouselRef = useRef<ICarouselInstance>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useSharedValue(0);

  const goToNext = useCallback(() => {
    carouselRef.current?.next({ animated: true });
  }, []);

  const goToPrev = useCallback(() => {
    carouselRef.current?.prev({ animated: true });
  }, []);

  const renderItem = useCallback(({ index }: { index: number }) => {
    switch (index) {
      case 0:
        return <OnboardingWelcomeSlide />;
      case 1:
        return <OnboardingLanguageSlide />;
      case 2:
        return <OnboardingLocationSlide />;
      case 3:
        return <OnboardingNotificationsSlide />;
      case 4:
        return <OnboardingLegalSlide />;
      default:
        return <View />;
    }
  }, []);

  return (
    <OnboardingCarouselNavProvider value={{ goToNext }}>
      <View style={[onboardingStyles.root, { width, height }]}>
        <Carousel
          ref={carouselRef}
          loop={false}
          autoFillData={false}
          width={width}
          height={height}
          data={ONBOARDING_SLIDES}
          defaultIndex={0}
          scrollAnimationDuration={380}
          onProgressChange={progress}
          onSnapToItem={setActiveIndex}
          renderItem={renderItem}
        />
        <View style={overlayStyles.fill} pointerEvents="box-none">
          <OnboardingHeader
            progress={progress}
            slides={ONBOARDING_SLIDES}
            activeIndex={activeIndex}
            onBack={goToPrev}
          />
        </View>
      </View>
    </OnboardingCarouselNavProvider>
  );
}
