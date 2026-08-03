import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';

export interface CircularProgressProps {
  /** 0-1 for determinate mode; omit for a continuously spinning indeterminate mode. */
  progress?: number;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A circular progress indicator.
 *
 * Implementation approach: React Native core has no native circular
 * progress/arc-drawing primitive (that would normally come from `react-native-svg`,
 * a third-party dependency this library avoids). Determinate progress is
 * therefore approximated by rotating a half-transparent bordered circle: a
 * full ring is drawn at low opacity as the track, and a second ring segment
 * is rotated via `transform: rotate` proportional to `progress` to sweep in
 * the filled portion. This is a visual approximation, not a precise arc
 * render — for a pixel-accurate arc, an SVG-based solution would be needed.
 * Indeterminate mode (`progress` omitted) spins the ring continuously via
 * `Animated.loop`.
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 40,
  strokeWidth = 4,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
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
            borderColor: colors.surfaceAlt,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderTopColor: colors.primary,
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
});
