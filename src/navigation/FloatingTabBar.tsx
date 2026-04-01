import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabActions } from "@react-navigation/routers";
import type { LucideIcon } from "lucide-react-native";
import { Heart, Map, Settings } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { FloatingTabPill } from "./FloatingTabPill";
import type { RootTabParamList } from "./types";

const TAB_ICON_SIZE = 20;
const LABEL_REVEAL_MS = 260;
const LABEL_REVEAL_EASING = Easing.out(Easing.cubic);
/** `theme.layout.space2` — evita capturar theme en worklets. */
const LABEL_ICON_GAP = 8;
/** Ancho máximo reservado al texto del tab activo (una línea). */
const LABEL_MAX_W = 200;

const tabIcon: Record<keyof RootTabParamList, LucideIcon> = {
  Map: Map,
  List: Heart,
  Settings: Settings,
};

/** Altura aproximada (barra + márgenes) para padding en pantallas con contenido scrollable. */
export const FLOATING_TAB_BAR_OFFSET = 88;

/** Debe coincidir con `styles.bar.maxWidth` (ancho útil del carril de tabs). */
const TAB_BAR_MAX_WIDTH = 420;

const tabLabelKey: Record<
  keyof RootTabParamList,
  "tabs.map" | "tabs.favorites" | "tabs.settings"
> = {
  Map: "tabs.map",
  List: "tabs.favorites",
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
    /**
     * Por encima del cromado del mapa (p. ej. elevation ~36) para que la barra
     * reciba toques y la píldora no quede “detrás” del mapa en Android.
     */
    ...(Platform.OS === "android"
      ? { elevation: 52, zIndex: 100 }
      : null),
  },
  bar: {
    width: "100%",
    maxWidth: TAB_BAR_MAX_WIDTH,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    paddingVertical: theme.layout.space1,
    paddingHorizontal: theme.layout.space1,
    shadowColor: theme.app.textPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    minHeight: 44,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.layout.space1,
    zIndex: 1,
  },
  labelClip: {
    overflow: "hidden",
  },
  label: {
    ...theme.typography.label,
    color: theme.app.primary,
  },
}));

type TabBarItemProps = {
  focused: boolean;
  label: string;
  Icon: LucideIcon;
  primaryColor: string;
  secondaryColor: string;
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
};

function FloatingTabBarItem({
  focused,
  label,
  Icon,
  primaryColor,
  secondaryColor,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: TabBarItemProps) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, {
      duration: LABEL_REVEAL_MS,
      easing: LABEL_REVEAL_EASING,
      reduceMotion: ReduceMotion.System,
    });
  }, [focused, progress]);

  const labelAnimStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    maxWidth: interpolate(progress.value, [0, 1], [0, LABEL_MAX_W]),
    marginLeft: interpolate(progress.value, [0, 1], [0, LABEL_ICON_GAP]),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [-6, 0]) },
    ],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
    >
      <Icon
        size={TAB_ICON_SIZE}
        color={focused ? primaryColor : secondaryColor}
        strokeWidth={focused ? 2.25 : 2}
      />
      <Animated.View style={[styles.labelClip, labelAnimStyle]}>
        <Text numberOfLines={1} style={styles.label}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const routes = state?.routes ?? [];
  const currentIndex = state?.index ?? 0;
  const tabCount = routes.length;

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
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const Icon = tabIcon[routeName];

            return (
              <FloatingTabBarItem
                key={route.key}
                focused={isFocused}
                label={label}
                Icon={Icon}
                primaryColor={theme.app.primary}
                secondaryColor={theme.app.textSecondary}
                onPress={onPress}
                onLongPress={onLongPress}
                accessibilityLabel={
                  options.tabBarAccessibilityLabel ?? label
                }
                testID={options.tabBarButtonTestID}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
