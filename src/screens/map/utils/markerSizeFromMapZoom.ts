/** Niveles de zoom discretos (0 = mapa muy acercado, mayor índice = más alejado). */
const BUCKET_COUNT = 7;

/**
 * Diámetro en px por bucket (debe coincidir con `assets/map-marker-bucket-*.png`).
 * Mayor zoom en mapa (latitudeDelta pequeña) → pin grande; más alejado → pequeño.
 */
const DIAMETERS_PX = [72, 60, 48, 38, 30, 24, 20] as const;

const MIN_LAT_DELTA = 0.0035;
const MAX_LAT_DELTA = 0.26;

/**
 * Agrupa `latitudeDelta` en buckets ~logarítmicos (el zoom del mapa se percibe así).
 */
export function zoomBucketFromLatitudeDelta(latitudeDelta: number): number {
  const clamped = Math.min(Math.max(latitudeDelta, MIN_LAT_DELTA), MAX_LAT_DELTA);
  const minL = Math.log(MIN_LAT_DELTA);
  const maxL = Math.log(MAX_LAT_DELTA);
  const t = (Math.log(clamped) - minL) / (maxL - minL);
  const idx = Math.min(Math.floor(t * BUCKET_COUNT), BUCKET_COUNT - 1);
  return Math.max(idx, 0);
}

export function markerDiameterForZoomBucket(bucket: number): number {
  const i = Math.min(Math.max(bucket, 0), DIAMETERS_PX.length - 1);
  return DIAMETERS_PX[i];
}

/** Si ya estamos en el pin más grande (bucket 0), el seleccionado escala un poco ese bitmap. */
const SELECTED_EXTRA_SCALE_WHEN_ALREADY_LARGEST = 1.22;

export type ParkingMarkerVisualSpec = {
  imageBucket: number;
  /** 1 = tamaño nativo del PNG del bucket; >1 solo al escalar el bucket 0 seleccionado. */
  sizeMultiplier: number;
};

/**
 * Pin enfocado: un bucket más grande (PNG mayor) que el resto; en el zoom más cercano, escala el bucket 0.
 */
export function parkingMarkerVisualSpec(
  mapZoomBucket: number,
  isSelected: boolean,
): ParkingMarkerVisualSpec {
  const b = Math.min(Math.max(mapZoomBucket, 0), BUCKET_COUNT - 1);
  if (!isSelected) {
    return { imageBucket: b, sizeMultiplier: 1 };
  }
  if (b > 0) {
    return { imageBucket: b - 1, sizeMultiplier: 1 };
  }
  return { imageBucket: 0, sizeMultiplier: SELECTED_EXTRA_SCALE_WHEN_ALREADY_LARGEST };
}

export function markerPixelSizeFromSpec(spec: ParkingMarkerVisualSpec): number {
  const base = markerDiameterForZoomBucket(spec.imageBucket);
  return Math.round(base * spec.sizeMultiplier);
}
