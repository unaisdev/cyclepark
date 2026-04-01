import type { ReactNode } from 'react';
import { forwardRef, memo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  type MapType,
  type MapViewProps,
  type Region,
} from 'react-native-maps';
import { DEFAULT_MAP_REGION } from '../constants/defaultMapRegion';
import { CICLEPARK_GOOGLE_MAP_STYLE } from '../mapStyles/cicleParkGoogleMapStyle';

const styles = StyleSheet.create({
  /** `flex: 1` evita mapas en blanco en Android (Fabric) frente a solo `absoluteFill` sin contenedor medido. */
  slot: {
    flex: 1,
    alignSelf: 'stretch',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8E4DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  webFallbackText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});

export type MapViewCanvasProps = {
  /** Hueco para UI superpuesta (barra de búsqueda, tabs). */
  mapPadding?: MapViewProps['mapPadding'];
  /** Google Maps: `standard`, `satellite`, `hybrid`, `terrain`. */
  mapType?: MapType;
  isDark?: boolean;
  /** Punto azul de “mi ubicación” en el mapa (tras conceder permiso). */
  showsUserLocation?: boolean;
  /**
   * BCP-47 del sistema (p. ej. `es-ES`). Al cambiar, se recrea el mapa nativo para que
   * las etiquetas de Google Maps sigan el idioma del dispositivo.
   */
  systemLocaleKey?: string;
  /** Marcadores u otras capas hijas del `MapView`. */
  children?: ReactNode;
  onRegionChangeComplete?: (
    region: Region,
    details: { isGesture?: boolean },
  ) => void;
  /** Inicio de cambio de región (p. ej. arrastre); `nativeEvent.isGesture` en Google Maps. */
  onRegionChangeStart?: MapViewProps['onRegionChangeStart'];
  onMapReady?: MapViewProps['onMapReady'];
};

/**
 * Mapa nativo vía [react-native-maps](https://docs.expo.dev/versions/latest/sdk/map-view/).
 * Google Maps: Android manifest (`google_maps_api_key` vía Gradle + `.env.local`); iOS / prebuild: `app.json`.
 */
const MapViewCanvasInner = forwardRef<MapView, MapViewCanvasProps>(function MapViewCanvasInner(
  {
    mapPadding,
    mapType = 'standard',
    isDark,
    showsUserLocation = false,
    systemLocaleKey = 'system',
    children,
    onRegionChangeComplete,
    onRegionChangeStart,
    onMapReady,
  },
  ref,
) {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webFallback} pointerEvents="none">
        <Text style={styles.webFallbackText}>
          El mapa nativo no está disponible en web. Usa iOS o Android (dev build).
        </Text>
      </View>
    );
  }

  return (
    <View
      style={styles.slot}
      collapsable={Platform.OS === 'android' ? false : undefined}
    >
      <MapView
        key={systemLocaleKey}
        ref={ref}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={DEFAULT_MAP_REGION}
        mapType={mapType}
        customMapStyle={CICLEPARK_GOOGLE_MAP_STYLE}
        mapPadding={mapPadding}
        rotateEnabled
        pitchEnabled={false}
        showsBuildings={false}
        showsIndoors={false}
        showsTraffic={false}
        showsCompass={false}
        showsMyLocationButton={false}
        showsUserLocation={showsUserLocation}
        toolbarEnabled={false}
        poiClickEnabled={false}
        userInterfaceStyle={Platform.OS === 'ios' ? (isDark ? 'dark' : 'light') : undefined}
        onRegionChangeComplete={onRegionChangeComplete}
        onRegionChangeStart={onRegionChangeStart}
        onMapReady={onMapReady}
      >
        {children}
      </MapView>
    </View>
  );
});

/** Evita re-renders del mapa nativo cuando solo cambia texto de búsqueda u otra UI superpuesta. */
export const MapViewCanvas = memo(MapViewCanvasInner);
