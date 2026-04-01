/**
 * Bitmaps por bucket de zoom (misma escala que `markerSizeFromMapZoom` → `DIAMETERS_PX`).
 * Regenerar desde `assets/bicycle-parking-marker-map.png` si cambian los tamaños.
 */
export const MAP_MARKER_IMAGES = [
  require("../../../../assets/map-marker-bucket-0.png"),
  require("../../../../assets/map-marker-bucket-1.png"),
  require("../../../../assets/map-marker-bucket-2.png"),
  require("../../../../assets/map-marker-bucket-3.png"),
  require("../../../../assets/map-marker-bucket-4.png"),
  require("../../../../assets/map-marker-bucket-5.png"),
  require("../../../../assets/map-marker-bucket-6.png"),
] as const;
