import { useLayoutEffect } from 'react';
import Animated, {
  cancelAnimation,
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

/**
 * Un solo `translateX` animado (no `activeIndex * segmentWidth` en el worklet):
 * en Reanimated, dos shared values que se actualizan por efectos distintos pueden
 * desincronizarse un frame y dejar la píldora en translateX 0 (= primera tab).
 */
export function FloatingTabPill({ pillWidth, tabIndex }: FloatingTabPillProps) {
  const segment = Math.max(pillWidth, 0);
  const translateX = useSharedValue(tabIndex * segment);

  useLayoutEffect(() => {
    const target = tabIndex * segment;
    cancelAnimation(translateX);
    translateX.value = withTiming(target, {
      duration: PILL_MS,
      easing: PILL_EASING,
      reduceMotion: ReduceMotion.System,
    });
  }, [segment, tabIndex, translateX]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.pill, segment > 0 && { width: segment }, pillStyle]} />
  );
}
