import { View } from 'react-native';
import { UserRound } from 'lucide-react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { IconButton } from '../atoms/IconButton';
import { SearchField } from '../molecules/SearchField';

const ICON = 22;

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.space2,
  },
}));

export type MapSearchBarProps = {
  searchValue: string;
  onSearchChange: (text: string) => void;
  /** Al pulsar «buscar» en el teclado (returnKeyType search). */
  onSearchSubmit?: () => void;
  searchPlaceholder: string;
  profileA11yLabel: string;
  onProfilePress?: () => void;
};

export function MapSearchBar({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder,
  profileA11yLabel,
  onProfilePress,
}: MapSearchBarProps) {
  const { theme } = useUnistyles();
  const ink = theme.app.textPrimary;

  return (
    <View style={styles.row}>
      <SearchField
        value={searchValue}
        onChangeText={onSearchChange}
        onSubmitEditing={onSearchSubmit}
        placeholder={searchPlaceholder}
        accessibilityLabel={searchPlaceholder}
      />

      <IconButton accessibilityLabel={profileA11yLabel} onPress={onProfilePress ?? (() => {})}>
        <UserRound size={ICON} color={ink} strokeWidth={2} />
      </IconButton>
    </View>
  );
}
