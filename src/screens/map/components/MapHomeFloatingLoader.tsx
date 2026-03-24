import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { mapHomeChrome } from "../mapHomeTheme";

const styles = StyleSheet.create((theme) => ({
  wrap: {
    marginTop: theme.layout.space3,
    alignSelf: "center",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.layout.space2,
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space4,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    ...mapHomeChrome.ambientShadow,
  },
  label: {
    ...theme.typography.caption,
    color: theme.app.textSecondary,
    flexShrink: 1,
  },
}));

export type MapHomeFloatingLoaderProps = {
  visible: boolean;
  /** Qué mensaje mostrar si hay varias acciones; `locating` tiene prioridad sobre geocodificación. */
  mode: "geocoding" | "locating";
};

export function MapHomeFloatingLoader({ visible, mode }: MapHomeFloatingLoaderProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  if (!visible) {
    return null;
  }

  const label =
    mode === "locating"
      ? t("screens.map.mapActivityLocating")
      : t("screens.map.mapActivityGeocoding");

  return (
    <View
      style={styles.wrap}
      accessibilityLiveRegion="polite"
      accessibilityRole="progressbar"
      accessibilityLabel={label}
    >
      <ActivityIndicator size="small" color={theme.app.primary} />
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}
