import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface FlowLayoutProps {
  spacing?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const FlowLayout: React.FC<FlowLayoutProps> = ({
  spacing: gapProp,
  children,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const gap = gapProp ?? theme.spacing.xs;
  const items = React.Children.toArray(children);

  return (
    <View style={[styles.container, style]}>
      {items.map((child, index) => (
        <View key={index} style={{ marginRight: gap, marginBottom: gap }}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
