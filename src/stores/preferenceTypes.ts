import type { AppLocale } from '../i18n';

export type AppearancePreference = 'system' | 'light' | 'dark';
export type LocalePreference = 'system' | AppLocale;

/** Tipos de mapa Google disponibles en la pantalla principal. */
export const MAP_TYPE_OPTIONS = ['standard', 'satellite', 'hybrid', 'terrain'] as const;
export type MapTypePreference = (typeof MAP_TYPE_OPTIONS)[number];
