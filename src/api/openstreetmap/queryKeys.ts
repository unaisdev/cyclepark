import type { OpenStreetMapServer } from './endpoints';
import type { OsmMapBoundingBox } from './types';

function bboxTuple(bbox: OsmMapBoundingBox) {
  return [
    bbox.minLon,
    bbox.minLat,
    bbox.maxLon,
    bbox.maxLat,
  ] as const;
}

export const osmQueryKeys = {
  root: ['openstreetmap'] as const,
  bicycleParking: {
    all: () => [...osmQueryKeys.root, 'bicycleParking'] as const,
    byBBox: (bbox: OsmMapBoundingBox, server: OpenStreetMapServer = 'production') =>
      [...osmQueryKeys.bicycleParking.all(), 'bbox', server, ...bboxTuple(bbox)] as const,
  },
} as const;
