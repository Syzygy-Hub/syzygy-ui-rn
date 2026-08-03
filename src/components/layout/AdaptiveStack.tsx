import React, { useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface AdaptiveStackProps {
  breakpoint: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A layout that arranges its children in a row when the available width is
 * above `breakpoint`, and in a column otherwise. Reads its own measured
 * width via `onLayout` (rather than `useWindowDimensions`, which reflects
 * the whole screen, not the space this component actually has) so it
 * adapts correctly even when nested inside a narrower parent.
 */
export const AdaptiveStack: React.FC<AdaptiveStackProps> = ({ breakpoint, children, style }) => {
  const [width, setWidth] = useState<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const isHorizontal = width == null || width >= breakpoint;

  return (
    <View
      onLayout={handleLayout}
      style={[styles.base, { flexDirection: isHorizontal ? 'row' : 'column' }, style]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});
