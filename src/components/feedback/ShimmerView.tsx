import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';

export interface ShimmerViewProps {
  style?: StyleProp<ViewStyle>;
}

/** An animated skeleton placeholder for list/table rows while content loads. */
export const ShimmerView: React.FC<ShimmerViewProps> = ({ style }) => {
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

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        styles.base,
        { backgroundColor: colors.surfaceAlt, opacity },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    height: 16,
    borderRadius: radius.sm,
    width: '100%',
  },
});
