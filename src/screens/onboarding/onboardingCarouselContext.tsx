import { createContext, useContext, type ReactNode } from 'react';

type OnboardingCarouselNav = {
  goToNext: () => void;
};

const OnboardingCarouselNavContext = createContext<OnboardingCarouselNav | null>(null);

export function OnboardingCarouselNavProvider({
  value,
  children,
}: {
  value: OnboardingCarouselNav;
  children: ReactNode;
}) {
  return (
    <OnboardingCarouselNavContext.Provider value={value}>{children}</OnboardingCarouselNavContext.Provider>
  );
}

export function useOnboardingGoToNext() {
  const ctx = useContext(OnboardingCarouselNavContext);
  if (!ctx) {
    throw new Error('useOnboardingGoToNext must be used within OnboardingCarouselNavProvider');
  }
  return ctx.goToNext;
}
