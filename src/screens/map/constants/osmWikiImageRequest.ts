/**
 * Wikimedia Commons y wiki.openstreetmap.org pueden devolver 403 si el cliente no envía
 * un User-Agent identificable (política de uso de la API / descargas).
 * @see https://meta.wikimedia.org/wiki/User-Agent_policy
 */
export const OSM_WIKI_COMPATIBLE_IMAGE_HEADERS = {
  'User-Agent':
    'CiclePark/1.0 (OpenStreetMap bicycle parking app; Android/iOS; package com.anonymous.ciclepark)',
} as const;
