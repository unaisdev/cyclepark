/**
 * Contrato de todas las cadenas de la app. Añade aquí claves nuevas y
 * actualiza `locales/en`, `es`, `ca` y `eu` para que TypeScript valide cobertura.
 */
export interface TranslationResources {
  tabs: {
    map: string;
    favorites: string;
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
      /** Pista: pulsación larga para modo «sígueme». */
      locateFollowMeHint: string;
      /** Etiqueta del botón cuando el mapa sigue la posición en vivo. */
      locateFollowMeActiveA11y: string;
      /** Pista para desactivar el seguimiento con pulsación larga. */
      locateFollowMeStopHint: string;
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
      /** Indicador: cargando aparcabicis OSM en el área visible. */
      mapActivityLoadingParkings: string;
      /** Vista demasiado alejada: no se lanza la petición OSM hasta acercar más (usa `{{maxDelta}}`). */
      mapOsmRequestZoomInRequired: string;
      /** Tras una descarga OSM correcta (usa `{{count}}`). */
      mapOsmRequestLoaded: string;
      /** Error genérico al descargar aparcabicis OSM (no sustituye la pista de demasiados nodos). */
      mapOsmRequestLoadError: string;
      /** OSM devolvió demasiados nodos en el área: pedir acercar el mapa. */
      osmTooManyNodesHint: string;
      /** CTA: cargar aparcabicis OSM para la vista actual del mapa. */
      searchThisArea: string;
      searchThisAreaA11y: string;
      searchThisAreaUnableMessage: string;
      /** Botón que despliega el selector de tipo de mapa (Google). */
      mapTypePickerA11y: string;
      mapTypeStandard: string;
      mapTypeSatellite: string;
      mapTypeHybrid: string;
      mapTypeTerrain: string;
      addParking: string;
      /** Ficha técnica OSM al pulsar un marcador. */
      parkingDetailSheetTitle: string;
      parkingDetailSheetHint: string;
      parkingDetailClose: string;
      /** Contenido estructurado + ilustraciones wiki (Key:bicycle_parking, Tag:amenity=bicycle_parking). */
      parkingDetail: {
        sectionDetails: string;
        sectionDetailsEmpty: string;
        sectionRackType: string;
        sectionOtherTags: string;
        sectionRawTags: string;
        wikiLearnAmenity: string;
        wikiLearnRackTypes: string;
        wikiAttribution: string;
        rackTypeOsmValue: string;
        rackTypeNotTagged: string;
        waveDeprecatedNote: string;
        fields: {
          name: string;
          operator: string;
          capacity: string;
          capacityCargoBike: string;
          cargoBike: string;
          covered: string;
          indoor: string;
          access: string;
          fee: string;
          supervised: string;
          surveillance: string;
          maxstay: string;
          refVelopark: string;
          website: string;
          openingHours: string;
          note: string;
          description: string;
          source: string;
        };
        types: {
          stands: string;
          wall_loops: string;
          rack: string;
          shed: string;
          bollard: string;
          wide_stands: string;
          floor: string;
          safe_loops: string;
          handlebar_holder: string;
          anchors: string;
          informal: string;
          two_tier: string;
          streetpod: string;
          tree: string;
          smart_dock: string;
          arcadia: string;
          crossbar: string;
          rope: string;
          wave: string;
          upright_stands: string;
          lean_and_stick: string;
          saddle_holder: string;
          log_with_slots: string;
          building: string;
          lockers: string;
          ground_slots: string;
          other: string;
        };
      };
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
        bicycleParkingMarker: string;
      };
    };
    list: {
      title: string;
      caption: string;
    };
    profile: {
      title: string;
      caption: string;
      openPaywall: string;
      supporterThankYouTitle: string;
      supporterThankYouBody: string;
      a11y: {
        back: string;
        supporterCard: string;
      };
    };
    paywall: {
      title: string;
      subtitle: string;
      buyCta: string;
      restoreCta: string;
      unavailablePrice: string;
      premiumActive: string;
      footer: string;
      features: {
        support: string;
        futureFeatures: string;
        thanks: string;
      };
      supporter: {
        title: string;
        subtitle: string;
        feature1: string;
        feature2: string;
        feature3: string;
        footer: string;
      };
      a11y: {
        back: string;
      };
    };
    settings: {
      title: string;
      sectionAppearance: string;
      sectionLanguage: string;
      sectionSupport: string;
      premium: {
        rowTitle: string;
        statusActive: string;
        statusInactive: string;
      };
      appearance: {
        rowTitle: string;
        sheetTitle: string;
        sheetSubtitle: string;
        system: string;
        light: string;
        dark: string;
      };
      language: {
        rowTitle: string;
        sheetTitle: string;
        sheetSubtitle: string;
        system: string;
        es: string;
        en: string;
        ca: string;
        eu: string;
      };
    };
    onboarding: {
      common: {
        progressA11y: string;
      };
      welcome: {
        kicker: string;
        title: string;
        body: string;
        continue: string;
      };
      language: {
        title: string;
        body: string;
        continue: string;
      };
      location: {
        title: string;
        body: string;
        allow: string;
        skip: string;
      };
      notifications: {
        title: string;
        body: string;
        allow: string;
        skip: string;
      };
      legal: {
        title: string;
        body: string;
        termsLabel: string;
        privacyLabel: string;
        marketingLabel: string;
        versionHint: string;
        finish: string;
        backA11y: string;
      };
    };
  };
}
