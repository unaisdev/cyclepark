import type { TranslationResources } from '../TranslationResources';

export const ca: TranslationResources = {
  tabs: {
    map: 'Mapa',
    list: 'Llista',
    settings: 'Configuració',
  },
  screens: {
    map: {
      title: 'Mapa',
      caption: 'Aquí hi haurà el mapa i «Cerca en aquesta zona».',
      liveMapOverline: 'Mapa en viu',
      searchPlaceholder: 'Cercar zona o adreça',
      filterAvailable: 'Disponible ara',
      filterCovered: 'Cobert',
      locateA11y: 'Centrar en la meva ubicació',
      locatePermissionTitle: 'Ubicació',
      locatePermissionDenied: 'Cal permís d’ubicació per mostrar-te al mapa.',
      locateErrorTitle: 'Ubicació',
      locateErrorMessage: 'No s’ha pogut obtenir la teva ubicació. Torna-ho a provar.',
      searchGeocodeNotFoundTitle: 'Cerca',
      searchGeocodeNotFoundMessage: 'No hem trobat aquest lloc. Prova una altra adreça o zona.',
      searchGeocodeErrorTitle: 'Cerca',
      searchGeocodeErrorMessage: 'No s’ha pogut cercar aquest lloc. Torna-ho a provar.',
      mapActivityGeocoding: 'Cercant al mapa…',
      mapActivityLocating: 'Situant la teva posició…',
      addParking: 'Afegir aparcament',
      addParkingFlow: {
        step1Title: 'Nou aparcabicis',
        step1Body:
          'Ajuda altres ciclistes: en el següent pas podràs indicar dades bàsiques del lloc abans de publicar-lo al mapa.',
        continue: 'Continuar',
        cancel: 'Cancel·lar',
        step2Title: 'Detalls del lloc',
        step2Body:
          'Aquí hi haurà nom, tipus d’ancoratge, fotos i disponibilitat. Ho connectarem amb el backend més endavant.',
        back: 'Enrere',
        submit: 'Publicar',
        comingSoon: 'Aquesta acció estarà disponible en una propera versió.',
      },
      a11y: {
        openProfile: 'Obrir perfil',
      },
    },
    list: {
      title: 'Llista',
      caption: 'Aparcaments per a bicicletes a la zona.',
    },
    profile: {
      title: 'Perfil',
      caption: 'Aquí podràs veure i editar el teu compte quan connectem el backend.',
      a11y: {
        back: 'Tornar',
      },
    },
    settings: {
      title: 'Configuració',
      sectionAppearance: 'Aparença',
      sectionLanguage: 'Idioma',
      appearance: {
        rowTitle: 'Mode fosc',
        sheetTitle: 'Mode fosc',
        system: 'Automàtic',
        light: 'Clar',
        dark: 'Fosc',
      },
      language: {
        rowTitle: 'Idioma',
        sheetTitle: 'Idioma',
        system: 'Automàtic',
        es: 'Español',
        en: 'English',
        ca: 'Català',
      },
    },
  },
};
