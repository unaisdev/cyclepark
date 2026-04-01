import { Canvas, Fill, LinearGradient, vec } from '@shopify/react-native-skia';
import { memo, useMemo } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  if (h.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const styles = StyleSheet.create(() => ({
  slot: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    /**
     * En Android el `MapView` (TextureView) suele dibujarse encima de hermanos aunque
     * tengan `zIndex`; `elevation` fuerza que el degradado quede visible sobre el mapa.
     */
    ...(Platform.OS === 'android' ? { elevation: 20 } : null),
  },
}));

export type MapHomeTopSkiaGradientProps = {
  /** Alto del degradado (desde el borde superior hasta ~debajo del buscador). */
  height: number;
};

/**
 * Degradado vertical con Skia sobre el mapa: refuerza contraste del cromado superior
 * (overline + buscador) sin bloquear gestos (`pointerEvents="none"`).
 */
function MapHomeTopSkiaGradientInner({ height }: MapHomeTopSkiaGradientProps) {
  const { width } = useWindowDimensions();
  const { theme } = useUnistyles();
  const bg = theme.app.background;

  const { colors, positions } = useMemo(() => {
    return {
      colors: [
        hexToRgba(bg, 0.97),
        hexToRgba(bg, 0.65),
        hexToRgba(bg, 0.22),
        hexToRgba(bg, 0),
      ],
      positions: [0, 0.35, 0.68, 1],
    };
  }, [bg]);

  if (Platform.OS === 'web' || height <= 0) {
    return null;
  }

  return (
    <View
      style={[styles.slot, { height }]}
      pointerEvents="none"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      collapsable={Platform.OS === 'android' ? false : undefined}
    >
      {/* opaque={false}: evita SurfaceView opaco en Android que tapa el MapView debajo. */}
      <Canvas
        style={{ width, height }}
        pointerEvents="none"
        accessible={false}
        opaque={false}
      >
        <Fill>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, height)}
            colors={colors}
            positions={positions}
          />
        </Fill>
      </Canvas>
    </View>
  );
}

export const MapHomeTopSkiaGradient = memo(MapHomeTopSkiaGradientInner);
