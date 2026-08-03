import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface ColorSwatchProps {
  color: string;
  shape?: 'circle' | 'square';
  label?: string;
  isSelected?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const SIZE_DEFAULT = 36;

/**
 * A circle or square displaying a single color, with an optional label
 * beneath it. When `isSelected` is true, a border is drawn using the
 * `focus` color token (v2.1.0) to indicate the current selection.
 */
export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  shape = 'circle',
  label,
  isSelected = false,
  size = SIZE_DEFAULT,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const dynamicSwatchStyle = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? size / 2 : 6,
    backgroundColor: color,
    borderColor: isSelected ? colors.focus : 'transparent',
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.swatch, dynamicSwatchStyle]}
        accessibilityRole="image"
        accessibilityLabel={label ?? color}
        accessibilityState={{ selected: isSelected }}
      />
      {label ? <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  swatch: {
    borderWidth: 2,
  },
  label: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xxs,
  },
});
