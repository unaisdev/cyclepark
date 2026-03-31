import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { useLocales } from "expo-localization";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import MapView, { Marker, type Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from "react-native-unistyles";
import { MapSearchBar } from "../../components/organisms/MapSearchBar";
import { FLOATING_TAB_BAR_OFFSET } from "../../navigation/FloatingTabBar";
import type {
  RootStackParamList,
  RootTabParamList,
} from "../../navigation/types";
import { MapHomeMapTypeControl } from "./components/MapHomeMapTypeControl";
import { MapViewCanvas } from "./components/MapViewCanvas";
import type { MapFilterId } from "./components/MapHomeFilterChips";
import { MapHomeFilterChips } from "./components/MapHomeFilterChips";
import { MapHomeLocateButton } from "./components/MapHomeLocateButton";
import { AddParkingFlowSheet } from "./components/AddParkingFlowSheet";
import { BicycleParkingDetailSheet } from "./components/BicycleParkingDetailSheet";
import { MapHomeFloatingLoader } from "./components/MapHomeFloatingLoader";
import { MapHomePrimaryCta } from "./components/MapHomePrimaryCta";
import {
  isOpenStreetMapTooManyNodesError,
  isValidOsmMapBoundingBox,
  osmQueryBBoxFromVisibleRegion,
  regionFromMapBoundaries,
  useBicycleParkingsInBBoxQuery,
  type BicycleParkingOsmFeature,
  type OsmMapBoundingBox,
} from "../../api/openstreetmap";
import { useSettingsStore } from "../../stores/settingsStore";
import { mapHomeChrome } from "./mapHomeTheme";
import {
  clampMapRegionToOsmMaxSpan,
  mapRegionExceedsOsmApiMaxSpan,
} from "./utils/clampMapRegionToOsmMaxSpan";

/** 96×96 PNG, máscara circular en píxeles (sin vistas hijas: evita recortes de Google Maps). */
const BICYCLE_PARKING_MARKER_MAP = require("../../../assets/bicycle-parking-marker-map.png");

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
  },
  topOverlay: {
    position: "absolute",
    left: theme.layout.space4,
    right: theme.layout.space4,
    zIndex: 2,
  },
  sideControlsColumn: {
    position: "absolute",
    right: theme.layout.space4,
    zIndex: 2,
    flexDirection: "column",
    gap: theme.layout.space2,
    alignItems: "center",
  },
  mapTypeControlSlot: {
    position: "absolute",
    left: theme.layout.space4,
    zIndex: 2,
  },
  overline: {
    ...theme.typography.caption,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: theme.app.textMuted,
    marginBottom: theme.layout.space2,
  },
  osmZoomHint: {
    marginTop: theme.layout.space3,
    alignSelf: "center",
    maxWidth: "100%",
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space4,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    ...mapHomeChrome.ambientShadow,
  },
  osmZoomHintText: {
    ...theme.typography.caption,
    color: theme.app.textSecondary,
    textAlign: "center",
  },
  searchThisAreaPressable: {
    marginTop: theme.layout.space3,
    alignSelf: "center",
    maxWidth: "100%",
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space4,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    ...mapHomeChrome.ambientShadow,
  },
  searchThisAreaLabel: {
    ...theme.typography.label,
    color: theme.app.primary,
    textAlign: "center",
    fontWeight: "600",
  },
}));

const USER_LOCATION_ZOOM = { latitudeDelta: 0.012, longitudeDelta: 0.012 };
const FOLLOW_ME_MAP_ANIM_MS = 280;
/** Actualización GPS mientras «sígueme» está activo (menos saltos que cada fix). */
const FOLLOW_ME_WATCH_OPTIONS: Location.LocationOptions = {
  accuracy: Location.Accuracy.Balanced,
  distanceInterval: 12,
  timeInterval: 2500,
};
const SEARCH_RESULT_ZOOM = { latitudeDelta: 0.06, longitudeDelta: 0.06 };
const SEARCH_GEOCODE_DEBOUNCE_MS = 850;
const SEARCH_GEOCODE_MIN_CHARS = 5;
/** Misma duración que `animateToRegion(..., ms)` para no quitar el loader antes de que termine el movimiento. */
const MAP_REGION_ANIMATION_MS = 450;
/** Al salir del zoom máximo OSM, recentrar sin animación larga (evita bucles con `onRegionChangeComplete`). */
const MAP_REGION_CLAMP_ANIM_MS = 120;
/** Ocultar chips de filtro bajo el buscador (poner en `true` para mostrarlos de nuevo). */
const SHOW_MAP_HOME_FILTER_CHIPS = false;

