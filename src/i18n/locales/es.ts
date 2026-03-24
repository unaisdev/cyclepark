import type { TranslationResources } from '../TranslationResources';

export const es: TranslationResources = {
  tabs: {
    map: 'Mapa',
    list: 'Lista',
    settings: 'Ajustes',
  },
  screens: {
    map: {
      title: 'Mapa',
      caption: 'Aquí irá el mapa y «Buscar en esta zona».',
      liveMapOverline: 'Mapa en vivo',
      searchPlaceholder: 'Buscar zona o dirección',
      filterAvailable: 'Disponible ahora',
      filterCovered: 'Cubierto',
      locateA11y: 'Centrar en mi ubicación',
      locatePermissionTitle: 'Ubicación',
      locatePermissionDenied: 'Necesitamos permiso de ubicación para mostrarte en el mapa.',
      locateErrorTitle: 'Ubicación',
      locateErrorMessage: 'No se pudo obtener tu ubicación. Inténtalo de nuevo.',
      searchGeocodeNotFoundTitle: 'Búsqueda',
      searchGeocodeNotFoundMessage: 'No encontramos ese lugar. Prueba con otra dirección o zona.',
      searchGeocodeErrorTitle: 'Búsqueda',
      searchGeocodeErrorMessage: 'No se pudo buscar ese lugar. Inténtalo de nuevo.',
      mapActivityGeocoding: 'Buscando en el mapa…',
      mapActivityLocating: 'Situando tu posición…',
      addParking: 'Añadir aparcamiento',
      addParkingFlow: {
        step1Title: 'Nuevo aparcabicis',
        step1Body:
          'Ayuda a otros ciclistas: en el siguiente paso podrás indicar datos básicos del sitio antes de publicarlo en el mapa.',
        continue: 'Continuar',
        cancel: 'Cancelar',
        step2Title: 'Detalles del sitio',
        step2Body:
          'Aquí conectarás nombre, tipo de anclaje, fotos y disponibilidad. Esta parte la enlazaremos con el backend más adelante.',
        back: 'Atrás',
        submit: 'Publicar',
        comingSoon: 'Esta acción estará disponible en una próxima versión.',
      },
      a11y: {
        openProfile: 'Abrir perfil',
      },
    },
    list: {
      title: 'Lista',
      caption: 'Listado de aparcamientos en la zona.',
    },
    profile: {
      title: 'Perfil',
      caption: 'Aquí podrás ver y editar tu cuenta cuando conectemos el backend.',
      a11y: {
        back: 'Volver',
      },
    },
    settings: {
      title: 'Ajustes',
      sectionAppearance: 'Apariencia',
      sectionLanguage: 'Idioma',
      appearance: {
        rowTitle: 'Modo oscuro',
        sheetTitle: 'Modo oscuro',
        system: 'Automático',
        light: 'Claro',
        dark: 'Oscuro',
      },
      language: {
        rowTitle: 'Idioma',
        sheetTitle: 'Idioma',
        system: 'Automático',
        es: 'Español',
        en: 'English',
        ca: 'Català',
      },
    },
  },
};
