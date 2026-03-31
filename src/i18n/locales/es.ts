import type { TranslationResources } from '../TranslationResources';

export const es: TranslationResources = {
  tabs: {
    map: 'Mapa',
    favorites: 'Favoritos',
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
      locateFollowMeHint:
        'Mantén pulsado para que el mapa siga tu posición mientras te mueves.',
      locateFollowMeActiveA11y: 'Siguiendo tu ubicación',
      locateFollowMeStopHint: 'Mantén pulsado para dejar de seguir tu posición.',
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
      mapActivityLoadingParkings: 'Cargando aparcabicis cercanos…',
      osmTooManyNodesHint: 'Haz zoom para descubrir los aparcamientos',
      searchThisArea: 'Buscar en esta zona',
      searchThisAreaA11y: 'Buscar aparcabicis en el área visible del mapa',
      searchThisAreaUnableMessage:
        'No hemos podido leer la vista del mapa. Espera un momento o mueve un poco el mapa e inténtalo de nuevo.',
      mapTypePickerA11y: 'Tipo de mapa. Toca para mostrar u ocultar el estilo del mapa.',
      mapTypeStandard: 'Mapa',
      mapTypeSatellite: 'Satélite',
      mapTypeHybrid: 'Híbrido',
      mapTypeTerrain: 'Relieve',
      addParking: 'Añadir aparcamiento',
      parkingDetailSheetTitle: 'Aparcabicis',
      parkingDetailSheetHint:
        'Datos de la comunidad en OpenStreetMap. Abajo: campos legibles, tipo de aparcamiento (con fotos de la wiki si hay), y todas las etiquetas en texto plano.',
      parkingDetailClose: 'Cerrar',
      parkingDetail: {
        sectionDetails: 'Detalles',
        sectionDetailsEmpty:
          'Aún no hay nombre, capacidad, acceso u otros campos habituales en OpenStreetMap para este sitio.',
        sectionRackType: 'Tipo de soporte',
        sectionOtherTags: 'Otras etiquetas',
        sectionRawTags: 'Todas las etiquetas (copiar)',
        wikiLearnAmenity: 'Wiki OSM: amenity=bicycle_parking',
        wikiLearnRackTypes: 'Wiki OSM: tipos bicycle_parking',
        wikiAttribution:
          'Ilustraciones de la wiki de OpenStreetMap / Wikimedia Commons (CC BY-SA cuando aplique).',
        rackTypeOsmValue: 'Valor en OSM',
        rackTypeNotTagged:
          'OpenStreetMap aún no incluye un tipo bicycle_parking=* para este aparcamiento.',
        waveDeprecatedNote:
          'La wiki recomienda usar stands, rack o wall_loops en lugar de wave.',
        fields: {
          name: 'Nombre',
          operator: 'Operador',
          capacity: 'Capacidad',
          capacityCargoBike: 'Capacidad (bicis de carga)',
          cargoBike: 'Bicis de carga',
          covered: 'Cubierto',
          indoor: 'Interior',
          access: 'Acceso',
          fee: 'Tarifa',
          supervised: 'Vigilado',
          surveillance: 'Videovigilancia',
          maxstay: 'Tiempo máximo',
          refVelopark: 'Ref. Velopark',
          website: 'Web',
          openingHours: 'Horario',
          note: 'Nota',
          description: 'Descripción',
          source: 'Fuente',
        },
        types: {
          stands:
            'Soporte metálico contra el que apoyas la bicicleta entera; sueles poder candar cuadro y rueda (tipo Sheffield / “grapa”).',
          wall_loops:
            'Ranuras estrechas para la rueda; a veces llamados “doblaruedas”; a menudo solo la rueda queda bien sujeta.',
          rack:
            'Aparcabicis para varias bicis; parecido a wall_loops, muchas veces sujeta sobre todo la rueda (tipo “percha”).',
          shed:
            'Cobertizo cerrado para muchas bicis; el acceso puede requerir llave, tarjeta o personal (ver también covered / locked).',
          bollard:
            'Bolardo pensado para candar; brazos o anillos impiden levantar la bici del poste.',
          wide_stands:
            'Soporte más ancho para aparcar a dos lados sin que choquen los manillares (estilo “clip”).',
          floor:
            'Zona señalizada para bicis sin soporte; puede no haber nada sólido para el cuadro.',
          safe_loops:
            'Variante mejorada del wall_loop con más apoyo para candar cuadro y rueda con más seguridad.',
          handlebar_holder:
            'Sujeta el manillar; una o dos ruedas pueden quedar en el aire al aparcar.',
          anchors:
            'Anclaje pequeño en suelo o pared (o poste) por el que pasas el candado.',
          informal:
            'Barandillas u mobiliario urbano que la gente usa de forma habitual; no es un soporte dedicado.',
          two_tier:
            'Aparcabicis en dos alturas, una bici encima de otra (frecuente en estaciones).',
          streetpod:
            'Módulo tipo caseta o taquilla; a menudo encierra la rueda delantera para más seguridad.',
          tree:
            '“Árbol” o sistema vertical de aparcamiento apilado.',
          smart_dock:
            'Base para bici compartida o alquiler: desbloqueo con app, tarjeta o pago; a veces recarga.',
          arcadia:
            'Soporte con cadenas o puntos extra para el cuadro (estilo Turvatec Arcadia).',
          crossbar:
            'Barra en pared pensada para aparcar; puede no haber plazas marcadas.',
          rope:
            'Cuerda o cable tenso al que puedes candar cuadro y rueda.',
          wave:
            'Tubo serpenteante con varios bucles. La wiki prefiere etiquetar como stands, rack o wall_loops.',
          upright_stands:
            'La bici queda vertical o colgada; ahorra espacio; puede hacer falta levantarla.',
          lean_and_stick:
            'Soporte en L con argolla o pinza para el cuadro además de apoyar la bici.',
          saddle_holder:
            'Soporta el sillín y suele levantar la rueda trasera; la bici queda más o menos vertical.',
          log_with_slots:
            'Tronco o viga con ranuras; sobre todo orden, poca protección ante robo.',
          building:
            'Aparcamiento en un edificio; revisa horario, acceso y vigilancia.',
          lockers:
            'Taquillas que cierran la bici entera; suelen ser muy seguras.',
          ground_slots:
            'Ranuras en el suelo para la rueda; poca estructura para candar el cuadro.',
          other:
            'Este valor no está en la galería de la app. Consulta la wiki de OpenStreetMap.',
        },
      },
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
        bicycleParkingMarker: 'Aparcabicis',
      },
    },
    list: {
      title: 'Favoritos',
      caption: 'Aquí verás los aparcabicis que marques como favoritos.',
    },
    profile: {
      title: 'Perfil',
      caption: 'Aquí podrás ver y editar tu cuenta cuando conectemos el backend.',
      openPaywall: 'Apoyar CiclePark',
      premiumActive: 'Modo supporter activo',
      a11y: {
        back: 'Volver',
      },
    },
    paywall: {
      title: 'Apoyar CiclePark',
      subtitle: 'Compra única para apoyar el desarrollo y mantener vivo el proyecto.',
      buyCta: 'Desbloquear supporter - {{price}}',
      restoreCta: 'Restaurar compras',
      unavailablePrice: '...',
      premiumActive: 'Gracias por apoyar CiclePark.',
      footer: 'Las compras se gestionan con Apple App Store / Google Play.',
      features: {
        support: 'Ayuda a financiar mejoras y mantenimiento del mapa.',
        futureFeatures: 'Acceso anticipado a ventajas premium futuras.',
        thanks: 'Tu apoyo mantiene esta app independiente.',
      },
      supporter: {
        title: 'Eres supporter',
        subtitle: 'Tu compra está activa en este dispositivo — gracias por apoyar CiclePark.',
        feature1: 'Estás ayudando a financiar mejoras y mantenimiento del mapa.',
        feature2: 'Tendrás acceso anticipado cuando añadamos nuevas ventajas para supporters.',
        feature3: 'Tu apoyo mantiene esta app independiente.',
        footer: 'Las ventajas de supporter quedan asociadas a tu cuenta de App Store o Google Play.',
      },
      a11y: {
        back: 'Volver',
      },
    },
    settings: {
      title: 'Ajustes',
      sectionAppearance: 'Apariencia',
      sectionLanguage: 'Idioma',
      sectionSupport: 'Apoyo',
      premium: {
        rowTitle: 'Apoyar CiclePark',
        statusActive: 'Activo',
        statusInactive: 'No activo',
      },
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
        eu: 'Euskara',
      },
    },
    onboarding: {
      common: {
        progressA11y: 'Paso {{current}} de {{total}}',
      },
      welcome: {
        kicker: 'Mapa colaborativo',
        title: 'Bienvenido',
        body: 'Encuentra y comparte aparcamientos seguros para bicicleta cerca de ti.',
        continue: 'Empezar',
      },
      language: {
        title: 'Idioma',
        body: 'Elige el idioma de la aplicación. Podrás cambiarlo después en Ajustes.',
        continue: 'Continuar',
      },
      location: {
        title: 'Tu ubicación',
        body:
          'Usamos tu ubicación para mostrarte en el mapa y sugerir aparcamientos cercanos. Puedes denegar el permiso y seguir usando la app con búsqueda manual.',
        allow: 'Permitir ubicación',
        skip: 'Ahora no',
      },
      notifications: {
        title: 'Avisos',
        body:
          'Si activas las notificaciones, podremos avisarte de novedades útiles sobre zonas y tu actividad. Puedes cambiarlo más tarde en los ajustes del sistema.',
        allow: 'Permitir avisos',
        skip: 'Ahora no',
      },
      legal: {
        title: 'Términos y privacidad',
        body: 'Para continuar, confirma que has leído y aceptas lo siguiente.',
        termsLabel: 'Acepto los términos y condiciones de uso',
        privacyLabel: 'Acepto la política de privacidad',
        marketingLabel: 'Quiero recibir novedades y consejos por correo o push (opcional)',
        versionHint: 'Versión de los documentos: {{version}}',
        finish: 'Entrar en CiclePark',
        backA11y: 'Volver',
      },
    },
  },
};
