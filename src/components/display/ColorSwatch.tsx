import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface ColorSwatchProps {
  color: string;
  shape?: 'circle' | 'square';
  label?: string;
  isSelected?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

const SIZE_DEFAULT = 36;

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  shape = 'circle',
  label,
  isSelected = false,
  size = SIZE_DEFAULT,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const dynamicSwatchStyle = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? size / 2 : 6,
    backgroundColor: color,
    borderColor: isSelected ? theme.colors.focus : 'transparent',
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.swatch, dynamicSwatchStyle]}
        accessibilityRole="image"
        accessibilityLabel={label ?? color}
        accessibilityState={{ selected: isSelected }}
      />
      {label ? (
        <Text
          style={[
            styles.label,
            {
              fontSize: theme.typography.caption.fontSize,
              marginTop: theme.spacing.xxs,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}
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
  label: {},
});
