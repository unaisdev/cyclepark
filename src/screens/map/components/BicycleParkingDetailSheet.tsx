import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheet,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';
import { Linking, Platform, Pressable, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { BicycleParkingOsmFeature } from '../../../api/openstreetmap';
import { i18n } from '../../../i18n';
import { OSM_WIKI_COMPATIBLE_IMAGE_HEADERS } from '../constants/osmWikiImageRequest';
import {
  BICYCLE_PARKING_TYPE_DESCRIPTION_KEYS,
  getBicycleParkingTypeImageUrl,
  normalizeBicycleParkingTypeKey,
} from '../constants/bicycleParkingWikiIllustrations';
import { formatBicycleParkingRawText } from '../utils/formatBicycleParkingRawText';
import {
  getBicycleParkingDetailRows,
  getBicycleParkingTypeRaw,
} from '../utils/bicycleParkingTagRows';
import { OSM_TAG_KEY_TO_PARKING_DETAIL_FIELD } from '../utils/parkingDetailFieldLabels';

const SNAP_POINTS = ['52%', '88%'] as const;

const OSM_WIKI_AMENITY_BICYCLE_PARKING =
  'https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbicycle_parking';
const OSM_WIKI_KEY_BICYCLE_PARKING = 'https://wiki.openstreetmap.org/wiki/Key:bicycle_parking';

const styles = StyleSheet.create((theme) => ({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.layout.space4,
    paddingBottom: theme.layout.space6,
  },
  title: {
    ...theme.typography.titleLarge,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space2,
  },
  hint: {
    ...theme.typography.caption,
    color: theme.app.textMuted,
    marginBottom: theme.layout.space4,
  },
  sectionTitle: {
    ...theme.typography.titleMedium,
    color: theme.app.textPrimary,
    marginTop: theme.layout.space5,
    marginBottom: theme.layout.space2,
  },
  detailRow: {
    marginBottom: theme.layout.space3,
  },
  detailLabel: {
    ...theme.typography.caption,
    color: theme.app.textMuted,
    marginBottom: 2,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.app.textPrimary,
  },
  typeImageWrap: {
    marginTop: theme.layout.space2,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: theme.app.surfaceMuted,
    alignSelf: 'stretch',
    minHeight: 200,
  },
  typeImage: {
    width: '100%',
    height: 200,
  },
  typeOsmValue: {
    ...theme.typography.caption,
    color: theme.app.textSecondary,
    marginTop: theme.layout.space2,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },
  typeBody: {
    ...theme.typography.body,
    color: theme.app.textPrimary,
    marginTop: theme.layout.space2,
    lineHeight: 22,
  },
  waveNote: {
    ...theme.typography.caption,
    color: theme.app.textMuted,
    marginTop: theme.layout.space2,
    fontStyle: 'italic',
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.layout.space2,
    marginTop: theme.layout.space3,
  },
  linkPress: {
    paddingVertical: theme.layout.space1,
  },
  linkText: {
    ...theme.typography.label,
    color: theme.app.primary,
    textDecorationLine: 'underline',
  },
  wikiCredit: {
    ...theme.typography.caption,
    color: theme.app.textMuted,
    marginTop: theme.layout.space2,
    lineHeight: 18,
  },
  mono: {
    ...theme.typography.caption,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    color: theme.app.textSecondary,
  },
  closeBtn: {
    marginTop: theme.layout.space4,
    alignSelf: 'flex-start',
    paddingVertical: theme.layout.space3,
    paddingHorizontal: theme.layout.space4,
    borderRadius: 14,
    backgroundColor: theme.app.surfaceMuted,
  },
  closeLabel: {
    ...theme.typography.label,
    color: theme.app.textPrimary,
  },
}));

type BodyProps = {
  parking: BicycleParkingOsmFeature;
};

