/**
 * Ilustraciones por tipo de `bicycle_parking=*` (wiki Key:bicycle_parking).
 * Cada entrada: clave canónica (normalizada) → URL estable (Commons o wiki OSM).
 *
 * @see https://wiki.openstreetmap.org/wiki/Key:bicycle_parking
 */

/** Clave canónica = valor OSM en minúsculas con guiones sustituidos por guiones bajos (ej. two-tier → two_tier). */
export type BicycleParkingIllustrationKey = keyof typeof BICYCLE_PARKING_CANONICAL_IMAGE_URL;

/**
 * Mapa principal: un valor normalizado de `bicycle_parking` → imagen de ejemplo en la wiki.
 */
export const BICYCLE_PARKING_CANONICAL_IMAGE_URL = {
  /** stands — Sheffield / “staple”, apoyo del cuadro */
  stands:
    'https://upload.wikimedia.org/wikipedia/commons/d/dc/Bike_racks_at_north-west_of_Westfield_-_geograph.org.uk_-_1041057.jpg',
  /** wall_loops — ranuras para rueda, “wheelbender” */
  wall_loops: 'https://wiki.openstreetmap.org/w/images/c/c1/IMG_20231110_161746.jpg',
  /** rack — perchero / varias bicis, a menudo solo rueda */
  rack: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Triton_Bike_Rack.png',
  /** shed — cobertizo cerrado */
  shed: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Bike_shed_15d06.jpg',
  /** bollard — bolardo para candar */
  bollard: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Bike_path_on_College_in_Toronto.jpeg',
  /** wide_stands — soporte ancho (“paperclip”) */
  wide_stands: 'https://wiki.openstreetmap.org/w/images/2/28/Wide_stands_1.jpeg',
  /** floor — zona en suelo sin soporte */
  floor: 'https://wiki.openstreetmap.org/w/images/a/ad/Bicycle_parking_floor.jpg',
  /** safe_loops — variante segura de wall loop */
  safe_loops: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Safe_loops_bicycle_parkint.png',
  /** handlebar_holder — sujeta manillar */
  handlebar_holder:
    'https://upload.wikimedia.org/wikipedia/commons/2/2c/Bicycle_parking_handlebar_holder.jpg',
  /** anchors — anclaje en suelo/pared */
  anchors:
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/Anchor-style_bicycle_parking_in_Salt_Lake_City_Utah.jpg',
  /** informal — barandilla / mobiliario habitual */
  informal: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Biciclette_bologna_matteotti.JPG',
  /** two-tier — dos alturas */
  two_tier:
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Bicis_a_l%27estaci%C3%B3_de_Leiden.JPG',
  /** streetpod — módulo cerrado tipo taquilla */
  streetpod: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Salt_Ayre_streetpods_2.jpg',
  /** tree — árbol / apilado vertical comercial */
  tree: 'https://upload.wikimedia.org/wikipedia/commons/7/74/KeoBike_Ede.jpg',
  /** smart_dock — bici pública / dock con desbloqueo */
  smart_dock:
    'https://upload.wikimedia.org/wikipedia/commons/3/31/Station_V%C3%A9locit%C3%A9_Victor_Hugo_-_Besan%C3%A7on_%28FR25%29_-_2022-04-17_-_2.jpg',
  /** arcadia — cadenas (Turvatec) */
  arcadia: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Campus_Arcadia_py%C3%B6r%C3%A4teline.jpg',
  /** crossbar — barra en pared */
  crossbar: 'https://wiki.openstreetmap.org/w/images/4/41/Bicycle_parking_crossbar_example.jpg',
  /** rope — cuerda / cable */
  rope: 'https://wiki.openstreetmap.org/w/images/7/7d/Bicycle_parking_rope.jpg',
  /** wave — serpentín (wiki desaconseja; misma galería) */
  wave: 'https://wiki.openstreetmap.org/w/images/d/d1/BicycleParkingWave.jpg',
  /** upright_stands — aparcado vertical */
  upright_stands:
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Vertical_Bike_Parking_Racks%2C_Ferry_Terminal.jpg',
  /** lean_and_stick — apoyo + argolla */
  lean_and_stick: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Bike-parking-lean%26stick.jpg',
  /** saddle_holder — soporta sillín */
  saddle_holder: 'https://wiki.openstreetmap.org/w/images/0/0f/Bicycle-parking_saddle_holder.jpg',
  /** log_with_slots — tronco con ranuras */
  log_with_slots:
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/Bayreuth_-_Fahrradst%C3%A4nder_%28Baumstamm%29.jpg',
  /** building — interior en edificio (ej. Radstation) */
  building: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Radstation.jpg',
  /** lockers — taquillas individuales */
  lockers:
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Bicycle_Lockers_-_geograph.org.uk_-_146866.jpg',
  /** ground_slots — ranuras en el pavimento */
  ground_slots: 'https://wiki.openstreetmap.org/w/images/8/82/Bicycle_ground_slots.jpg',
} as const satisfies Record<string, string>;

