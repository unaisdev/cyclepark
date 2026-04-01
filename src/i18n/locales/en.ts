import type { TranslationResources } from '../TranslationResources';

export const en: TranslationResources = {
  tabs: {
    map: 'Map',
    favorites: 'Favorites',
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
      locateFollowMeHint: 'Long-press to keep the map centered on you as you move.',
      locateFollowMeActiveA11y: 'Following your location',
      locateFollowMeStopHint: 'Long-press to stop following your location.',
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
      mapActivityLoadingParkings: 'Loading bike parking nearby…',
      mapOsmRequestZoomInRequired:
        'Zoom in closer to load bike parking (narrower view than {{maxDelta}}°).',
      mapOsmRequestLoaded: 'Download complete: {{count}} bike parking spots in this area.',
      mapOsmRequestLoadError: 'Could not load bike parking. Try again.',
      osmTooManyNodesHint: 'Zoom in to discover bike parking',
      searchThisArea: 'Search this area',
      searchThisAreaA11y: 'Search for bike parking in the visible map area',
      searchThisAreaUnableMessage:
        'We could not read the map view. Wait a moment or move the map slightly and try again.',
      mapTypePickerA11y: 'Map type. Tap to show or hide map style options.',
      mapTypeStandard: 'Map',
      mapTypeSatellite: 'Satellite',
      mapTypeHybrid: 'Hybrid',
      mapTypeTerrain: 'Terrain',
      addParking: 'Add bike parking',
      parkingDetailSheetTitle: 'Bike parking',
      parkingDetailSheetHint:
        'Community data from OpenStreetMap. Below: readable fields, rack type (with wiki photos when available), then all tags as plain text.',
      parkingDetailClose: 'Close',
      parkingDetail: {
        sectionDetails: 'Details',
        sectionDetailsEmpty:
          'No name, capacity, access, or other common fields are recorded for this spot in OpenStreetMap yet.',
        sectionRackType: 'Rack type',
        sectionOtherTags: 'Other tags',
        sectionRawTags: 'All tags (copy)',
        wikiLearnAmenity: 'OSM wiki: amenity=bicycle_parking',
        wikiLearnRackTypes: 'OSM wiki: bicycle_parking types',
        wikiAttribution:
          'Illustrations from the OpenStreetMap Wiki / Wikimedia Commons (CC BY-SA where applicable).',
        rackTypeOsmValue: 'OSM value',
        rackTypeNotTagged:
          'OpenStreetMap does not yet include a bicycle_parking=* rack type for this feature.',
        waveDeprecatedNote:
          'The wiki recommends using stands, rack or wall_loops instead of wave.',
        fields: {
          name: 'Name',
          operator: 'Operator',
          capacity: 'Capacity',
          capacityCargoBike: 'Cargo bike capacity',
          cargoBike: 'Cargo bikes',
          covered: 'Covered',
          indoor: 'Indoor',
          access: 'Access',
          fee: 'Fee',
          supervised: 'Supervised',
          surveillance: 'Surveillance',
          maxstay: 'Max stay',
          refVelopark: 'Velopark ref',
          website: 'Website',
          openingHours: 'Opening hours',
          note: 'Note',
          description: 'Description',
          source: 'Source',
        },
        types: {
          stands:
            'Metal stand you lean the full bicycle against; you can usually lock the frame and a wheel (Sheffield / “staple” rack).',
          wall_loops:
            'Narrow slots that stabilise a wheel—often called “wheelbenders”; often only the wheel is well secured.',
          rack:
            'Rack for several bikes; similar to wall loops, often mainly the wheel is held (coathanger-style racks are common).',
          shed:
            'Enclosed shelter for many bicycles; access may need a key, card or staff (see also covered / locked).',
          bollard:
            'Bollard made for locking a bike; arms or rings can stop the bike being lifted off the post.',
          wide_stands:
            'Wider stand so bicycles can park on both sides without handlebars colliding (sometimes called “paperclip” racks).',
          floor:
            'Area marked for bicycles but without racks—there may be little to lock the frame to.',
          safe_loops:
            'Improved “wall loop” with more support so you can lock the frame and a wheel more safely.',
          handlebar_holder:
            'Holds the handlebars; one or both wheels may be off the ground while parked.',
          anchors:
            'Small anchor in wall or ground (or on a post) to thread a lock through.',
          informal:
            'Long railings or street furniture that many people use informally; not a dedicated rack.',
          two_tier:
            'Two-level rack: bicycles stored one above the other (common at stations).',
          streetpod:
            'Pod or locker-like unit; the front wheel is often enclosed for better security.',
          tree:
            'Vertical “bicycle tree” or stacked parking system.',
          smart_dock:
            'Dock for shared or rental bikes: unlock with app, card or payment; may charge the bike.',
          arcadia:
            'Stand with chains or extra points to lock the frame (e.g. Turvatec Arcadia style).',
          crossbar:
            'Bar on a wall intended as bike parking; individual spaces may not be marked.',
          rope:
            'Tense rope or cable you can lock the frame and a wheel to.',
          wave:
            'Serpentine metal tube with several loops. The wiki prefers tagging as stands, rack or wall_loops instead.',
          upright_stands:
            'Bike stored vertically or hung—saves floor space; lifting may be needed.',
          lean_and_stick:
            'Lean-to bracket, often with an eyelet or clamp so you can lock the frame.',
          saddle_holder:
            'Supports the saddle so the rear wheel lifts; the bike stays roughly upright.',
          log_with_slots:
            'Log or beam with slots—mostly for orderly parking; weak protection against theft.',
          building:
            'Bicycle parking inside a proper building; check opening hours, access and supervision.',
          lockers:
            'Individual lockers that fully enclose each bicycle—usually high security.',
          ground_slots:
            'Slots in the pavement for a wheel; little or no structure to lock the frame to.',
          other:
            'This value is not in the in-app gallery. See the OpenStreetMap wiki for community documentation.',
        },
      },
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
        bicycleParkingMarker: 'Bike parking',
      },
    },
    list: {
      title: 'Favorites',
      caption: 'Bike parking spots you save as favorites will appear here.',
    },
    profile: {
      title: 'Profile',
      caption: 'You will be able to view and edit your account here once we connect the backend.',
      openPaywall: 'Support CiclePark',
      supporterThankYouTitle: 'Thank you for being part of CiclePark',
      supporterThankYouBody:
        'Your support helps maintain and improve the bike parking map. It means a lot to the project!',
      a11y: {
        back: 'Go back',
        supporterCard: 'You are a CiclePark supporter. Thank you for supporting the project.',
      },
    },
    paywall: {
      title: 'Support CiclePark',
      subtitle: 'One-time purchase to support development and keep the project moving.',
      buyCta: 'Unlock supporter - {{price}}',
      restoreCta: 'Restore purchases',
      unavailablePrice: '...',
      premiumActive: 'Thank you for supporting CiclePark.',
      footer: 'Purchases are handled by Apple App Store / Google Play.',
      features: {
        support: 'Help fund map data improvements and maintenance.',
        futureFeatures: 'Get early access to future premium perks.',
        thanks: 'Your support keeps this app independent.',
      },
      supporter: {
        title: 'You’re a supporter',
        subtitle: 'Your purchase is active on this device — thank you for backing CiclePark.',
        feature1: 'You’re helping fund map data improvements and maintenance.',
        feature2: 'You’ll get early access when we ship new supporter perks.',
        feature3: 'Your support helps keep this app independent.',
        footer: 'Supporter perks stay linked to your App Store or Google Play account.',
      },
      a11y: {
        back: 'Go back',
      },
    },
    settings: {
      title: 'Settings',
      sectionAppearance: 'Appearance',
      sectionLanguage: 'Language',
      sectionSupport: 'Support',
      premium: {
        rowTitle: 'Support CiclePark',
        statusActive: 'Active',
        statusInactive: 'Not active',
      },
      appearance: {
        rowTitle: 'Dark mode',
        sheetTitle: 'Appearance',
        sheetSubtitle: 'Tap an option to apply it right away.',
        system: 'Automatic',
        light: 'Light',
        dark: 'Dark',
      },
      language: {
        rowTitle: 'Language',
        sheetTitle: 'Language',
        sheetSubtitle: 'Tap a language to use it across the app.',
        system: 'Automatic',
        es: 'Español',
        en: 'English',
        ca: 'Català',
        eu: 'Basque',
      },
    },
    onboarding: {
      common: {
        progressA11y: 'Step {{current}} of {{total}}',
      },
      welcome: {
        kicker: 'Community map',
        title: 'Welcome',
        body: 'Find and share safe bike parking near you.',
        continue: 'Get started',
      },
      language: {
        title: 'Language',
        body: 'Choose the app language. You can change this later in Settings.',
        continue: 'Continue',
      },
      location: {
        title: 'Your location',
        body:
          'We use your location to show you on the map and suggest nearby parking. You can deny permission and keep using the app with manual search.',
        allow: 'Allow location',
        skip: 'Not now',
      },
      notifications: {
        title: 'Notifications',
        body:
          'If you enable notifications, we can share helpful updates about areas and your activity. You can change this later in system settings.',
        allow: 'Allow notifications',
        skip: 'Not now',
      },
      legal: {
        title: 'Terms and privacy',
        body: 'To continue, confirm you have read and accept the following.',
        termsLabel: 'I accept the terms and conditions of use',
        privacyLabel: 'I accept the privacy policy',
        marketingLabel: 'I want tips and updates by email or push (optional)',
        versionHint: 'Document version: {{version}}',
        finish: 'Enter CiclePark',
        backA11y: 'Go back',
      },
    },
  },
};
