import { TextInput, type TextInputProps } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  base: {
    flex: 1,
    minWidth: 0,
    paddingVertical: theme.layout.space2,
    ...theme.typography.body,
    color: theme.app.textPrimary,
  },
}));

export type AppTextInputProps = TextInputProps;

export function AppTextInput({ style, ...props }: AppTextInputProps) {
  const { theme } = useUnistyles();

  return (
    <TextInput
      style={[styles.base, style]}
      placeholderTextColor={theme.app.textMuted}
      selectionColor={theme.app.primary}
      {...props}
    />
  );
}
