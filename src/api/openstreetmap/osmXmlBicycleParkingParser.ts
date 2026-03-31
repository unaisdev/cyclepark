import { XMLParser } from 'fast-xml-parser';
import type { BicycleParkingOsmFeature } from './types';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseTagValue: false,
  trimValues: true,
});

function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function readOsmTags(element: Record<string, unknown>): Record<string, string> {
  const raw = element.tag;
  const tags = ensureArray(raw);
  const out: Record<string, string> = {};
  for (const t of tags) {
    if (!t || typeof t !== 'object') continue;
    const row = t as Record<string, unknown>;
    const k = row['@_k'];
    const v = row['@_v'];
    if (k != null && v != null) out[String(k)] = String(v);
  }
  return out;
}

function isBicycleParking(tags: Record<string, string>): boolean {
  return tags.amenity === 'bicycle_parking';
}

/**
 * Filtra la descarga `/api/0.6/map` (XML) y devuelve solo elementos relevantes para aparcabicis.
 */
export function parseOsmMapXmlToBicycleParkings(xml: string): BicycleParkingOsmFeature[] {
  const doc = xmlParser.parse(xml) as Record<string, unknown> | undefined;
  const osm = doc?.osm as Record<string, unknown> | undefined;
  if (!osm) return [];

  const nodeList = ensureArray(osm.node as Record<string, unknown> | Record<string, unknown>[] | undefined);
  const wayList = ensureArray(osm.way as Record<string, unknown> | Record<string, unknown>[] | undefined);

  const nodeCoords = new Map<string, { lat: number; lon: number }>();
  for (const n of nodeList) {
    const id = String(n['@_id'] ?? '');
    const lat = Number(n['@_lat']);
    const lon = Number(n['@_lon']);
    if (id && Number.isFinite(lat) && Number.isFinite(lon)) {
      nodeCoords.set(id, { lat, lon });
    }
  }

  const results: BicycleParkingOsmFeature[] = [];

  for (const n of nodeList) {
    const tags = readOsmTags(n);
    if (!isBicycleParking(tags)) continue;
    const id = String(n['@_id'] ?? '');
    const lat = Number(n['@_lat']);
    const lon = Number(n['@_lon']);
    if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    results.push({ osmType: 'node', id, latitude: lat, longitude: lon, tags });
  }

  for (const w of wayList) {
    const tags = readOsmTags(w);
    if (!isBicycleParking(tags)) continue;
    const id = String(w['@_id'] ?? '');
    const nds = ensureArray(w.nd as Record<string, unknown> | Record<string, unknown>[] | undefined);
    const coords: { lat: number; lon: number }[] = [];
    for (const nd of nds) {
      const ref = String(nd['@_ref'] ?? '');
      const c = nodeCoords.get(ref);
      if (c) coords.push(c);
    }
    if (coords.length === 0 || !id) continue;
    const lat = coords.reduce((s, c) => s + c.lat, 0) / coords.length;
    const lon = coords.reduce((s, c) => s + c.lon, 0) / coords.length;
    results.push({ osmType: 'way', id, latitude: lat, longitude: lon, tags });
  }

  return results;
}
