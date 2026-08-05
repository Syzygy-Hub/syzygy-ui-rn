import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface QuantityStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 99,
  step = 1,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const atMin = value <= minimumValue;
  const atMax = value >= maximumValue;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.md,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      accessibilityLabel={`Quantity: ${value}`}
    >
      <TouchableOpacity
        onPress={() => onValueChange(Math.max(minimumValue, value - step))}
        disabled={atMin}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        style={[styles.button, { paddingHorizontal: theme.spacing.xs }]}
      >
        <Text
          style={[
            styles.stepperGlyph,
            {
              fontWeight: theme.typography.display.fontWeight,
              color: atMin ? theme.colors.textDisabled : theme.colors.primary,
            },
          ]}
        >
          {'−'}
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.valueText,
          {
            fontSize: theme.typography.callout.fontSize,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => onValueChange(Math.min(maximumValue, value + step))}
        disabled={atMax}
        accessibilityRole="button"
        accessibilityLabel="Increase"
        style={[styles.button, { paddingHorizontal: theme.spacing.xs }]}
      >
        <Text
          style={[
            styles.stepperGlyph,
            {
              fontWeight: theme.typography.display.fontWeight,
              color: atMax ? theme.colors.textDisabled : theme.colors.primary,
            },
          ]}
        >
          {'+'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    minWidth: 24,
    textAlign: 'center',
  },
  stepperGlyph: {},
});
