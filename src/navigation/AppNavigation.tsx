import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme as NavigationTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { Platform } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { useSettingsStore } from "../stores/settingsStore";
import { RootStack } from "./RootStack";

export function AppNavigation() {
  const appearance = useSettingsStore((s) => s.appearance);
  const { theme, rt } = useUnistyles();
  const isDark = rt.themeName === "dark";
  const navigationTheme = useMemo((): NavigationTheme => {
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.app.primary,
        background: theme.app.background,
        card: theme.app.surface,
        text: theme.app.textPrimary,
        border: theme.app.borderSubtle,
      },
    };
  }, [appearance, isDark, theme]);
  return (
    <NavigationContainer theme={navigationTheme}>
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
