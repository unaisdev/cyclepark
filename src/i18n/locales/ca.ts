import type { TranslationResources } from '../TranslationResources';

export const ca: TranslationResources = {
  tabs: {
    map: 'Mapa',
    favorites: 'Favorits',
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
      locateFollowMeHint:
        'Mantén premut perquè el mapa segueixi la teva posició mentre et mous.',
      locateFollowMeActiveA11y: 'Seguint la teva ubicació',
      locateFollowMeStopHint: 'Mantén premut per deixar de seguir la teva posició.',
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
      mapActivityLoadingParkings: 'Carregant aparcabicis propers…',
      osmTooManyNodesHint: 'Fes zoom per descobrir els aparcaments',
      searchThisArea: 'Cercar en aquesta zona',
      searchThisAreaA11y: 'Cercar aparcaments de bicicletes a la zona visible del mapa',
      searchThisAreaUnableMessage:
        'No hem pogut llegir la vista del mapa. Espera un moment o mou una mica el mapa i torna-ho a provar.',
      mapTypePickerA11y: 'Tipus de mapa. Toca per mostrar o amagar l’estil del mapa.',
      mapTypeStandard: 'Mapa',
      mapTypeSatellite: 'Satèl·lit',
      mapTypeHybrid: 'Híbrid',
      mapTypeTerrain: 'Relleu',
      addParking: 'Afegir aparcament',
      parkingDetailSheetTitle: 'Aparcament de bicicletes',
      parkingDetailSheetHint:
        'Dades de la comunitat a OpenStreetMap. A sota: camps llegibles, tipus de suport (amb fotos de la wiki si n’hi ha) i totes les etiquetes en text pla.',
      parkingDetailClose: 'Tancar',
      parkingDetail: {
        sectionDetails: 'Detalls',
        sectionDetailsEmpty:
          'Encara no hi ha nom, capacitat, accés ni altres camps habituals a OpenStreetMap per a aquest lloc.',
        sectionRackType: 'Tipus de suport',
        sectionOtherTags: 'Altres etiquetes',
        sectionRawTags: 'Totes les etiquetes (copiar)',
        wikiLearnAmenity: 'Wiki OSM: amenity=bicycle_parking',
        wikiLearnRackTypes: 'Wiki OSM: tipus bicycle_parking',
        wikiAttribution:
          'Il·lustracions de la wiki d’OpenStreetMap / Wikimedia Commons (CC BY-SA si escau).',
        rackTypeOsmValue: 'Valor a l’OSM',
        rackTypeNotTagged:
          'OpenStreetMap encara no inclou un tipus bicycle_parking=* per a aquest aparcament.',
        waveDeprecatedNote:
          'La wiki recomana usar stands, rack o wall_loops en lloc de wave.',
        fields: {
          name: 'Nom',
          operator: 'Operador',
          capacity: 'Capacitat',
          capacityCargoBike: 'Capacitat (bicis de càrrega)',
          cargoBike: 'Bicis de càrrega',
          covered: 'Cobert',
          indoor: 'Interior',
          access: 'Accés',
          fee: 'Tarifa',
          supervised: 'Vigilat',
          surveillance: 'Videovigilància',
          maxstay: 'Temps màxim',
          refVelopark: 'Ref. Velopark',
          website: 'Web',
          openingHours: 'Horari',
          note: 'Nota',
          description: 'Descripció',
          source: 'Font',
        },
        types: {
          stands:
            'Suport metàl·lic on recolzes la bicicleta sencera; sovint pots panyar el quadre i una roda (estil Sheffield / “grapa”).',
          wall_loops:
            'Ranures estretes per a la roda; sovint anomenats “doblarodes”; moltes vegades només la roda queda ben subjecta.',
          rack:
            'Suport per a diverses bicis; semblant als wall_loops, sovint subjecta sobretot la roda (estil “perxa”).',
          shed:
            'Cobert tancat per a moltes bicis; l’accés pot requerir clau, targeta o personal (vegeu també covered / locked).',
          bollard:
            'Bol·lard pensat per a panyar; braços o anells eviten aixecar la bici del pal.',
          wide_stands:
            'Suport més ample per aparcar a dos costats sense que xoquin els manillars (estil “clip”).',
          floor:
            'Zona senyalitzada per a bicis sense suport; potser no hi ha res sòlid per al quadre.',
          safe_loops:
            'Variant millorada del wall_loop amb més suport per panyar quadre i roda amb més seguretat.',
          handlebar_holder:
            'Subjecta el manillar; una o dues rodes poden quedar en l’aire en aparcar.',
          anchors:
            'Petit ancoratge a terra o paret (o pal) pel qual passes el pany.',
          informal:
            'Baranes o mobiliari urbà que la gent usa sovint; no és un suport dedicat.',
          two_tier:
            'Aparcament a dues alçades, una bici damunt de l’altra (freqüent a estacions).',
          streetpod:
            'Mòdul tipus caseta o taquilla; sovint envolta la roda davantera per més seguretat.',
          tree:
            '“Arbre” de bicicletes o sistema vertical apilat.',
          smart_dock:
            'Base per a bici compartida o lloguer: desbloqueig amb app, targeta o pagament; a vegades recarrega.',
          arcadia:
            'Suport amb cadenes o punts extres per al quadre (estil Turvatec Arcadia).',
          crossbar:
            'Barra a la paret pensada per aparcar; potser no hi ha places marcades.',
          rope:
            'Cordó o cable tens al qual pots panyar quadre i roda.',
          wave:
            'Tub serpentiforme amb diversos bucles. La wiki prefereix etiquetar com a stands, rack o wall_loops.',
          upright_stands:
            'La bici queda vertical o penjada; estalvia espai; pot caldre aixecar-la.',
          lean_and_stick:
            'Suport en L amb argolla o pinça per al quadre a més de recolzar la bici.',
          saddle_holder:
            'Subjecta el selló i sovint aixeca la roda posterior; la bici queda més o menys vertical.',
          log_with_slots:
            'Tronc o biga amb ranures; sobretot ordre, poca protecció contra robatori.',
          building:
            'Aparcament dins un edifici; revisa horari, accés i vigilància.',
          lockers:
            'Taquilles que tanquen la bici sencera; solen ser molt segures.',
          ground_slots:
            'Ranures al terra per a la roda; poca estructura per panyar el quadre.',
          other:
            'Aquest valor no és a la galeria de l’app. Consulta la wiki d’OpenStreetMap.',
        },
      },
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
        bicycleParkingMarker: 'Aparcament de bicicletes',
      },
    },
    list: {
      title: 'Favorits',
      caption: 'Aquí veuràs els aparcabicis que marquis com a favorits.',
    },
    profile: {
      title: 'Perfil',
      caption: 'Aquí podràs veure i editar el teu compte quan connectem el backend.',
      openPaywall: 'Donar suport a CiclePark',
      premiumActive: 'Mode supporter actiu',
      a11y: {
        back: 'Tornar',
      },
    },
    paywall: {
      title: 'Donar suport a CiclePark',
      subtitle: 'Compra única per donar suport al desenvolupament i mantenir viu el projecte.',
      buyCta: 'Desbloquejar supporter - {{price}}',
      restoreCta: 'Restaurar compres',
      unavailablePrice: '...',
      premiumActive: 'Gràcies per donar suport a CiclePark.',
      footer: 'Les compres es gestionen amb Apple App Store / Google Play.',
      features: {
        support: 'Ajuda a finançar millores i manteniment del mapa.',
        futureFeatures: 'Accés anticipat a avantatges premium futures.',
        thanks: 'El teu suport manté aquesta app independent.',
      },
      supporter: {
        title: 'Ets supporter',
        subtitle: 'La teva compra està activa en aquest dispositiu — gràcies per donar suport a CiclePark.',
        feature1: 'Estàs ajudant a finançar millores i manteniment del mapa.',
        feature2: 'Tindràs accés anticipat quan afegim noves avantatges per a supporters.',
        feature3: 'El teu suport manté aquesta app independent.',
        footer: 'Els avantatges de supporter queden vinculats al teu compte d’App Store o Google Play.',
      },
      a11y: {
        back: 'Tornar',
      },
    },
    settings: {
      title: 'Configuració',
      sectionAppearance: 'Aparença',
      sectionLanguage: 'Idioma',
      sectionSupport: 'Suport',
      premium: {
        rowTitle: 'Donar suport a CiclePark',
        statusActive: 'Actiu',
        statusInactive: 'No actiu',
      },
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
        eu: 'Euskara',
      },
    },
    onboarding: {
      common: {
        progressA11y: 'Pas {{current}} de {{total}}',
      },
      welcome: {
        kicker: 'Mapa col·laboratiu',
        title: 'Benvingut',
        body: 'Troba i comparteix aparcaments segurs per a bicicleta a prop teu.',
        continue: 'Començar',
      },
      language: {
        title: 'Idioma',
        body: 'Tria l’idioma de l’aplicació. El podràs canviar després a Configuració.',
        continue: 'Continuar',
      },
      location: {
        title: 'La teva ubicació',
        body:
          'Fem servir la ubicació per mostrar-te al mapa i suggerir aparcaments propers. Pots denegar el permís i seguir amb cerca manual.',
        allow: 'Permetre ubicació',
        skip: 'Ara no',
      },
      notifications: {
        title: 'Avisos',
        body:
          'Si actives les notificacions, et podem avisar de novetats útils. Ho podràs canviar després als ajustos del sistema.',
        allow: 'Permetre avisos',
        skip: 'Ara no',
      },
      legal: {
        title: 'Termes i privacitat',
        body: 'Per continuar, confirma que has llegit i acceptes el següent.',
        termsLabel: 'Accepto els termes i condicions d’ús',
        privacyLabel: 'Accepto la política de privacitat',
        marketingLabel: 'Vull rebre novetats i consells per correu o push (opcional)',
        versionHint: 'Versió dels documents: {{version}}',
        finish: 'Entrar a CiclePark',
        backA11y: 'Enrere',
      },
    },
  },
};
