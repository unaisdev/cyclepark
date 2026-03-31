import { Image, Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

/** Tamaño fijo en pantalla (la prop `image` del Marker usa píxeles del archivo y suele verse cuadrado / enorme). */
const PIN_DIAMETER = 68;

const MARKER_ASSET = require('../../../../assets/bicycle-parking-marker-map.png');

const styles = StyleSheet.create((theme) => ({
  clip: {
    width: PIN_DIAMETER,
    height: PIN_DIAMETER,
    borderRadius: PIN_DIAMETER / 2,
    overflow: 'hidden',
    backgroundColor: theme.app.surface,
    borderWidth: 2,
    borderColor: theme.map.pinStroke,
  },
  image: {
    width: PIN_DIAMETER,
    height: PIN_DIAMETER,
  },
}));

/**
 * Vista circular para `Marker`: recorta el PNG con `borderRadius` + `overflow: hidden`.
 * Solo `Image` nativa (sin SVG) para que el rasterizado de Google Maps sea estable.
 */
export function BicycleParkingMapMarkerView() {
  return (
    <View style={styles.clip} collapsable={Platform.OS === 'android' ? false : undefined}>
      <Image
        source={MARKER_ASSET}
        style={styles.image}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}
