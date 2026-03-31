import type { BicycleParkingOsmFeature } from '../../../api/openstreetmap';

/** Tag keys we surface as labeled rows (OpenStreetMap wiki “useful combinations”). */
const ORDERED_DETAIL_KEYS: string[] = [
  'name',
  'operator',
  'capacity',
  'capacity:cargo_bike',
  'cargo_bike',
  'covered',
  'indoor',
  'access',
  'fee',
  'supervised',
  'surveillance',
  'maxstay',
  'ref:velopark',
  'website',
  'opening_hours',
  'note',
  'description',
  'source',
];

const SKIP_IN_DETAILS = new Set(['amenity', 'bicycle_parking']);

export type BicycleParkingTagRow = { key: string; value: string };

export function getBicycleParkingTypeRaw(tags: Record<string, string>): string | undefined {
  const v = tags.bicycle_parking;
  return v != null && String(v).trim() !== '' ? String(v).trim() : undefined;
}

/**
 * Rows for the detail sheet: known keys in wiki order, then any other tags (except amenity / bicycle_parking).
 */
export function getBicycleParkingDetailRows(parking: BicycleParkingOsmFeature): {
  detailRows: BicycleParkingTagRow[];
  remainingTagRows: BicycleParkingTagRow[];
} {
  const tags = parking.tags;
  const detailRows: BicycleParkingTagRow[] = [];

  for (const k of ORDERED_DETAIL_KEYS) {
    const value = tags[k];
    if (value != null && value !== '') {
      detailRows.push({ key: k, value });
    }
  }

  const used = new Set(detailRows.map((r) => r.key));
  used.add('amenity');
  used.add('bicycle_parking');

  const remainingKeys = Object.keys(tags)
    .filter((k) => !used.has(k) && !SKIP_IN_DETAILS.has(k))
    .sort((a, b) => a.localeCompare(b));

  const remainingTagRows = remainingKeys.map((key) => ({ key, value: tags[key] }));

  return { detailRows, remainingTagRows };
}
