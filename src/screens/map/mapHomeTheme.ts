/**
 * Cromado de la home mapa alineado con Stitch CiclePark (Kinetic Utility):
 * sombras ambientales, sin bordes 1px duros, capas tonales.
 */
export const mapHomeChrome = {
  ambientShadow: {
    shadowColor: 'rgba(26, 28, 28, 0.06)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  canvasLight: {
    base: '#E8E4DC',
    blockA: 'rgba(255, 255, 255, 0.35)',
    blockB: 'rgba(26, 28, 28, 0.06)',
    road: 'rgba(255, 255, 255, 0.5)',
  },
  canvasDark: {
    base: '#1C1B19',
    blockA: 'rgba(255, 255, 255, 0.04)',
    blockB: 'rgba(255, 255, 255, 0.08)',
    road: 'rgba(255, 255, 255, 0.06)',
  },
  primaryCtaLight: '#000000',
  primaryCtaOnLight: '#FFFFFF',
} as const;
