import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface CircularProgressProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 40,
  strokeWidth = 4,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const spin = useRef(new Animated.Value(0)).current;
  const isIndeterminate = progress == null;

  useEffect(() => {
    if (!isIndeterminate) {
      return undefined;
    }
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [isIndeterminate, spin]);

  const clamped = Math.max(0, Math.min(1, progress ?? 0));
  const rotateDeg = isIndeterminate
    ? spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
    : `${clamped * 360}deg`;

  return (
    <View
      style={[{ width: size, height: size }, style]}
      accessibilityRole="progressbar"
      accessibilityValue={isIndeterminate ? undefined : { min: 0, max: 1, now: clamped }}
    >
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: theme.colors.surfaceSecondary,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.track,
          styles.sweepBorder,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderTopColor: theme.colors.primary,
            transform: [{ rotate: rotateDeg }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    position: 'absolute',
  },
  sweepBorder: {
    borderColor: 'transparent',
  },
});