/**
 * Alias normalizados (p. ej. variantes usadas en OSM) → clave canónica con imagen.
 * Solo incluimos entradas que no son idénticas a la clave canónica.
 */
export const BICYCLE_PARKING_ILLUSTRATION_ALIAS_TO_CANONICAL: Readonly<
  Record<string, BicycleParkingIllustrationKey>
> = {
  // stands (Sheffield, staple, U-rack…)
  stand: 'stands',
  sheffield_stand: 'stands',
  sheffield: 'stands',
  inverted_u: 'stands',
  staple_rack: 'stands',
  u_rack: 'stands',
  staple: 'stands',
  // wall_loops
  wall_loop: 'wall_loops',
  wheelbender: 'wall_loops',
  // rack
  grid: 'rack',
  coathanger: 'rack',
  // wide_stands
  wide: 'wide_stands',
  paperclip: 'wide_stands',
  // wave / serpentín
  serpentine: 'wave',
  ribbon: 'wave',
  // two-tier
  twolevel: 'two_tier',
  two_level: 'two_tier',
  // lockers
  locker: 'lockers',
  // shed / building cercanos en la galería
  shed_lock: 'shed',
};

/** @deprecated Usar `BICYCLE_PARKING_CANONICAL_IMAGE_URL` — misma forma para compat. */
export const BICYCLE_PARKING_TYPE_IMAGE_URL: Readonly<
  Record<string, string>
> = BICYCLE_PARKING_CANONICAL_IMAGE_URL;

/** Normaliza valor OSM `bicycle_parking` para búsqueda (guion → guión bajo, trim, minúsculas). */
export function normalizeBicycleParkingTypeKey(osmValue: string): string {
  return osmValue.trim().toLowerCase().replace(/-/g, '_');
}

function resolveIllustrationCanonicalKey(normalized: string): BicycleParkingIllustrationKey | undefined {
  if (normalized in BICYCLE_PARKING_CANONICAL_IMAGE_URL) {
    return normalized as BicycleParkingIllustrationKey;
  }
  const viaAlias = BICYCLE_PARKING_ILLUSTRATION_ALIAS_TO_CANONICAL[normalized];
  return viaAlias;
}

/** URL de ilustración para el valor de etiqueta `bicycle_parking=*`, si está mapeado. */
export function getBicycleParkingTypeImageUrl(osmValue: string | undefined): string | undefined {
  if (!osmValue) return undefined;
  const normalized = normalizeBicycleParkingTypeKey(osmValue);
  const canonical = resolveIllustrationCanonicalKey(normalized);
  if (!canonical) return undefined;
  return BICYCLE_PARKING_CANONICAL_IMAGE_URL[canonical];
}

/** Claves con texto en `screens.map.parkingDetail.types.*` (excluye `other`). */
export const BICYCLE_PARKING_TYPE_DESCRIPTION_KEYS = new Set<string>(
  Object.keys(BICYCLE_PARKING_CANONICAL_IMAGE_URL),
);
