import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface PasswordStrengthIndicatorProps {
  password: string;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

type Strength = 0 | 1 | 2 | 3;

const LABELS: Record<Strength, string> = {
  0: 'Weak',
  1: 'Fair',
  2: 'Strong',
  3: 'Very Strong',
};

export const scorePasswordStrength = (password: string): Strength => {
  if (!password) return 0;
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

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const strength = scorePasswordStrength(password);
  const segments = [0, 1, 2, 3];

  const colorForStrength =
    strength === 0
      ? theme.colors.error
      : strength === 1
      ? theme.colors.warning
      : strength === 2
      ? theme.colors.primary
      : theme.colors.success;

  return (
    <View style={style} accessibilityLabel={`Password strength: ${LABELS[strength]}`}>
      <View style={styles.segments}>
        {segments.map((segment) => (
          <View
            key={segment}
            style={[
              styles.segment,
              {
                borderRadius: theme.radius.xs,
                marginRight: theme.spacing.xs,
                backgroundColor:
                  segment <= strength ? colorForStrength : theme.colors.surfaceSecondary,
              },
            ]}
          />
        ))}
      </View>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.caption.fontSize,
            marginTop: theme.spacing.xs,
            color: colorForStrength,
          },
        ]}
      >
        {LABELS[strength]}
      </Text>
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
  },
  label: {},
});
