/**
 * Contrato de todas las cadenas de la app. Añade aquí claves nuevas y
 * actualiza `locales/en`, `es` y `ca` para que TypeScript valide cobertura.
 */
export interface TranslationResources {
  tabs: {
    map: string;
    list: string;
    settings: string;
  };
  screens: {
    map: {
      title: string;
      caption: string;
      liveMapOverline: string;
      searchPlaceholder: string;
      filterAvailable: string;
      filterCovered: string;
      locateA11y: string;
      locatePermissionTitle: string;
      locatePermissionDenied: string;
      locateErrorTitle: string;
      locateErrorMessage: string;
      searchGeocodeNotFoundTitle: string;
      searchGeocodeNotFoundMessage: string;
      searchGeocodeErrorTitle: string;
      searchGeocodeErrorMessage: string;
      /** Indicador bajo filtros: búsqueda / geocodificación. */
      mapActivityGeocoding: string;
      /** Indicador bajo filtros: obtener GPS y centrar mapa. */
      mapActivityLocating: string;
      addParking: string;
      addParkingFlow: {
        step1Title: string;
        step1Body: string;
        continue: string;
        cancel: string;
        step2Title: string;
        step2Body: string;
        back: string;
        submit: string;
        comingSoon: string;
      };
      a11y: {
        openProfile: string;
      };
    };
    list: {
      title: string;
      caption: string;
    };
    profile: {
      title: string;
      caption: string;
      a11y: {
        back: string;
      };
    };
    settings: {
      title: string;
      sectionAppearance: string;
      sectionLanguage: string;
      appearance: {
        rowTitle: string;
        sheetTitle: string;
        system: string;
        light: string;
        dark: string;
      };
      language: {
        rowTitle: string;
        sheetTitle: string;
        system: string;
        es: string;
        en: string;
        ca: string;
      };
    };
  };
}
