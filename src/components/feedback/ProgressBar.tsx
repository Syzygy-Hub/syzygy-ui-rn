import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';

export interface ProgressBarProps {
  progress: number;
  style?: StyleProp<ViewStyle>;
}

/** A determinate linear progress indicator. */
export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View
      style={[styles.track, { backgroundColor: colors.border }, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 1, now: clamped }}
    >
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: colors.primary }]} />
    </View>
  );
};

const HEIGHT = 8;

const styles = StyleSheet.create({
  track: {
    height: HEIGHT,
    borderRadius: radius.full,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: HEIGHT,
    borderRadius: radius.full,
  },
});
