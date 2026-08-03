import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface StickyHeaderProps {
  header: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A header that sticks to the top of a scroll container while content
 * scrolls beneath it, using React Native core's built-in
 * `ScrollView`/`stickyHeaderIndices` mechanism directly rather than
 * reimplementing sticky positioning manually.
 */
export const StickyHeader: React.FC<StickyHeaderProps> = ({ header, children, style }) => {
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
