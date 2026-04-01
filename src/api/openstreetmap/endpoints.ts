/**
 * URLs alineadas con la especificación OpenAPI de la API de edición 0.6 de OSM.
 * @see https://github.com/wtimme/openstreetmap-openapi
 * @see https://wiki.openstreetmap.org/wiki/API_v0.6
 */

export const OSM_API_PRODUCTION_ORIGIN = 'https://api.openstreetmap.org';

export const OSM_API_SANDBOX_ORIGIN = 'https://master.apis.dev.openstreetmap.org';

/** Ruta documentada como `GET /api/0.6/map` (datos en el bbox). */
export const OSM_API_MAP_PATH = '/api/0.6/map';

/** Límite documentado en la wiki de la API 0.6 para el tamaño del bbox. */
export const OSM_MAP_MAX_BBOX_SPAN_DEGREES = 0.25;

/**
 * Zoom mínimo para disparar `GET /api/0.6/map`: si la vista es más ancha que esto
 * (`latitudeDelta` / `longitudeDelta`), no se hace la petición (menos carga y menos riesgo de respuestas enormes).
 * Debe ser ≤ {@link OSM_MAP_MAX_BBOX_SPAN_DEGREES} (la región inicial del mapa usa ese máximo).
 */
export const OSM_MAP_QUERY_MAX_VISIBLE_REGION_DELTA_DEGREES = 0.12;

export type OpenStreetMapServer = 'production' | 'sandbox';

export function getOpenStreetMapOrigin(server: OpenStreetMapServer): string {
  return server === 'sandbox' ? OSM_API_SANDBOX_ORIGIN : OSM_API_PRODUCTION_ORIGIN;
}

/**
 * Cadena `bbox` de la API: `left,bottom,right,top` = `minLon,minLat,maxLon,maxLat`.
 */
export function formatMapBoundingBoxQuery(params: {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
}): string {
  const { minLon, minLat, maxLon, maxLat } = params;
  return `${minLon},${minLat},${maxLon},${maxLat}`;
}

export function buildMapByBoundingBoxUrl(
  params: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  },
  options?: { server?: OpenStreetMapServer },
): string {
  const origin = getOpenStreetMapOrigin(options?.server ?? 'production');
  const bbox = formatMapBoundingBoxQuery(params);
  const q = new URLSearchParams({ bbox });
  return `${origin}${OSM_API_MAP_PATH}?${q.toString()}`;
}
