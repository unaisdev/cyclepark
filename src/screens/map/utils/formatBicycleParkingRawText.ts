import type { BicycleParkingOsmFeature } from "../../../api/openstreetmap";

/**
 * Volcado en texto plano de lo que devuelve el parser OSM (útil para depurar y producto).
 */
export function formatBicycleParkingRawText(
  p: BicycleParkingOsmFeature,
): string {
  const lines: string[] = [
    `osmType: ${p.osmType}`,
    `id: ${p.id}`,
    `latitude: ${p.latitude}`,
    `longitude: ${p.longitude}`,
    "",
    "tags:",
  ];
  const keys = Object.keys(p.tags).sort((a, b) => a.localeCompare(b));
  if (keys.length === 0) {
    lines.push("  (no tags)");
  } else {
    for (const k of keys) {
      lines.push(`  ${k}=${p.tags[k]}`);
    }
  }
  return lines.join("\n");
}
