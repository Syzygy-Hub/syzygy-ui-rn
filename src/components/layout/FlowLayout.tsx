import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { spacing } from '../../tokens/spacing';

export interface FlowLayoutProps {
  spacing?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A wrapping row layout for chips/tags, built on flexbox's native
 * `flexWrap: 'wrap'`.
 *
 * Spacing note: this library's peer dependency floor is `react-native
 * >=0.70.0`, but the flexbox `gap` style property only became reliably
 * supported starting with RN 0.71's Yoga update — using it here would
 * silently produce no spacing at all on 0.70 consumers. To stay correct
 * across the full supported range, each child is wrapped in a View with
 * margin-based spacing instead of relying on `gap`.
 */
export const FlowLayout: React.FC<FlowLayoutProps> = ({ spacing: gap = spacing.xs, children, style }) => {
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
