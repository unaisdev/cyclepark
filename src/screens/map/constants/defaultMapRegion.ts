import type { Region } from 'react-native-maps';

import { OSM_MAP_MAX_BBOX_SPAN_DEGREES } from '../../../api/openstreetmap';

/** Vista inicial: centro peninsular (España). Δ máximo = límite API OSM `map` (bbox). */
export const DEFAULT_MAP_REGION: Region = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: OSM_MAP_MAX_BBOX_SPAN_DEGREES,
  longitudeDelta: OSM_MAP_MAX_BBOX_SPAN_DEGREES,
};
