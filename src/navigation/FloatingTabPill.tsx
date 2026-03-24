import { memo, useEffect } from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const PILL_MS = 200;
const PILL_EASING = Easing.out(Easing.cubic);

const styles = StyleSheet.create((theme) => ({
  pill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: theme.layout.radiusMd,
    backgroundColor: theme.app.surfaceMuted,
  },
}));

export type FloatingTabPillProps = {
  /** Ancho de un segmento (fila / número de tabs), desde `onLayout`. */
  pillWidth: number;
  /** Índice activo de React Navigation. */
  tabIndex: number;
};

function FloatingTabPillInner({ pillWidth, tabIndex }: FloatingTabPillProps) {
  const segmentWidth = useSharedValue(0);
  const activeIndex = useSharedValue(tabIndex);

  console.log("render floating tab pill");

  useEffect(() => {
    segmentWidth.value = pillWidth;
  }, [pillWidth, segmentWidth]);

  useEffect(() => {
    activeIndex.value = withTiming(tabIndex, {
      duration: PILL_MS,
      easing: PILL_EASING,
      reduceMotion: ReduceMotion.System,
    });
  }, [tabIndex, activeIndex]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: activeIndex.value * segmentWidth.value }],
  }));

  return (
    <Animated.View style={[styles.pill, pillWidth > 0 && { width: pillWidth }, pillStyle]} />
  );
}

export const FloatingTabPill = memo(FloatingTabPillInner);
