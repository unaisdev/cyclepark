import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { UnistylesRuntime, useUnistyles } from "react-native-unistyles";
import { RootStack } from "./RootStack";

export function AppNavigation() {
  const { theme } = useUnistyles();
  const isDark = UnistylesRuntime.themeName === "dark";
  return (
    <NavigationContainer>
      <RootStack />
      <StatusBar
        style={isDark ? "light" : "dark"}
        {...(Platform.OS === "android"
          ? { backgroundColor: theme.app.background }
          : {})}
      />
    </NavigationContainer>
  );
}
