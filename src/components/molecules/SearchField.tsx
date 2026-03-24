import type { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Search } from "lucide-react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { AppTextInput, type AppTextInputProps } from "../atoms/AppTextInput";
import { mapHomeChrome } from "../../screens/map/mapHomeTheme";

const ICON = 22;
/** Ancho reservado para el glifo + alineación. */
const ICON_SLOT_W = 28;
const HIDE_MS = 220;

const styles = StyleSheet.create((theme) => ({
  shell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingHorizontal: theme.layout.space4,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    ...mapHomeChrome.ambientShadow,
  },
  leadingCustom: {
    marginRight: theme.layout.space3,
  },
}));

export type SearchFieldProps = Omit<AppTextInputProps, "style"> & {
  leading?: ReactNode;
  style?: StyleProp<ViewStyle>;
  inputStyle?: AppTextInputProps["style"];
};

export function SearchField({
  leading,
  style,
  inputStyle,
  onFocus,
  onBlur,
  ...inputProps
}: SearchFieldProps) {
  const { theme } = useUnistyles();
  const ink = theme.app.textPrimary;
  const gap = theme.layout.space3;

  const focusProgress = useSharedValue(0);

  const iconSlotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(focusProgress.value, [0, 1], [1, 0]),
    width: interpolate(focusProgress.value, [0, 1], [ICON_SLOT_W, 0]),
    marginRight: interpolate(focusProgress.value, [0, 1], [gap, 0]),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  }));

  return (
    <View style={[styles.shell, style]}>
      {leading != null ? (
        <View style={styles.leadingCustom}>{leading}</View>
      ) : (
        <Animated.View style={iconSlotStyle}>
          <Search size={ICON} color={ink} strokeWidth={2} />
        </Animated.View>
      )}
      <AppTextInput
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        style={inputStyle}
        onFocus={(e) => {
          focusProgress.value = withTiming(1, { duration: HIDE_MS });
          onFocus?.(e);
        }}
        onBlur={(e) => {
          focusProgress.value = withTiming(0, { duration: HIDE_MS });
          onBlur?.(e);
        }}
        {...inputProps}
      />
    </View>
  );
}
