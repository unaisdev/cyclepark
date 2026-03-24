import type { TranslationResources } from '../TranslationResources';

export const en: TranslationResources = {
  tabs: {
    map: 'Map',
    list: 'List',
    settings: 'Settings',
  },
  screens: {
    map: {
      title: 'Map',
      caption: 'The map and “Search this area” will appear here.',
      liveMapOverline: 'Live map',
      searchPlaceholder: 'Search area or address',
      filterAvailable: 'Available now',
      filterCovered: 'Covered',
      locateA11y: 'Center on my location',
      locatePermissionTitle: 'Location',
      locatePermissionDenied: 'Location permission is needed to show your position on the map.',
      locateErrorTitle: 'Location',
      locateErrorMessage: 'Could not get your current location. Try again.',
      searchGeocodeNotFoundTitle: 'Search',
      searchGeocodeNotFoundMessage: 'We could not find that place. Try another address or area.',
      searchGeocodeErrorTitle: 'Search',
      searchGeocodeErrorMessage: 'Could not look up that place. Try again.',
      mapActivityGeocoding: 'Searching the map…',
      mapActivityLocating: 'Finding your position…',
      addParking: 'Add bike parking',
      addParkingFlow: {
        step1Title: 'New bike parking',
        step1Body:
          'Help other riders: in the next step you will add basic details before publishing the spot on the map.',
        continue: 'Continue',
        cancel: 'Cancel',
        step2Title: 'Spot details',
        step2Body:
          'Here you will add name, rack type, photos and availability. We will wire this to the backend later.',
        back: 'Back',
        submit: 'Publish',
        comingSoon: 'This action will be available in a future update.',
      },
      a11y: {
        openProfile: 'Open profile',
      },
    },
    list: {
      title: 'List',
      caption: 'Bike parking spots in the area.',
    },
    profile: {
      title: 'Profile',
      caption: 'You will be able to view and edit your account here once we connect the backend.',
      a11y: {
        back: 'Go back',
      },
    },
    settings: {
      title: 'Settings',
      sectionAppearance: 'Appearance',
      sectionLanguage: 'Language',
      appearance: {
        rowTitle: 'Dark mode',
        sheetTitle: 'Appearance',
        system: 'Automatic',
        light: 'Light',
        dark: 'Dark',
      },
      language: {
        rowTitle: 'Language',
        sheetTitle: 'Language',
        system: 'Automatic',
        es: 'Español',
        en: 'English',
        ca: 'Català',
      },
    },
  },
};
