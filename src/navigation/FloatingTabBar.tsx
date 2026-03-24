import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { FloatingTabPill } from "./FloatingTabPill";
import type { RootTabParamList } from "./types";

/** Altura aproximada (barra + márgenes) para padding en pantallas con contenido scrollable. */
export const FLOATING_TAB_BAR_OFFSET = 88;

/** Debe coincidir con `styles.bar.maxWidth` (ancho útil del carril de tabs). */
const TAB_BAR_MAX_WIDTH = 420;

const tabLabelKey: Record<
  keyof RootTabParamList,
  "tabs.map" | "tabs.list" | "tabs.settings"
> = {
  Map: "tabs.map",
  List: "tabs.list",
  Settings: "tabs.settings",
};

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: theme.layout.space4,
    alignItems: "center",
  },
  bar: {
    width: "100%",
    maxWidth: TAB_BAR_MAX_WIDTH,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space1,
    shadowColor: theme.app.textPrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  row: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    minHeight: 44,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.layout.space2,
    zIndex: 1,
  },
  label: {
    ...theme.typography.label,
  },
  labelFocused: {
    color: theme.app.primary,
  },
  labelIdle: {
    color: theme.app.textSecondary,
  },
}));

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const routes = state?.routes ?? [];
  const currentIndex = state?.index ?? 0;
  const tabCount = routes.length;

  console.log("render floating tab bar");

  const [windowSize, setWindowSize] = useState(() => Dimensions.get("window"));
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setWindowSize(window);
    });
    return () => sub.remove();
  }, []);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();

  const pillWidth = useMemo(() => {
    if (tabCount <= 0) return 0;
    const windowWidth = windowSize.width;
    const gutter = theme.layout.space4 * 2;
    const barHorizontalPadding = theme.layout.space1 * 2;
    const barWidth = Math.min(windowWidth - gutter, TAB_BAR_MAX_WIDTH);
    const rowInner = barWidth - barHorizontalPadding;
    return rowInner / tabCount;
  }, [windowSize.width, theme.layout.space4, theme.layout.space1, tabCount]);

  if (routes.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom:
            Math.max(insets.bottom, theme.layout.space2) + theme.layout.space2,
        },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.bar}>
        <View style={styles.row}>
          <FloatingTabPill pillWidth={pillWidth} tabIndex={currentIndex} />
          {routes.map((route, index) => {
            const descriptor = descriptors[route.key];
            if (!descriptor) return null;
            const { options } = descriptor;
            const routeName = route.name as keyof RootTabParamList;
            const label = options.title ?? t(tabLabelKey[routeName]);
            const isFocused = currentIndex === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tab}
              >
                <Text
                  style={[
                    styles.label,
                    isFocused ? styles.labelFocused : styles.labelIdle,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
