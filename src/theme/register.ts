import { StyleSheet } from 'react-native-unistyles';

import { themes, type CicleParkTheme } from './themes';

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: CicleParkTheme;
    dark: CicleParkTheme;
  }
}

StyleSheet.configure({
  themes,
  settings: {
    adaptiveThemes: true,
  },
});
