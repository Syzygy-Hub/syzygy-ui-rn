import React from 'react';
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface PasswordStrengthIndicatorProps {
  password: string;
  style?: StyleProp<ViewStyle>;
}

type Strength = 0 | 1 | 2 | 3;

const LABELS: Record<Strength, string> = {
  0: 'Weak',
  1: 'Fair',
  2: 'Strong',
  3: 'Very Strong',
};

/** Computes a real strength score from length + character-class variety (not a hardcoded lookup). */
export const scorePasswordStrength = (password: string): Strength => {
  if (!password) {
    return 0;
  }

  let variety = 0;
  if (/[a-z]/.test(password)) variety += 1;
  if (/[A-Z]/.test(password)) variety += 1;
  if (/[0-9]/.test(password)) variety += 1;
  if (/[^a-zA-Z0-9]/.test(password)) variety += 1;

  let lengthScore = 0;
  if (password.length >= 8) lengthScore += 1;
  if (password.length >= 12) lengthScore += 1;

  const total = variety + lengthScore;

  if (total <= 2) return 0;
  if (total === 3) return 1;
  if (total === 4) return 2;
  return 3;
};

/** A segmented strength bar + label, computed live from `password`'s length and character-class variety. */
export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const strength = scorePasswordStrength(password);
  const segments = [0, 1, 2, 3];

  const colorForStrength =
    strength === 0 ? colors.error : strength === 1 ? colors.warning : strength === 2 ? colors.primary : colors.success;

  return (
    <View style={style} accessibilityLabel={`Password strength: ${LABELS[strength]}`}>
      <View style={styles.segments}>
        {segments.map((segment) => (
          <View
            key={segment}
            style={[
              styles.segment,
              { backgroundColor: segment <= strength ? colorForStrength : colors.surfaceSecondary },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color: colorForStrength }]}>{LABELS[strength]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  segments: {
    flexDirection: 'row',
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: radius.xs,
    marginRight: spacing.xs,
  },
  label: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
