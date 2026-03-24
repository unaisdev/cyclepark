import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { useLocales } from "expo-localization";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Text, View } from "react-native";
import MapView from "react-native-maps";
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
import { MapViewCanvas } from "./components/MapViewCanvas";
import type { MapFilterId } from "./components/MapHomeFilterChips";
import { MapHomeFilterChips } from "./components/MapHomeFilterChips";
import { MapHomeLocateButton } from "./components/MapHomeLocateButton";
import { AddParkingFlowSheet } from "./components/AddParkingFlowSheet";
import { MapHomeFloatingLoader } from "./components/MapHomeFloatingLoader";
import { MapHomePrimaryCta } from "./components/MapHomePrimaryCta";

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
    gap: theme.layout.space3,
    alignItems: "center",
  },
  overline: {
    ...theme.typography.caption,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: theme.app.textMuted,
    marginBottom: theme.layout.space2,
  },
}));

const USER_LOCATION_ZOOM = { latitudeDelta: 0.012, longitudeDelta: 0.012 };
const SEARCH_RESULT_ZOOM = { latitudeDelta: 0.06, longitudeDelta: 0.06 };
const SEARCH_GEOCODE_DEBOUNCE_MS = 850;
const SEARCH_GEOCODE_MIN_CHARS = 5;
/** Misma duración que `animateToRegion(..., ms)` para no quitar el loader antes de que termine el movimiento. */
const MAP_REGION_ANIMATION_MS = 450;

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
  const geocodeGeneration = useRef(0);
  const [filters, setFilters] = useState<MapFilterId[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showsUserLocation, setShowsUserLocation] = useState(false);
  const [geocodeBusy, setGeocodeBusy] = useState(false);
  const [locateBusy, setLocateBusy] = useState(false);

  const toggleFilter = useCallback((id: MapFilterId) => {
    setFilters((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const tabClearance = FLOATING_TAB_BAR_OFFSET + Math.max(insets.bottom, 8);
  const locateBottom = tabClearance + 56 + theme.layout.space3;
  const topChromeEstimate = insets.top + 140;
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
        mapRef.current?.animateToRegion(
          {
            latitude,
            longitude,
            ...SEARCH_RESULT_ZOOM,
          },
          MAP_REGION_ANIMATION_MS,
        );
        await waitMapRegionAnimation();
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
    [t],
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
        mapRef.current?.animateToRegion(
          {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            ...USER_LOCATION_ZOOM,
          },
          MAP_REGION_ANIMATION_MS,
        );
        await waitMapRegionAnimation();
      } catch {
        Alert.alert(
          t("screens.map.locateErrorTitle"),
          t("screens.map.locateErrorMessage"),
        );
      }
    } finally {
      setLocateBusy(false);
    }
  }, [t]);

  const onAddParkingPress = useCallback(() => {
    addParkingSheetRef.current?.present();
  }, []);

  const onProfilePress = useCallback(() => {
    navigation.navigate("Profile");
  }, [navigation]);

  return (
    <View style={styles.root}>
      <MapViewCanvas
        ref={mapRef}
        isDark={isDark}
        mapPadding={mapPadding}
        showsUserLocation={showsUserLocation}
        systemLocaleKey={systemLocaleKey}
      />

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
        <MapHomeFilterChips selected={filters} onToggle={toggleFilter} />
        <MapHomeFloatingLoader
          visible={geocodeBusy || locateBusy}
          mode={locateBusy ? "locating" : "geocoding"}
        />
      </View>

      <View style={[styles.sideControlsColumn, { bottom: locateBottom }]}>
        <MapHomeLocateButton onPress={onLocatePress} />
        <MapHomePrimaryCta onPress={onAddParkingPress} />
      </View>

      <AddParkingFlowSheet ref={addParkingSheetRef} />
    </View>
  );
}
