import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BadgeCheck, ChevronLeft, Gift, Heart, Leaf, MapPinned, Sparkles } from 'lucide-react-native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { RootStackParamList } from '../../navigation/types';
import { PRIMARY_SUPPORTER_SKU, useBillingStore } from '../../stores/billingStore';
import { mapHomeChrome } from '../map/mapHomeTheme';
import { PaywallFeatureRow } from './components/PaywallFeatureRow';
import { PaywallHeader } from './components/PaywallHeader';
import { PurchaseButtons } from './components/PurchaseButtons';

const ICON = 28;

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
    paddingHorizontal: theme.layout.space4,
  },
  backHit: {
    alignSelf: 'flex-start',
    paddingVertical: theme.layout.space2,
    paddingRight: theme.layout.space3,
    marginLeft: -theme.layout.space1,
  },
  card: {
    marginTop: theme.layout.space4,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.feedback.successContainer,
    padding: theme.layout.space4,
    gap: theme.layout.space4,
    borderWidth: 1,
    borderColor: theme.feedback.success,
    ...mapHomeChrome.ambientShadow,
  },
  actions: {
    marginTop: theme.layout.space4,
  },
  status: {
    ...theme.typography.caption,
    color: theme.app.textSecondary,
    marginTop: theme.layout.space3,
  },
  error: {
    ...theme.typography.caption,
    color: theme.feedback.errorOnContainer,
    marginTop: theme.layout.space2,
  },
}));

type PaywallNav = NativeStackNavigationProp<RootStackParamList, 'Paywall'>;

export function PaywallScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const navigation = useNavigation<PaywallNav>();
  const products = useBillingStore((s) => s.products);
  const isLoading = useBillingStore((s) => s.isLoading);
  const isPremium = useBillingStore((s) => s.isPremium);
  const lastError = useBillingStore((s) => s.lastError);
  const loadProducts = useBillingStore((s) => s.loadProducts);
  const purchase = useBillingStore((s) => s.purchase);
  const restore = useBillingStore((s) => s.restore);

  useEffect(() => {
    if (isPremium) return;
    if (products.length === 0) {
      void loadProducts();
    }
  }, [isPremium, loadProducts, products.length]);

  const product = products.find((entry) => entry.id === PRIMARY_SUPPORTER_SKU);
  const priceLabel = product?.displayPrice ?? t('screens.paywall.unavailablePrice');

  const headerTitle = isPremium ? t('screens.paywall.supporter.title') : t('screens.paywall.title');
  const headerSubtitle = isPremium ? t('screens.paywall.supporter.subtitle') : t('screens.paywall.subtitle');

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('screens.paywall.a11y.back')}
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.backHit, pressed && { opacity: 0.55 }]}
      >
        <ChevronLeft size={ICON} color={theme.app.textPrimary} strokeWidth={2} />
      </Pressable>

      <PaywallHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        variant={isPremium ? 'supporter' : 'pitch'}
      />

      <View style={styles.card}>
        {isPremium ? (
          <>
            <PaywallFeatureRow icon={BadgeCheck} text={t('screens.paywall.supporter.feature1')} />
            <PaywallFeatureRow icon={Gift} text={t('screens.paywall.supporter.feature2')} />
            <PaywallFeatureRow icon={Leaf} text={t('screens.paywall.supporter.feature3')} />
          </>
        ) : (
          <>
            <PaywallFeatureRow icon={MapPinned} text={t('screens.paywall.features.support')} />
            <PaywallFeatureRow icon={Sparkles} text={t('screens.paywall.features.futureFeatures')} />
            <PaywallFeatureRow icon={Heart} text={t('screens.paywall.features.thanks')} />
          </>
        )}
      </View>

      {!isPremium ? (
        <View style={styles.actions}>
          <PurchaseButtons
            purchaseLabel={t('screens.paywall.buyCta', { price: priceLabel })}
            restoreLabel={t('screens.paywall.restoreCta')}
            onPressPurchase={() => void purchase()}
            onPressRestore={() => void restore()}
            isLoading={isLoading}
          />
        </View>
      ) : null}

      {lastError ? <Text style={styles.error}>{lastError}</Text> : null}
      {!lastError ? (
        <Text style={styles.status}>
          {isPremium ? t('screens.paywall.supporter.footer') : t('screens.paywall.footer')}
        </Text>
      ) : null}
    </View>
  );
}
