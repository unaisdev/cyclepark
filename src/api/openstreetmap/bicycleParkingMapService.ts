import {
  buildMapByBoundingBoxUrl,
  type OpenStreetMapServer,
} from './endpoints';
import { parseOsmMapXmlToBicycleParkings } from './osmXmlBicycleParkingParser';
import type { BicycleParkingOsmFeature, OsmMapBoundingBox } from './types';

/** Recomendación de la política de uso de la API de OSM: identificar la aplicación. */
export const DEFAULT_OSM_USER_AGENT = 'CiclePark/1.0 (bike parking map; contact: app support)';

export class OpenStreetMapHttpError extends Error {
  readonly status: number;
  readonly bodySnippet: string;
  /** Cuerpo tal cual (texto plano) para inspeccionar mensajes de la API. */
  readonly body: string;

  constructor(status: number, body: string) {
    const snippet = body.replace(/\s+/g, ' ').slice(0, 280);
    super(`OpenStreetMap API HTTP ${status}: ${snippet}`);
    this.name = 'OpenStreetMapHttpError';
    this.status = status;
    this.bodySnippet = snippet;
    this.body = body;
  }
}

/** HTTP 400 cuando el bbox supera el límite de nodos (p. ej. 50 000) en zonas densas. */
export function isOpenStreetMapTooManyNodesError(error: unknown): boolean {
  if (!(error instanceof OpenStreetMapHttpError)) return false;
  if (error.status !== 400) return false;
  const normalized = error.body.toLowerCase().replace(/\s+/g, ' ');
  return (
    normalized.includes('too many nodes') ||
    (normalized.includes('50000') && normalized.includes('nodes'))
  );
}

export type FetchBicycleParkingsOptions = {
  server?: OpenStreetMapServer;
  /** Sustituye el User-Agent por defecto si tu política de producto lo requiere. */
  userAgent?: string;
  signal?: AbortSignal;
};

/**
 * Descarga el XML del endpoint documentado `GET /api/0.6/map` y devuelve solo aparcabicis
 * (`amenity=bicycle_parking`), sin persistir el resto de elementos OSM.
 *
 * Nota: la API de mapa está pensada para flujos de edición; usa bbox pequeños y respeta
 * https://operations.osmfoundation.org/policies/api/
 */
export async function fetchBicycleParkingsInBoundingBox(
  bbox: OsmMapBoundingBox,
  options?: FetchBicycleParkingsOptions,
): Promise<BicycleParkingOsmFeature[]> {
  const url = buildMapByBoundingBoxUrl(bbox, { server: options?.server });
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[CiclePark OSM] request', { url, bbox, server: options?.server ?? 'production' });
  }

  const res = await fetch(url, {
    method: 'GET',
    signal: options?.signal,
    headers: {
      Accept: 'application/xml, text/xml;q=0.9, */*;q=0.8',
      'User-Agent': options?.userAgent ?? DEFAULT_OSM_USER_AGENT,
    },
  });

  const text = await res.text();
  if (!res.ok) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn('[CiclePark OSM] HTTP error', {
        status: res.status,
        bodyPreview: text.replace(/\s+/g, ' ').slice(0, 400),
      });
    }
    throw new OpenStreetMapHttpError(res.status, text);
  }

  const parkings = parseOsmMapXmlToBicycleParkings(text);
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[CiclePark OSM] response OK', {
      xmlChars: text.length,
      bicycleParkingCount: parkings.length,
      sample: parkings.slice(0, 3).map((p) => ({
        id: p.id,
        lat: p.latitude,
        lon: p.longitude,
      })),
    });
  }

  return parkings;
}
