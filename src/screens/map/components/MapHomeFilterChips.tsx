import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text } from 'react-native';
import { Bike, Umbrella } from 'lucide-react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const ICON = 16;

export type MapFilterId = 'available' | 'covered';

type ChipDef = {
  id: MapFilterId;
  labelKey: 'screens.map.filterAvailable' | 'screens.map.filterCovered';
  Icon: typeof Bike;
};

const CHIPS: ChipDef[] = [
  { id: 'available', labelKey: 'screens.map.filterAvailable', Icon: Bike },
  { id: 'covered', labelKey: 'screens.map.filterCovered', Icon: Umbrella },
];

const styles = StyleSheet.create((theme) => ({
  scroll: {
    marginTop: theme.layout.space3,
    marginHorizontal: -theme.layout.space1,
  },
  scrollContent: {
    flexDirection: 'row',
    gap: theme.layout.space2,
    paddingHorizontal: theme.layout.space1,
    paddingVertical: theme.layout.space1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.space2,
    paddingVertical: theme.layout.space2,
    paddingHorizontal: theme.layout.space4,
    borderRadius: theme.layout.radiusMd,
  },
  chipIdle: {
    backgroundColor: theme.app.surfaceMuted,
  },
  chipActive: {
    backgroundColor: theme.app.surfaceHighest,
  },
  chipLabel: {
    ...theme.typography.label,
  },
  chipLabelIdle: {
    color: theme.app.textSecondary,
  },
  chipLabelActive: {
    color: theme.app.textPrimary,
    fontWeight: '600',
  },
}));

type Props = {
  selected: MapFilterId[];
  onToggle: (id: MapFilterId) => void;
};

export function MapHomeFilterChips({ selected, onToggle }: Props) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const ink = theme.app.textPrimary;
  const inkMuted = theme.app.textSecondary;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
    >
      {CHIPS.map(({ id, labelKey, Icon }) => {
        const active = selected.includes(id);
        return (
          <Pressable
            key={id}
            onPress={() => onToggle(id)}
            style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            accessibilityLabel={t(labelKey)}
          >
            <Icon size={ICON} color={active ? ink : inkMuted} strokeWidth={2} />
            <Text style={[styles.chipLabel, active ? styles.chipLabelActive : styles.chipLabelIdle]}>
              {t(labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
