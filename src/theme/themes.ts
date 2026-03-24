import { appDark, appLight } from './tokens/colors/app';
import { feedbackDark, feedbackLight } from './tokens/colors/feedback';
import { mapDark, mapLight } from './tokens/colors/map';
import { layout } from './layout';
import { typography } from './typography';

export const lightTheme = {
  app: appLight,
  feedback: feedbackLight,
  map: mapLight,
  layout,
  typography,
};

export const darkTheme: typeof lightTheme = {
  app: appDark,
  feedback: feedbackDark,
  map: mapDark,
  layout,
  typography,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type CicleParkTheme = typeof lightTheme;
