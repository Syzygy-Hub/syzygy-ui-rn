import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface ProgressBarProps {
  progress: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

const HEIGHT = 8;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View
      style={[
        styles.track,
        {
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.border,
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 1, now: clamped }}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.primary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: HEIGHT,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: HEIGHT,
  },
});
