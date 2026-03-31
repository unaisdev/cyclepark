/** Bbox en grados decimales WGS84 (mismo orden que exige la API OSM). */
export type OsmMapBoundingBox = {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
};

export type OsmElementKind = 'node' | 'way';

/**
 * Punto representable en el mapa: nodos con `amenity=bicycle_parking` o `way` con ese tag
 * (coordenada = centroide de los nodos del way presentes en la misma respuesta).
 */
export type BicycleParkingOsmFeature = {
  osmType: OsmElementKind;
  id: string;
  latitude: number;
  longitude: number;
  tags: Record<string, string>;
};
