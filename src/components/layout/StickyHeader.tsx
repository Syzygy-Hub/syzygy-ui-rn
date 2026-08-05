import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme } from '../../theme';

export interface StickyHeaderProps {
  header: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  header,
  children,
  style,
  // theme prop accepted but layout component does not consume it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: _theme,
}) => {
  return (
    <ScrollView style={[styles.flex, style]} stickyHeaderIndices={[0]}>
      <View>{header}</View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
