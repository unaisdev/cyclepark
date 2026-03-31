import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import type { OnboardingSlideItem } from "./onboardingData";

/** Altura del indicador; en reposo width = height (círculo). */
const DOT_H = 4;
const W_IDLE = 4;
const W_ACTIVE = 28;

const rowStyles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
}));

function PaginationDot({
  index,
  progress,
  colorMuted,
  colorPrimary,
}: {
  index: number;
  progress: SharedValue<number>;
  colorMuted: string;
  colorPrimary: string;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const w = interpolate(
      p,
      [index - 1, index, index + 1],
      [W_IDLE, W_ACTIVE, W_IDLE],
      Extrapolation.CLAMP,
    );
    const bg = interpolateColor(
      p,
      [index - 1, index, index + 1],
      [colorMuted, colorPrimary, colorMuted],
    );
    return {
      width: w,
      height: DOT_H,
      borderRadius: DOT_H / 2,
      backgroundColor: bg,
    };
  }, [index, colorMuted, colorPrimary]);

  return <Animated.View style={animatedStyle} />;
}

type Props = {
  progress: SharedValue<number>;
  data: OnboardingSlideItem[];
};

/** Paginación ligada al `progress` del carrusel (Reanimated): círculos más grandes y pill al enfocar. */
export function OnboardingAnimatedPagination({ progress, data }: Props) {
  const { theme } = useUnistyles();
  const colorMuted = theme.app.borderSubtle;
  const colorPrimary = theme.app.primary;

  return (
    <View style={rowStyles.row} pointerEvents="none">
      {data.map((item, index) => (
        <PaginationDot
          key={item.id}
          index={index}
          progress={progress}
          colorMuted={colorMuted}
          colorPrimary={colorPrimary}
        />
      ))}
    </View>
  );
}
