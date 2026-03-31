import type { TranslationResources } from '../TranslationResources';

export const eu: TranslationResources = {
  tabs: {
    map: 'Mapa',
    favorites: 'Gogokoak',
    settings: 'Ezarpenak',
  },
  screens: {
    map: {
      title: 'Mapa',
      caption: 'Hemen mapa eta «Bilatu eremu honetan» agertuko dira.',
      liveMapOverline: 'Mapa zuzenekoan',
      searchPlaceholder: 'Bilatu eremua edo helbidea',
      filterAvailable: 'Orain erabilgarri',
      filterCovered: 'Estalia',
      locateA11y: 'Nire kokapenean zentratu',
      locateFollowMeHint:
        'Sakatu luze mapak zure posizioa jarraitu dezan mugitzen zaren heinean.',
      locateFollowMeActiveA11y: 'Zure kokapena jarraitzen',
      locateFollowMeStopHint: 'Sakatu luze kokapena jarraitzeari uzteko.',
      locatePermissionTitle: 'Kokapena',
      locatePermissionDenied: 'Mapan zure posizioa erakusteko kokapen-baimena behar dugu.',
      locateErrorTitle: 'Kokapena',
      locateErrorMessage: 'Ezin izan da zure uneko kokapena lortu. Saiatu berriro.',
      searchGeocodeNotFoundTitle: 'Bilaketa',
      searchGeocodeNotFoundMessage:
        'Ezin izan dugu leku hori aurkitu. Probatu beste helbide edo eremu bat.',
      searchGeocodeErrorTitle: 'Bilaketa',
      searchGeocodeErrorMessage: 'Ezin izan da leku hori bilatu. Saiatu berriro.',
      mapActivityGeocoding: 'Mapan bilatzen…',
      mapActivityLocating: 'Zure posizioa kokatzen…',
      mapActivityLoadingParkings: 'Inguruko bizikleta-aparkalekuak kargatzen…',
      osmTooManyNodesHint: 'Handitu zooma aparkalekuak aurkitzeko',
      searchThisArea: 'Bilatu eremu honetan',
      searchThisAreaA11y: 'Bilatu bizikleta-aparkalekuak mapan ikusgai dagoen eremuan',
      searchThisAreaUnableMessage:
        'Ezin izan dugu maparen ikuspegia irakurri. Itxaron pixka bat edo mugitu mapa eta saiatu berriro.',
      mapTypePickerA11y: 'Mapa mota. Sakatu maparen estiloa erakusteko edo ezkutatzeko.',
      mapTypeStandard: 'Mapa',
      mapTypeSatellite: 'Satelitea',
      mapTypeHybrid: 'Hibridoa',
      mapTypeTerrain: 'Erliebea',
      addParking: 'Gehitu aparkalekua',
      parkingDetailSheetTitle: 'Bizikleta-aparkalekua',
      parkingDetailSheetHint:
        'OpenStreetMap komunitatearen datuak. Behean: eremu irakurgarriak, aparkaleku mota (wikiaren argazkiak, badaude) eta etiketa guztiak testu lauan.',
      parkingDetailClose: 'Itxi',
      parkingDetail: {
        sectionDetails: 'Xehetasunak',
        sectionDetailsEmpty:
          'OpenStreetMap-en ez dago oraindik izen, edukiera, sarbide edo beste eremu ohikorrik leku honetarako.',
        sectionRackType: 'Euskarri mota',
        sectionOtherTags: 'Beste etiketak',
        sectionRawTags: 'Etiketa guztiak (kopiatu)',
        wikiLearnAmenity: 'OSM wiki: amenity=bicycle_parking',
        wikiLearnRackTypes: 'OSM wiki: bicycle_parking motak',
        wikiAttribution:
          'OpenStreetMap wikiaren / Wikimedia Commons-en irudiak (CC BY-SA, egokia denean).',
        rackTypeOsmValue: 'OSM balioa',
        rackTypeNotTagged:
          'OpenStreetMap-ek oraindik ez du bicycle_parking=* motarik elementu honetarako.',
        waveDeprecatedNote:
          'Wikiak stands, rack edo wall_loops erabiltzea gomendatzen du wave ordez.',
        fields: {
          name: 'Izena',
          operator: 'Eragilea',
          capacity: 'Edukiera',
          capacityCargoBike: 'Edukiera (karga-bizikletak)',
          cargoBike: 'Karga-bizikletak',
          covered: 'Estalia',
          indoor: 'Barnekoa',
          access: 'Sarbidea',
          fee: 'Tarifa',
          supervised: 'Gainbegiratua',
          surveillance: 'Zaintza bideoz',
          maxstay: 'Gehienezko egonaldia',
          refVelopark: 'Velopark erreferentzia',
          website: 'Webgunea',
          openingHours: 'Ordutegia',
          note: 'Oharra',
          description: 'Deskribapena',
          source: 'Iturria',
        },
        types: {
          stands:
            'Bizikleta osoa jartzen duzun metalezko euskarria; normalean markoa eta gurpil bat lotu ditzakezu (Sheffield / “grapa” estiloa).',
          wall_loops:
            'Gurpila sartzen den zulo estuak; askotan “gurpil-okertzaile” gisa ezagunak; askotan gurpila bakarrik dago ondo lotuta.',
          rack:
            'Hainbat bizikletarentzako eraketa; wall_loops-en antzekoa, askotan gurpila lotzen du batez ere (“jarraitzaile” estiloa).',
          shed:
            'Hainbat bizikletarentzako estalki itxia; sarbideak gakoa, txartela edo langileak behar izan ditzake (ikus covered / locked).',
          bollard:
            'Bizikleta lotzeko diseinatutako bolardoa; besoak edo eraztunak bizikleta kentzea eragozten dute.',
          wide_stands:
            'Euskarri zabalagoa bi aldeetan aparkatzeko manillarrok gatazkarik gabe (“clip” estiloa).',
          floor:
            'Bizikletentzako markatutako eremua euskarririk gabe; agian ez dago markorako ezer sendorik.',
          safe_loops:
            'Wall_loop hobetua, markoa eta gurpila seguruago lotzeko euskarri gehiagorekin.',
          handlebar_holder:
            'Manilarria eusten du; aparkatzean gurpil bat edo biak lur gainetik egon daitezke.',
          anchors:
            'Lurrean, horman edo zutoin batean txertatutako begi txikia sarraska pasatzeko.',
          informal:
            'Jendeak ohiko erabileran dituen barandilla edo kaleko altzariak; ez da euskarri dedikatua.',
          two_tier:
            'Bi mailatako aparkalekua, bizikleta bat bestearen gainean (tren geltokietan ohikoa).',
          streetpod:
            'Txartel edo modulu itxia; askotan aurreko gurpila inguratzen du segurtasun handiagorako.',
          tree:
            '“Bizikleta zuhaitza” edo aparkatze bertikala apilatua.',
          smart_dock:
            'Partekatutako edo alokairuko bizikletentzako dock-a: aplikazio, txartel edo ordainketarekin desblokeoa; batzuetan karga.',
          arcadia:
            'Kateak edo markorako lotura puntu gehigarriak dituen euskarria (Turvatec Arcadia estiloa).',
          crossbar:
            'Horman aparkatzeko barr bat; askotan ez dago plaza banaketa nabarmenik.',
          rope:
            'Tentsio handiko soka edo kablea markoa eta gurpila lotzeko.',
          wave:
            'Hainbat begidun hodi meandroidea. Wikiak stands, rack edo wall_loops erabiltzea nahiago du.',
          upright_stands:
            'Bizikleta bertikalean edo zintzilik; leku aurrezten du; batzuetan altxatu behar da.',
          lean_and_stick:
            'Bizikleta jartzeko euskarria begi edo klamparekin markorako.',
          saddle_holder:
            'Zelaia eusten du eta atzeko gurpila askotan altxatzen du; bizikleta bertikalean geratzen da.',
          log_with_slots:
            'Zuloak dituen enbor edo habea; gehienbat ordena, lapurrekaren aurkako babes ahula.',
          building:
            'Eraikin bateko barneko aparkalekua; ikusi ordutegia, sarbidea eta gainbegirada.',
          lockers:
            'Bizikleta osoa itxitzen duten taupadak; normalean segurtasun handikoak.',
          ground_slots:
            'Lurrean gurpilerako zuloak; markoa lotzeko egitura gutxi.',
          other:
            'Balio hau ez dago aplikazioko galerian. Ikusi OpenStreetMap wikiaren dokumentazioa.',
        },
      },
      addParkingFlow: {
        step1Title: 'Bizikleta-aparkaleku berria',
        step1Body:
          'Lagundu beste bizikletazaleei: hurrengo urratsean mapan argitaratu aurretik lekuaren oinarrizko xehetasunak gehitu ahal izango dituzu.',
        continue: 'Jarraitu',
        cancel: 'Utzi',
        step2Title: 'Lekuaren xehetasunak',
        step2Body:
          'Hemen izena, lotura mota, argazkiak eta erabilgarritasuna gehitu ahal izango dituzu. Backend-era lotuko dugu geroago.',
        back: 'Atzera',
        submit: 'Argitaratu',
        comingSoon: 'Ekintza hau etorkizuneko eguneraketa batean eskuragarri egongo da.',
      },
      a11y: {
        openProfile: 'Ireki profila',
        bicycleParkingMarker: 'Bizikleta-aparkalekua',
      },
    },
    list: {
      title: 'Gogokoak',
      caption: 'Hemen gogoko gisa markatzen dituzun bizikleta-aparkalekuak ikusiko dituzu.',
    },
    profile: {
      title: 'Profila',
      caption:
        'Backend-a konektatzen dugunean zure kontua hemen ikusi eta editatu ahal izango duzu.',
      openPaywall: 'Lagundu CiclePark',
      premiumActive: 'Supporter modua aktibo dago',
      a11y: {
        back: 'Atzera',
      },
    },
    paywall: {
      title: 'Lagundu CiclePark',
      subtitle: 'Ordainketa bakarra garapena babesteko eta proiektua bizirik mantentzeko.',
      buyCta: 'Supporter desblokeatu - {{price}}',
      restoreCta: 'Erosketak berreskuratu',
      unavailablePrice: '...',
      premiumActive: 'Eskerrik asko CiclePark babesteagatik.',
      footer: 'Erosketak Apple App Store / Google Play bidez kudeatzen dira.',
      features: {
        support: 'Maparen hobekuntzak eta mantentzea finantzatzen lagundu.',
        futureFeatures: 'Etorkizuneko premium abantailetara sarbide goiztiarra.',
        thanks: 'Zure laguntzak app hau independente mantentzen du.',
      },
      supporter: {
        title: 'Supporter zara',
        subtitle:
          'Zure erosketa gailu honetan aktibo dago — eskerrik asko CiclePark babesteagatik.',
        feature1: 'Maparen hobekuntzak eta mantentzea finantzatzen laguntzen ari zara.',
        feature2: 'Supporterrentzako abantaia berriak kaleratzen ditugunean sarbide goiztiarra izango duzu.',
        feature3: 'Zure laguntzak app hau independente mantentzen du.',
        footer:
          'Supporterren onurak zure App Store edo Google Play kontuarekin lotuta gelditzen dira.',
      },
      a11y: {
        back: 'Atzera',
      },
    },
    settings: {
      title: 'Ezarpenak',
      sectionAppearance: 'Itxura',
      sectionLanguage: 'Hizkuntza',
      sectionSupport: 'Laguntza',
      premium: {
        rowTitle: 'Lagundu CiclePark',
        statusActive: 'Aktibo',
        statusInactive: 'Ez aktibo',
      },
      appearance: {
        rowTitle: 'Modu iluna',
        sheetTitle: 'Itxura',
        system: 'Automatikoa',
        light: 'Argia',
        dark: 'Iluna',
      },
      language: {
        rowTitle: 'Hizkuntza',
        sheetTitle: 'Hizkuntza',
        system: 'Automatikoa',
        es: 'Español',
        en: 'English',
        ca: 'Català',
        eu: 'Euskara',
      },
    },
    onboarding: {
      common: {
        progressA11y: '{{current}}. urratsa / {{total}}',
      },
      welcome: {
        kicker: 'Komunitatearen mapa',
        title: 'Ongi etorri',
        body: 'Aurkitu eta partekatu bizikletarako aparkaleku seguruak zure inguruan.',
        continue: 'Hasi',
      },
      language: {
        title: 'Hizkuntza',
        body: 'Aukeratu aplikazioaren hizkuntza. Geroago aldatu ahal izango duzu Ezarpenetan.',
        continue: 'Jarraitu',
      },
      location: {
        title: 'Zure kokapena',
        body:
          'Zure kokapena erabiltzen dugu mapan erakusteko eta inguruko aparkalekuak iradokitzeko. Ukatu baimena eta eskuzko bilaketarekin jarrai dezakezu.',
        allow: 'Baimendu kokapena',
        skip: 'Orain ez',
      },
      notifications: {
        title: 'Jakinarazpenak',
        body:
          'Jakinarazpenak gaitzen badituzu, eremu eta zure jarduerari buruzko eguneraketa lagungarriak bidali ahal dizkizugu. Geroago aldatu dezakezu sistemaren ezarpenetan.',
        allow: 'Baimendu jakinarazpenak',
        skip: 'Orain ez',
      },
      legal: {
        title: 'Baldintzak eta pribatutasuna',
        body: 'Jarraitzeko, irakurri eta ondorengoa onartzen duzula baieztatu.',
        termsLabel: 'Erabilera-baldintzak onartzen ditut',
        privacyLabel: 'Pribatutasun-politika onartzen dut',
        marketingLabel:
          'Aholkuak eta berriak posta edo push bidez jaso nahi ditut (aukerakoa)',
        versionHint: 'Dokumentuen bertsioa: {{version}}',
        finish: 'Sartu CiclePark-era',
        backA11y: 'Atzera',
      },
    },
  },
};
