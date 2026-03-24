import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { DeviceLocaleSync } from './i18n/DeviceLocaleSync';
import { AppNavigation } from './navigation/AppNavigation';
import { UserPreferencesProvider } from './preferences/UserPreferencesContext';

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
  },
}));

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <UserPreferencesProvider>
        <DeviceLocaleSync />
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <AppNavigation />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </UserPreferencesProvider>
    </GestureHandlerRootView>
  );
}
