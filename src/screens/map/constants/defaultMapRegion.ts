import type { Region } from 'react-native-maps';

/** Vista inicial: centro peninsular (España). Ajusta cuando tengas geolocalización. */
export const DEFAULT_MAP_REGION: Region = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: 0.28,
  longitudeDelta: 0.28,
};
