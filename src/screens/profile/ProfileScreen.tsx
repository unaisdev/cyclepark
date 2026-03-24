import { ChevronLeft } from "lucide-react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";

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
    marginBottom: theme.layout.space4,
  },
  backHit: {
    paddingVertical: theme.layout.space2,
    paddingRight: theme.layout.space3,
    marginLeft: -theme.layout.space1,
  },
  title: {
    ...theme.typography.titleLarge,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space2,
  },
  caption: {
    ...theme.typography.body,
    color: theme.app.textSecondary,
  },
}));

type ProfileNav = NativeStackNavigationProp<RootStackParamList, "Profile">;

export function ProfileScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const navigation = useNavigation<ProfileNav>();
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
      <Text style={styles.title}>{t("screens.profile.title")}</Text>
      <Text style={styles.caption}>{t("screens.profile.caption")}</Text>
    </View>
  );
}
