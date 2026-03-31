import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { Layers } from 'lucide-react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type { MapTypePreference } from '../../../stores/preferenceTypes';
import { MAP_TYPE_OPTIONS } from '../../../stores/preferenceTypes';
import { mapHomeChrome } from '../mapHomeTheme';

const TOGGLE_SIZE = 52;
const ICON = 24;
const EXPAND_MS = 240;

export const MAP_HOME_MAP_TYPES = MAP_TYPE_OPTIONS;
export type MapHomeMapType = MapTypePreference;

const LABEL_KEYS: Record<MapTypePreference, string> = {
  standard: 'screens.map.mapTypeStandard',
  satellite: 'screens.map.mapTypeSatellite',
  hybrid: 'screens.map.mapTypeHybrid',
  terrain: 'screens.map.mapTypeTerrain',
};

const styles = StyleSheet.create((theme) => ({
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  /** Ancho mínimo solo con el menú abierto; cerrado el bloque coincide con el botón (52). */
  columnExpanded: {
    minWidth: 148,
  },
  toggle: {
    width: TOGGLE_SIZE,
    height: TOGGLE_SIZE,
    borderRadius: TOGGLE_SIZE / 2,
    backgroundColor: theme.app.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...mapHomeChrome.ambientShadow,
  },
  toggleExpanded: {
    borderWidth: 2,
    borderColor: theme.app.primary,
  },
  clip: {
    overflow: 'hidden',
    alignSelf: 'stretch',
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    ...mapHomeChrome.ambientShadow,
  },
  /** Solo con menú abierto; si height=0 y hubiera margin, queda un hueco “fantasma” bajo el icono. */
  clipOpenSpacing: {
    marginBottom: theme.layout.space2,
  },
  scrollInner: {
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space2,
    gap: theme.layout.space2,
  },
  chip: {
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space3,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surfaceMuted,
    alignSelf: 'stretch',
  },
  chipSelected: {
    backgroundColor: theme.app.primary,
  },
  chipLabel: {
    ...theme.typography.caption,
    fontWeight: '600',
    color: theme.app.textPrimary,
    textAlign: 'center',
  },
  chipLabelSelected: {
    color: theme.app.onPrimary,
  },
}));

type Props = {
  value: MapTypePreference;
  onChange: (mapType: MapTypePreference) => void;
};

export function MapHomeMapTypeControl({ value, onChange }: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { height: windowHeight } = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const expandedHeight = useMemo(() => {
    const perChip = 44;
    const gap = 8;
    const pad = 16;
    const natural =
      MAP_TYPE_OPTIONS.length * perChip +
      Math.max(0, MAP_TYPE_OPTIONS.length - 1) * gap +
      pad;
    return Math.min(natural, windowHeight * 0.38);
  }, [windowHeight]);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 1 : 0,
      duration: EXPAND_MS,
      useNativeDriver: false,
    }).start();
  }, [expanded, heightAnim]);

  const stripHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, expandedHeight],
  });

  const onTogglePress = () => {
    setExpanded((e) => !e);
  };

  const onSelect = (mapType: MapTypePreference) => {
    onChange(mapType);
    setExpanded(false);
  };

  return (
    <View
      style={[styles.column, expanded && styles.columnExpanded]}
      accessibilityRole="toolbar"
    >
      <Animated.View
        pointerEvents={expanded ? 'auto' : 'none'}
        style={[
          styles.clip,
          expanded ? styles.clipOpenSpacing : null,
          { height: stripHeight },
        ]}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={styles.scrollInner}
        >
          {MAP_TYPE_OPTIONS.map((mapType) => {
            const selected = value === mapType;
            return (
              <Pressable
                key={mapType}
                onPress={() => onSelect(mapType)}
                style={[styles.chip, selected && styles.chipSelected]}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={t(LABEL_KEYS[mapType])}
              >
                <Text
                  style={[styles.chipLabel, selected && styles.chipLabelSelected]}
                  numberOfLines={1}
                >
                  {t(LABEL_KEYS[mapType])}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Animated.View>

      <Pressable
        style={[styles.toggle, expanded && styles.toggleExpanded]}
        onPress={onTogglePress}
        accessibilityRole="button"
        accessibilityLabel={t('screens.map.mapTypePickerA11y')}
        accessibilityState={{ expanded }}
      >
        <Layers
          size={ICON}
          color={expanded ? theme.app.primary : theme.app.textPrimary}
          strokeWidth={2}
        />
      </Pressable>
    </View>
  );
}