function filterBikeParkingsByChips(
  items: BicycleParkingOsmFeature[],
  selected: MapFilterId[],
): BicycleParkingOsmFeature[] {
  if (selected.length === 0) return items;
  return items.filter((p) => {
    if (selected.includes("covered") && p.tags.covered !== "yes") return false;
    if (selected.includes("available")) {
      const access = p.tags.access;
      if (access === "private" || access === "no") return false;
    }
    return true;
  });
}

const waitMapRegionAnimation = () =>
  new Promise<void>((resolve) => setTimeout(resolve, MAP_REGION_ANIMATION_MS));

type MapScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "Map">,
  NativeStackNavigationProp<RootStackParamList>
>;

export function MapScreen() {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const { t } = useTranslation();
  const systemLocaleKey = useLocales()[0]?.languageTag ?? "und";
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const addParkingSheetRef = useRef<BottomSheetModalMethods>(null);
  const parkingDetailSheetRef = useRef<BottomSheetModalMethods>(null);
  const geocodeGeneration = useRef(0);
  const followWatchRef = useRef<Location.LocationSubscription | null>(null);
  const [filters, setFilters] = useState<MapFilterId[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showsUserLocation, setShowsUserLocation] = useState(false);
  const [followMeActive, setFollowMeActive] = useState(false);
  const [geocodeBusy, setGeocodeBusy] = useState(false);
  const [locateBusy, setLocateBusy] = useState(false);
  /** Bbox de la última pulsación en «Buscar en esta zona» (no se actualiza al mover el mapa). */
  const [activeOsmBBox, setActiveOsmBBox] = useState<OsmMapBoundingBox | null>(null);
  const [detailParking, setDetailParking] =
    useState<BicycleParkingOsmFeature | null>(null);
  const mapHomeMapType = useSettingsStore((s) => s.mapHomeMapType);
  const setMapHomeMapType = useSettingsStore((s) => s.setMapHomeMapType);
  const latestViewportRegionRef = useRef<Region | null>(null);
  /** Primera carga OSM tras `onMapReady` (evita depender solo del botón). Se resetea si cambia el idioma del mapa. */
  const didAutoOsmSearchOnReadyRef = useRef(false);

  const toggleFilter = useCallback((id: MapFilterId) => {
    setFilters((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const tabClearance = FLOATING_TAB_BAR_OFFSET + Math.max(insets.bottom, 8);
  const locateBottom = tabClearance + theme.layout.space2;
  const topChromeEstimate =
    insets.top + (SHOW_MAP_HOME_FILTER_CHIPS ? 140 : 96);
  const isDark = UnistylesRuntime.themeName === "dark";

  const mapPadding = useMemo(
    () => ({
      top: topChromeEstimate,
      bottom: tabClearance + theme.layout.space2,
      left: theme.layout.space2,
      right: theme.layout.space2,
    }),
    [topChromeEstimate, tabClearance, theme.layout.space2],
  );

  const stopFollowMe = useCallback(() => {
    followWatchRef.current?.remove();
    followWatchRef.current = null;
    setFollowMeActive(false);
  }, []);

  useEffect(() => {
    return () => {
      followWatchRef.current?.remove();
      followWatchRef.current = null;
    };
  }, []);

  useEffect(() => {
    didAutoOsmSearchOnReadyRef.current = false;
  }, [systemLocaleKey]);

  const onMapRegionChangeComplete = useCallback(
    (region: Region, details?: { isGesture?: boolean }) => {
      if (Platform.OS === "web") return;
      if (followMeActive && details?.isGesture === true) {
        stopFollowMe();
      }
      if (mapRegionExceedsOsmApiMaxSpan(region)) {
        mapRef.current?.animateToRegion(
          clampMapRegionToOsmMaxSpan(region),
          MAP_REGION_CLAMP_ANIM_MS,
        );
        return;
      }
      latestViewportRegionRef.current = region;
    },
    [followMeActive, stopFollowMe],
  );

  const applySearchThisArea = useCallback((region: Region) => {
    const bbox = osmQueryBBoxFromVisibleRegion(region);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log("[CiclePark OSM] search this area", {
        region,
        bbox,
        bboxValid: bbox != null && isValidOsmMapBoundingBox(bbox),
      });
    }
    if (bbox == null) {
      Alert.alert(
        t("screens.map.searchThisArea"),
        t("screens.map.searchThisAreaUnableMessage"),
      );
      return;
    }
    setActiveOsmBBox(bbox);
  }, [t]);

  const onSearchThisAreaPress = useCallback(() => {
    if (Platform.OS === "web") return;
    const fromRef = latestViewportRegionRef.current;
    if (fromRef != null) {
      applySearchThisArea(fromRef);
      return;
    }
    const map = mapRef.current;
    if (!map) return;
    void map
      .getMapBoundaries()
      .then((b) => {
        const region = regionFromMapBoundaries(b);
        latestViewportRegionRef.current = region;
        applySearchThisArea(region);
      })
      .catch(() => {});
  }, [applySearchThisArea]);

  const onMapReady = useCallback(() => {
    if (Platform.OS === "web") return;
    const map = mapRef.current;
    if (!map) return;
    void map
      .getMapBoundaries()
      .then((b) => {
        const region = regionFromMapBoundaries(b);
        latestViewportRegionRef.current = region;
        if (!didAutoOsmSearchOnReadyRef.current) {
          didAutoOsmSearchOnReadyRef.current = true;
          applySearchThisArea(region);
        }
      })
      .catch(() => {});
  }, [applySearchThisArea]);

  const {
    data: osmBikeParkings = [],
    isFetching: osmBikeParkingsFetching,
    error: osmBikeParkingsError,
    isPending: osmBikeParkingsPending,
    fetchStatus: osmBikeParkingsFetchStatus,
  } = useBicycleParkingsInBBoxQuery({
    bbox: Platform.OS === "web" ? null : activeOsmBBox,
  });

  const visibleBikeParkings = useMemo(
    () => filterBikeParkingsByChips(osmBikeParkings, filters),
    [filters, osmBikeParkings],
  );

  useEffect(() => {
    if (!__DEV__) return;
    const bbox = Platform.OS === "web" ? null : activeOsmBBox;
    const bboxOk = bbox != null && isValidOsmMapBoundingBox(bbox);
    // eslint-disable-next-line no-console
    console.log("[CiclePark OSM] query + markers", {
      platform: Platform.OS,
      activeBbox: bbox,
      queryEnabled: Platform.OS !== "web" && bboxOk,
      isPending: osmBikeParkingsPending,
      isFetching: osmBikeParkingsFetching,
      fetchStatus: osmBikeParkingsFetchStatus,
      rawParkingCount: osmBikeParkings.length,
      visibleMarkerCount: visibleBikeParkings.length,
      filterChipCount: filters.length,
      error: osmBikeParkingsError
        ? osmBikeParkingsError instanceof Error
          ? osmBikeParkingsError.message
          : String(osmBikeParkingsError)
        : null,
    });
  }, [
    activeOsmBBox,
    filters.length,
    osmBikeParkings.length,
    visibleBikeParkings.length,
    osmBikeParkingsPending,
    osmBikeParkingsFetching,
    osmBikeParkingsFetchStatus,
    osmBikeParkingsError,
  ]);

  const flyToGeocodedQuery = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q || Platform.OS === "web") return;

      setGeocodeBusy(true);
      const gen = ++geocodeGeneration.current;
      try {
        const results = await Location.geocodeAsync(q);
        if (gen !== geocodeGeneration.current) return;
        if (results.length === 0) {
          Alert.alert(
            t("screens.map.searchGeocodeNotFoundTitle"),
            t("screens.map.searchGeocodeNotFoundMessage"),
          );
          return;
        }
        const { latitude, longitude } = results[0];
        const targetRegion: Region = {
          latitude,
          longitude,
          ...SEARCH_RESULT_ZOOM,
        };
        mapRef.current?.animateToRegion(targetRegion, MAP_REGION_ANIMATION_MS);
        await waitMapRegionAnimation();
        latestViewportRegionRef.current = targetRegion;
        applySearchThisArea(targetRegion);
      } catch {
        if (gen !== geocodeGeneration.current) return;
        Alert.alert(
          t("screens.map.searchGeocodeErrorTitle"),
          t("screens.map.searchGeocodeErrorMessage"),
        );
      } finally {
        if (gen === geocodeGeneration.current) {
          setGeocodeBusy(false);
        }
      }
    },
    [applySearchThisArea, t],
  );

  useEffect(() => {
    if (Platform.OS === "web") return;
    const q = searchQuery.trim();
    if (q.length < SEARCH_GEOCODE_MIN_CHARS) return;
    const handle = setTimeout(() => {
      void flyToGeocodedQuery(searchQuery);
    }, SEARCH_GEOCODE_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [searchQuery, flyToGeocodedQuery]);

  const onSearchSubmit = useCallback(() => {
    void flyToGeocodedQuery(searchQuery);
  }, [flyToGeocodedQuery, searchQuery]);

  const onLocatePress = useCallback(async () => {
    if (Platform.OS === "web") return;

    setLocateBusy(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("screens.map.locatePermissionTitle"),
          t("screens.map.locatePermissionDenied"),
        );
        return;
      }

      setShowsUserLocation(true);

      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const targetRegion: Region = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          ...USER_LOCATION_ZOOM,
        };
        mapRef.current?.animateToRegion(targetRegion, MAP_REGION_ANIMATION_MS);
        await waitMapRegionAnimation();
        latestViewportRegionRef.current = targetRegion;
        applySearchThisArea(targetRegion);
      } catch {
        Alert.alert(
          t("screens.map.locateErrorTitle"),
          t("screens.map.locateErrorMessage"),
        );
      }
    } finally {
      setLocateBusy(false);
    }
  }, [applySearchThisArea, t]);

  const onLocateLongPress = useCallback(async () => {
    if (Platform.OS === "web") return;

    if (followMeActive) {
      stopFollowMe();
      return;
    }

    setLocateBusy(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("screens.map.locatePermissionTitle"),
          t("screens.map.locatePermissionDenied"),
        );
        return;
      }

      setShowsUserLocation(true);
      followWatchRef.current?.remove();

      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        mapRef.current?.animateToRegion(
          {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            ...USER_LOCATION_ZOOM,
          },
          MAP_REGION_ANIMATION_MS,
        );
      } catch {
        Alert.alert(
          t("screens.map.locateErrorTitle"),
          t("screens.map.locateErrorMessage"),
        );
      }

      followWatchRef.current = await Location.watchPositionAsync(
        FOLLOW_ME_WATCH_OPTIONS,
        (location) => {
          mapRef.current?.animateToRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              ...USER_LOCATION_ZOOM,
            },
            FOLLOW_ME_MAP_ANIM_MS,
          );
        },
      );
      setFollowMeActive(true);
    } catch {
      Alert.alert(
        t("screens.map.locateErrorTitle"),
        t("screens.map.locateErrorMessage"),
      );
    } finally {
      setLocateBusy(false);
    }
  }, [followMeActive, stopFollowMe, t]);

  const onAddParkingPress = useCallback(() => {
    addParkingSheetRef.current?.present();
  }, []);

  const onParkingMarkerPress = useCallback((p: BicycleParkingOsmFeature) => {
    setDetailParking({ ...p, tags: { ...p.tags } });
  }, []);

  useLayoutEffect(() => {
    if (detailParking != null) {
      parkingDetailSheetRef.current?.present();
    }
  }, [detailParking]);

  const onParkingDetailDismiss = useCallback(() => {
    setDetailParking(null);
  }, []);

  const onProfilePress = useCallback(() => {
    navigation.navigate("Profile");
  }, [navigation]);

  const showOsmLoader =
    Platform.OS !== "web" &&
    osmBikeParkingsFetching &&
    activeOsmBBox != null;

  const showOsmTooManyNodesHint =
    Platform.OS !== "web" &&
    activeOsmBBox != null &&
    isOpenStreetMapTooManyNodesError(osmBikeParkingsError);

  const showMapChromeLoader = geocodeBusy || locateBusy || showOsmLoader;
  const showSearchThisAreaCta =
    Platform.OS !== "web" && !showMapChromeLoader;

  const mapActivityMode =
    locateBusy ? "locating" : geocodeBusy ? "geocoding" : "loadingParkings";

  return (
    <View style={styles.root}>
      <MapViewCanvas
        ref={mapRef}
        isDark={isDark}
        mapPadding={mapPadding}
        mapType={mapHomeMapType}
        showsUserLocation={showsUserLocation}
        systemLocaleKey={systemLocaleKey}
        onRegionChangeComplete={onMapRegionChangeComplete}
        onMapReady={onMapReady}
      >
        {Platform.OS !== "web"
          ? visibleBikeParkings.map((p) => (
              <Marker
                key={`${p.osmType}-${p.id}`}
                coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                image={BICYCLE_PARKING_MARKER_MAP}
                anchor={{ x: 0.5, y: 0.5 }}
                accessibilityLabel={t("screens.map.a11y.bicycleParkingMarker")}
                onPress={() => onParkingMarkerPress(p)}
              />
            ))
          : null}
      </MapViewCanvas>

      <View style={[styles.topOverlay, { top: insets.top + 8 }]}>
        <Text style={styles.overline}>{t("screens.map.liveMapOverline")}</Text>
        <MapSearchBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={onSearchSubmit}
          searchPlaceholder={t("screens.map.searchPlaceholder")}
          profileA11yLabel={t("screens.map.a11y.openProfile")}
          onProfilePress={onProfilePress}
        />
        {SHOW_MAP_HOME_FILTER_CHIPS ? (
          <MapHomeFilterChips selected={filters} onToggle={toggleFilter} />
        ) : null}
        {showMapChromeLoader ? (
          <MapHomeFloatingLoader visible mode={mapActivityMode} />
        ) : null}
        {showSearchThisAreaCta ? (
          <Pressable
            onPress={onSearchThisAreaPress}
            style={({ pressed }) => [
              styles.searchThisAreaPressable,
              pressed ? { opacity: 0.88 } : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel={t("screens.map.searchThisAreaA11y")}
          >
            <Text style={styles.searchThisAreaLabel}>
              {t("screens.map.searchThisArea")}
            </Text>
          </Pressable>
        ) : null}
        {showOsmTooManyNodesHint ? (
          <View
            style={styles.osmZoomHint}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            <Text style={styles.osmZoomHintText}>
              {t("screens.map.osmTooManyNodesHint")}
            </Text>
          </View>
        ) : null}
      </View>

      {Platform.OS !== "web" ? (
        <View style={[styles.mapTypeControlSlot, { bottom: locateBottom }]}>
          <MapHomeMapTypeControl
            value={mapHomeMapType}
            onChange={setMapHomeMapType}
          />
        </View>
      ) : null}

      <View style={[styles.sideControlsColumn, { bottom: locateBottom }]}>
        <MapHomeLocateButton
          onPress={onLocatePress}
          onLongPress={() => {
            void onLocateLongPress();
          }}
          followMeActive={followMeActive}
        />
        <MapHomePrimaryCta onPress={onAddParkingPress} />
      </View>

      <AddParkingFlowSheet ref={addParkingSheetRef} />
      <BicycleParkingDetailSheet
        ref={parkingDetailSheetRef}
        parking={detailParking}
        onDismiss={onParkingDetailDismiss}
      />
    </View>
  );
}
