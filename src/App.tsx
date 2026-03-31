import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { queryClient } from './api/queryClient';
import { DeviceLocaleSync } from './i18n/DeviceLocaleSync';
import { AppNavigation } from './navigation/AppNavigation';
import { BillingBootstrap } from './stores/BillingBootstrap';
import { SettingsBootstrap } from './stores/SettingsBootstrap';

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
  },
}));

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SettingsBootstrap />
      <BillingBootstrap />
      <DeviceLocaleSync />
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <AppNavigation />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