function BicycleParkingDetailBody({ parking }: BodyProps) {
  const { t } = useTranslation();
  const { close } = useBottomSheet();
  const [typeImageFailed, setTypeImageFailed] = useState(false);

  useEffect(() => {
    setTypeImageFailed(false);
  }, [parking.id, parking.osmType]);

  const raw = useMemo(() => formatBicycleParkingRawText(parking), [parking]);
  const { detailRows, remainingTagRows } = useMemo(
    () => getBicycleParkingDetailRows(parking),
    [parking],
  );
  const rackTypeRaw = useMemo(() => getBicycleParkingTypeRaw(parking.tags), [parking.tags]);
  const typeNorm = rackTypeRaw ? normalizeBicycleParkingTypeKey(rackTypeRaw) : '';
  const typeImageUrl = useMemo(() => getBicycleParkingTypeImageUrl(rackTypeRaw), [rackTypeRaw]);

  const typeDescription = useMemo((): string | null => {
    if (!rackTypeRaw) return null;
    const suffix =
      typeNorm && BICYCLE_PARKING_TYPE_DESCRIPTION_KEYS.has(typeNorm) ? typeNorm : 'other';
    const key = `screens.map.parkingDetail.types.${suffix}`;
    const out = (i18n as { t: (k: string) => unknown }).t(key);
    return typeof out === 'string' ? out : null;
  }, [rackTypeRaw, typeNorm]);

  const openUrl = useCallback((url: string) => {
    void Linking.openURL(url);
  }, []);

  return (
    <BottomSheetScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{t('screens.map.parkingDetailSheetTitle')}</Text>
      <Text style={styles.hint}>{t('screens.map.parkingDetailSheetHint')}</Text>

      <Text style={styles.sectionTitle}>{t('screens.map.parkingDetail.sectionDetails')}</Text>
      {detailRows.length === 0 ? (
        <Text style={styles.detailValue}>{t('screens.map.parkingDetail.sectionDetailsEmpty')}</Text>
      ) : (
        detailRows.map((row) => {
          const field = OSM_TAG_KEY_TO_PARKING_DETAIL_FIELD[row.key];
          const label = field ? t(`screens.map.parkingDetail.fields.${field}` as const) : row.key;
          return (
            <View key={row.key} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue} selectable>
                {row.value}
              </Text>
            </View>
          );
        })
      )}

      <Text style={styles.sectionTitle}>{t('screens.map.parkingDetail.sectionRackType')}</Text>
      {!rackTypeRaw ? (
        <Text style={styles.detailValue}>{t('screens.map.parkingDetail.rackTypeNotTagged')}</Text>
      ) : (
        <>
          <Text style={styles.typeOsmValue}>
            {t('screens.map.parkingDetail.rackTypeOsmValue')}: {rackTypeRaw}
          </Text>
          {typeImageUrl != null && !typeImageFailed ? (
            <View style={styles.typeImageWrap} collapsable={false}>
              <Image
                accessibilityIgnoresInvertColors
                accessible
                accessibilityRole="image"
                accessibilityLabel={rackTypeRaw}
                source={{
                  uri: typeImageUrl,
                  headers: { ...OSM_WIKI_COMPATIBLE_IMAGE_HEADERS },
                }}
                style={styles.typeImage}
                contentFit="cover"
                transition={0}
                onError={() => setTypeImageFailed(true)}
              />
            </View>
          ) : null}
          {typeDescription != null ? <Text style={styles.typeBody}>{typeDescription}</Text> : null}
          {typeNorm === 'wave' ? (
            <Text style={styles.waveNote}>{t('screens.map.parkingDetail.waveDeprecatedNote')}</Text>
          ) : null}
          <Text style={styles.wikiCredit}>{t('screens.map.parkingDetail.wikiAttribution')}</Text>
        </>
      )}
    </BottomSheetScrollView>
  );
}

export type BicycleParkingDetailSheetProps = {
  parking: BicycleParkingOsmFeature | null;
  onDismiss: () => void;
};

export const BicycleParkingDetailSheet = forwardRef<
  BottomSheetModalMethods,
  BicycleParkingDetailSheetProps
>(function BicycleParkingDetailSheet({ parking, onDismiss }, ref) {
  const { theme } = useUnistyles();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.45} />
    ),
    [],
  );

  const snapPoints = useMemo(() => [...SNAP_POINTS], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.app.surface }}
      handleIndicatorStyle={{ backgroundColor: theme.app.borderSubtle }}
      onDismiss={onDismiss}
    >
      {parking != null ? (
        <BicycleParkingDetailBody parking={parking} />
      ) : (
        <BottomSheetView style={{ minHeight: 1 }}>
          <View />
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
});
