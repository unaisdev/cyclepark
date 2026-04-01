import { UnistylesRuntime } from 'react-native-unistyles';
import type { AppearancePreference } from '../stores/preferenceTypes';

/** Aplica apariencia al runtime de Unistyles (debe ser síncrono al cambiar el ajuste para que RN Navigation y pantallas no queden un frame con tema viejo). */
export function applyAppearancePreference(mode: AppearancePreference) {
  if (mode === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
  } else {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(mode);
  }
}
