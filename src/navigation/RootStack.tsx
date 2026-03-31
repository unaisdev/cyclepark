import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { OnboardingFlow } from '../screens/onboarding/OnboardingCarousel';
import { PaywallScreen } from '../screens/paywall/PaywallScreen';
import { useOnboardingStore } from '../stores/onboardingStore';
import { RootTabs } from './RootTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  const hasCompletedOnboarding = useOnboardingStore((s) => s.hasCompletedOnboarding);

  return (
    <Stack.Navigator key={hasCompletedOnboarding ? 'app' : 'onboarding'} screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingFlow} />
      ) : (
        <>
          <Stack.Screen name="Main" component={RootTabs} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Paywall" component={PaywallScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
