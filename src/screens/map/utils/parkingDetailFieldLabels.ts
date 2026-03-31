/** i18n keys under `screens.map.parkingDetail.fields`. */
export type ParkingDetailFieldI18nKey =
  | 'name'
  | 'operator'
  | 'capacity'
  | 'capacityCargoBike'
  | 'cargoBike'
  | 'covered'
  | 'indoor'
  | 'access'
  | 'fee'
  | 'supervised'
  | 'surveillance'
  | 'maxstay'
  | 'refVelopark'
  | 'website'
  | 'openingHours'
  | 'note'
  | 'description'
  | 'source';

/** Maps OSM tag keys to `screens.map.parkingDetail.fields.*` i18n keys. */
export const OSM_TAG_KEY_TO_PARKING_DETAIL_FIELD: Record<string, ParkingDetailFieldI18nKey> = {
  name: 'name',
  operator: 'operator',
  capacity: 'capacity',
  'capacity:cargo_bike': 'capacityCargoBike',
  cargo_bike: 'cargoBike',
  covered: 'covered',
  indoor: 'indoor',
  access: 'access',
  fee: 'fee',
  supervised: 'supervised',
  surveillance: 'surveillance',
  maxstay: 'maxstay',
  'ref:velopark': 'refVelopark',
  website: 'website',
  opening_hours: 'openingHours',
  note: 'note',
  description: 'description',
  source: 'source',
};
