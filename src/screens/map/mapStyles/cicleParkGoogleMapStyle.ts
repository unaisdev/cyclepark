import type { MapStyleElement } from 'react-native-maps';

/**
 * Estilo Google Maps: menos ruido comercial y transporte; prioriza calles y topónimos.
 * No existe un “modo bicicleta” en la API de estilos; los aparcamientos van en nuestra capa OSM.
 */
export const CICLEPARK_GOOGLE_MAP_STYLE: MapStyleElement[] = [
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.medical', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.school', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.government', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.place_of_worship', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.attraction', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];
