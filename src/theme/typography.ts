export const typography = {
  /** Título principal de pantallas tipo Ajustes / Favoritos / Perfil (estilo iOS large title). */
  screenLargeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },
  titleLarge: { fontSize: 22, fontWeight: '600' as const },
  titleMedium: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  label: { fontSize: 14, fontWeight: '500' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
} as const;
