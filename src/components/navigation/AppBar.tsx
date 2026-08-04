import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface AppBarProps {
  title: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** A top navigation bar with a centered title and optional leading/trailing accessories. */
export const AppBar: React.FC<AppBarProps> = ({ title, leading, trailing, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
        style,
      ]}
      accessibilityRole="header"
    >
      <View style={styles.side}>{leading}</View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {title}
      </Text>
      <View style={[styles.side, styles.trailing]}>{trailing}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    minWidth: 44,
  },
  trailing: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
  },
});
