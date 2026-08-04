import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';

export type SkeletonShape = 'rectangle' | 'circle';

export interface SkeletonViewProps {
  shape?: SkeletonShape;
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A shimmering placeholder for content that hasn't loaded yet, parameterized
 * by shape and size. Mirrors `ShimmerView`'s `Animated`-driven opacity pulse.
 */
export const SkeletonView: React.FC<SkeletonViewProps> = ({
  shape = 'rectangle',
  width = '100%',
  height = 16,
  borderRadius,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  const resolvedRadius = shape === 'circle' ? height / 2 : borderRadius ?? radius.sm;

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        {
          width: shape === 'circle' ? height : width,
          height,
          borderRadius: resolvedRadius,
          backgroundColor: colors.surfaceSecondary,
          opacity,
        },
        style,
      ]}
    />
  );
};
