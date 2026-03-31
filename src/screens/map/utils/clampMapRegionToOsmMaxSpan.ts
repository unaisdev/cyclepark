import type { Region } from 'react-native-maps';
import { OSM_MAP_MAX_BBOX_SPAN_DEGREES } from '../../../api/openstreetmap';

export function mapRegionExceedsOsmApiMaxSpan(region: Region): boolean {
  return (
    region.latitudeDelta > OSM_MAP_MAX_BBOX_SPAN_DEGREES ||
    region.longitudeDelta > OSM_MAP_MAX_BBOX_SPAN_DEGREES
  );
}

export function clampMapRegionToOsmMaxSpan(region: Region): Region {
  return {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: Math.min(region.latitudeDelta, OSM_MAP_MAX_BBOX_SPAN_DEGREES),
    longitudeDelta: Math.min(region.longitudeDelta, OSM_MAP_MAX_BBOX_SPAN_DEGREES),
  };
}
