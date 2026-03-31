import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import {
  fetchBicycleParkingsInBoundingBox,
  type FetchBicycleParkingsOptions,
} from '../bicycleParkingMapService';
import type { OpenStreetMapServer } from '../endpoints';
import { isValidOsmMapBoundingBox } from '../bboxUtils';
import { osmQueryKeys } from '../queryKeys';
import type { BicycleParkingOsmFeature, OsmMapBoundingBox } from '../types';

export type UseBicycleParkingsInBBoxQueryArgs = {
  bbox: OsmMapBoundingBox | null | undefined;
  server?: OpenStreetMapServer;
  fetchOptions?: Omit<FetchBicycleParkingsOptions, 'signal'>;
};

export function useBicycleParkingsInBBoxQuery(
  args: UseBicycleParkingsInBBoxQueryArgs,
  queryOptions?: Omit<
    UseQueryOptions<BicycleParkingOsmFeature[], Error>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<BicycleParkingOsmFeature[], Error> {
  const server = args.server ?? 'production';
  const bbox = args.bbox ?? null;
  const bboxOk = bbox != null && isValidOsmMapBoundingBox(bbox);

  return useQuery({
    queryKey:
      bboxOk && bbox
        ? osmQueryKeys.bicycleParking.byBBox(bbox, server)
        : [...osmQueryKeys.bicycleParking.all(), 'invalid', server],
    queryFn: ({ signal }) =>
      fetchBicycleParkingsInBoundingBox(bbox!, {
        ...args.fetchOptions,
        server,
        signal,
      }),
    enabled: (queryOptions?.enabled ?? true) && bboxOk,
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
}
