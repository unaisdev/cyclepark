import { ChevronLeft, HeartHandshake } from "lucide-react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { mapHomeChrome } from "../map/mapHomeTheme";
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
  supporterCard: {
    borderRadius: theme.layout.radiusLg,
    overflow: "hidden",
    backgroundColor: theme.feedback.successContainer,
    ...mapHomeChrome.ambientShadow,
    paddingVertical: theme.layout.space4,
    paddingHorizontal: theme.layout.space4,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.layout.space3,
  },
  supporterIconWrap: {
    width: 48,
    height: 48,
    borderRadius: theme.layout.radiusMd,
    alignItems: "center",
    justifyContent: "center",
  },
  supporterTextBlock: {
    flex: 1,
    minWidth: 0,
    gap: theme.layout.space2,
  },
  supporterTitle: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.feedback.successOnContainer,
  },
  supporterBody: {
    ...theme.typography.caption,
    lineHeight: 20,
    color: theme.feedback.successOnContainer,
    opacity: 0.92,
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
  const iconTileBg = `${theme.feedback.success}22`;

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
      {isPremium ? (
        <View
          style={styles.supporterCard}
          accessible
          accessibilityRole="text"
          accessibilityLabel={t("screens.profile.a11y.supporterCard")}
        >
          <View style={[styles.supporterIconWrap, { backgroundColor: iconTileBg }]}>
            <HeartHandshake size={24} color={theme.feedback.success} strokeWidth={2} />
          </View>
          <View style={styles.supporterTextBlock}>
            <Text style={styles.supporterTitle}>{t("screens.profile.supporterThankYouTitle")}</Text>
            <Text style={styles.supporterBody}>{t("screens.profile.supporterThankYouBody")}</Text>
          </View>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("screens.profile.openPaywall")}
          onPress={() => navigation.navigate("Paywall")}
          style={({ pressed }) => [styles.ctaButton, pressed && { opacity: 0.92 }]}
        >
          <Text style={styles.ctaLabel}>{t("screens.profile.openPaywall")}</Text>
        </Pressable>
      )}
    </View>
  );
}
