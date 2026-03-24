import type { TranslationResources } from './TranslationResources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResources;
    };
    returnNull: false;
  }
}
