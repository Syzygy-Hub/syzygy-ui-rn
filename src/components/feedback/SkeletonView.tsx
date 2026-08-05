import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export type SkeletonShape = 'rectangle' | 'circle';

export interface SkeletonViewProps {
  shape?: SkeletonShape;
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const SkeletonView: React.FC<SkeletonViewProps> = ({
  shape = 'rectangle',
  width = '100%',
  height = 16,
  borderRadius,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
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

  const resolvedRadius = shape === 'circle' ? height / 2 : borderRadius ?? theme.radius.sm;

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        {
          width: shape === 'circle' ? height : width,
          height,
          borderRadius: resolvedRadius,
          backgroundColor: theme.colors.surfaceSecondary,
          opacity,
        },
        style,
      ]}
    />
  );
};
