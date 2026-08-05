import React, { useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme } from '../../theme';

export interface AdaptiveStackProps {
  breakpoint: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const AdaptiveStack: React.FC<AdaptiveStackProps> = ({
  breakpoint,
  children,
  style,
  // theme prop accepted but layout component does not consume it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: _theme,
}) => {
  const [width, setWidth] = useState<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const isHorizontal = width == null || width >= breakpoint;
  const dynamicDirectionStyle: ViewStyle = { flexDirection: isHorizontal ? 'row' : 'column' };

  return (
    <View onLayout={handleLayout} style={[styles.base, dynamicDirectionStyle, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});
