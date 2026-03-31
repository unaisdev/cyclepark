import { useState } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const FONT_SIZE = 52;

/**
 * Marca tipográfica CiclePark: trazo grueso bajo las dos primeras letras ("Ci"), alineado al ancho de "Ci".
 */
export function CicleParkWordmark() {
  const { theme } = useUnistyles();
  const [ciWidth, setCiWidth] = useState(0);
  const color = theme.app.textPrimary;
  const gap = Math.round(FONT_SIZE * 0.07);
  const bar = Math.max(4, Math.round(FONT_SIZE * 0.12));

  const markStyle = [
    styles.mark,
    {
      color,
      fontSize: FONT_SIZE,
      letterSpacing: -FONT_SIZE * 0.028,
    },
  ];

  return (
    <View
      accessibilityRole="header"
      accessibilityLabel="CiclePark"
      style={styles.root}
    >
      <View style={styles.row}>
        <View style={styles.ciColumn}>
          <Text
            style={markStyle}
            onLayout={(e) => setCiWidth(Math.ceil(e.nativeEvent.layout.width))}
          >
            Ci
          </Text>
          <View
            style={[
              styles.underline,
              {
                width: ciWidth > 0 ? ciWidth : undefined,
                height: bar,
                marginTop: gap,
                backgroundColor: color,
              },
            ]}
          />
        </View>
        <Text style={markStyle}>clePark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ciColumn: {
    alignItems: 'stretch',
  },
  mark: {
    fontWeight: '800',
    color: theme.app.textPrimary,
  },
  underline: {
    alignSelf: 'flex-start',
  },
}));
