import { ChevronLeft } from "lucide-react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { useBillingStore } from "../../stores/billingStore";

const ICON = 28;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
    paddingHorizontal: theme.layout.space4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.layout.space2,
    marginBottom: theme.layout.space2,
  },
  backHit: {
    paddingVertical: theme.layout.space2,
    paddingRight: theme.layout.space3,
    marginLeft: -theme.layout.space1,
  },
  title: {
    ...theme.typography.screenLargeTitle,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space2,
  },
  caption: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
    marginBottom: theme.layout.space4,
  },
  ctaButton: {
    minHeight: 48,
    borderRadius: theme.layout.radiusLg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.layout.space4,
    backgroundColor: theme.app.primary,
  },
  ctaLabel: {
    ...theme.typography.label,
    color: theme.app.onPrimary,
  },
  premiumBadge: {
    ...theme.typography.caption,
    color: theme.app.primary,
    marginTop: theme.layout.space3,
  },
}));

type ProfileNav = NativeStackNavigationProp<RootStackParamList, "Profile">;

export function ProfileScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const navigation = useNavigation<ProfileNav>();
  const isPremium = useBillingStore((s) => s.isPremium);
  const ink = theme.app.textPrimary;

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.headerRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("screens.profile.a11y.back")}
          onPress={onBack}
          style={({ pressed }) => [styles.backHit, pressed && { opacity: 0.55 }]}
        >
          <ChevronLeft size={ICON} color={ink} strokeWidth={2} />
        </Pressable>
      </View>
      <Text style={styles.title} accessibilityRole="header">
        {t("screens.profile.title")}
      </Text>
      <Text style={styles.caption}>{t("screens.profile.caption")}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("screens.profile.openPaywall")}
        onPress={() => navigation.navigate("Paywall")}
        style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.92 }]}
      >
        <Text style={styles.ctaLabel}>{t("screens.profile.openPaywall")}</Text>
      </Pressable>
      {isPremium ? <Text style={styles.premiumBadge}>{t("screens.profile.premiumActive")}</Text> : null}
    </View>
  );
}
