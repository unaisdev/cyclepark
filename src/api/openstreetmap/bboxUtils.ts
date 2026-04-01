import type { Region } from 'react-native-maps';
import {
  OSM_MAP_MAX_BBOX_SPAN_DEGREES,
  OSM_MAP_QUERY_MAX_VISIBLE_REGION_DELTA_DEGREES,
} from './endpoints';
import type { OsmMapBoundingBox } from './types';

export function isValidOsmMapBoundingBox(bbox: OsmMapBoundingBox): boolean {
  const { minLon, minLat, maxLon, maxLat } = bbox;
  if (![minLon, minLat, maxLon, maxLat].every((n) => Number.isFinite(n))) return false;
  if (minLon >= maxLon || minLat >= maxLat) return false;
  if (minLat < -90 || maxLat > 90 || minLon < -180 || maxLon > 180) return false;
  const dLon = maxLon - minLon;
  const dLat = maxLat - minLat;
  if (dLon > OSM_MAP_MAX_BBOX_SPAN_DEGREES || dLat > OSM_MAP_MAX_BBOX_SPAN_DEGREES) {
    return false;
  }
  return true;
}

/** Útil para derivar un bbox a partir de una región de react-native-maps. */
export function boundingBoxFromLatLngBounds(params: {
  northEast: { latitude: number; longitude: number };
  southWest: { latitude: number; longitude: number };
}): OsmMapBoundingBox {
  const { northEast, southWest } = params;
  return {
    minLon: southWest.longitude,
    minLat: southWest.latitude,
    maxLon: northEast.longitude,
    maxLat: northEast.latitude,
  };
}

/** Convierte el `Region` de react-native-maps al orden `minLon,minLat,maxLon,maxLat` de la API OSM. */
export function osmBoundingBoxFromMapRegion(region: Region): OsmMapBoundingBox {
  const halfLat = region.latitudeDelta / 2;
  const halfLon = region.longitudeDelta / 2;
  return {
    minLat: region.latitude - halfLat,
    maxLat: region.latitude + halfLat,
    minLon: region.longitude - halfLon,
    maxLon: region.longitude + halfLon,
  };
}

/** Vista suficientemente cercana para pedir aparcabicis a la API OSM sin disparar descargas con vista demasiado amplia. */
export function isRegionZoomedInEnoughForOsmQuery(region: Region): boolean {
  return (
    region.latitudeDelta <= OSM_MAP_QUERY_MAX_VISIBLE_REGION_DELTA_DEGREES &&
    region.longitudeDelta <= OSM_MAP_QUERY_MAX_VISIBLE_REGION_DELTA_DEGREES
  );
}

/**
 * Bbox válido para `GET /api/0.6/map`: si la vista es más ancha que el máximo OSM,
 * usa un recuadro de 0,25° centrado en el mapa (misma política que la API).
 */
export function osmQueryBBoxFromVisibleRegion(region: Region): OsmMapBoundingBox | null {
  const full = osmBoundingBoxFromMapRegion(region);
  if (isValidOsmMapBoundingBox(full)) return full;

  const half = OSM_MAP_MAX_BBOX_SPAN_DEGREES / 2;
  let minLat = region.latitude - half;
  let maxLat = region.latitude + half;
  let minLon = region.longitude - half;
  let maxLon = region.longitude + half;
  minLat = Math.max(-90, minLat);
  maxLat = Math.min(90, maxLat);
  minLon = Math.max(-180, minLon);
  maxLon = Math.min(180, maxLon);
  if (minLon >= maxLon || minLat >= maxLat) return null;
  return { minLat, maxLat, minLon, maxLon };
}

export function regionFromMapBoundaries(b: {
  northEast: { latitude: number; longitude: number };
  southWest: { latitude: number; longitude: number };
}): Region {
  const latD = Math.abs(b.northEast.latitude - b.southWest.latitude);
  const lonD = Math.abs(b.northEast.longitude - b.southWest.longitude);
  return {
    latitude: (b.northEast.latitude + b.southWest.latitude) / 2,
    longitude: (b.northEast.longitude + b.southWest.longitude) / 2,
    latitudeDelta: Math.max(latD, 1e-6),
    longitudeDelta: Math.max(lonD, 1e-6),
  };
}
