import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface QuantityStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  style?: StyleProp<ViewStyle>;
}

/** A +/- quantity control, bounded to [minimumValue, maximumValue]. */
export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 99,
  step = 1,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const atMin = value <= minimumValue;
  const atMax = value >= maximumValue;

  return (
    <View
      style={[styles.container, { borderColor: colors.border }, style]}
      accessibilityLabel={`Quantity: ${value}`}
    >
      <TouchableOpacity
        onPress={() => onValueChange(Math.max(minimumValue, value - step))}
        disabled={atMin}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        style={styles.button}
      >
        <Text style={[styles.stepperGlyph, { color: atMin ? colors.textDisabled : colors.primary }]}>
          {'−'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.valueText, { color: colors.textPrimary, fontSize: fontSizes.md }]}>
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => onValueChange(Math.min(maximumValue, value + step))}
        disabled={atMax}
        accessibilityRole="button"
        accessibilityLabel="Increase"
        style={styles.button}
      >
        <Text style={[styles.stepperGlyph, { color: atMax ? colors.textDisabled : colors.primary }]}>
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
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  valueText: {
    minWidth: 24,
    textAlign: 'center',
  },
  stepperGlyph: {
    fontWeight: fontWeights.bold,
  },
});
