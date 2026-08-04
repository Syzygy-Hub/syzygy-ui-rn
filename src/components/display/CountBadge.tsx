import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface CountBadgeProps {
  count?: number;
  maxDisplayCount?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A small numeric/dot badge meant to overlay an icon (e.g. a bell with an
 * unread count). Distinct from this library's own `Badge`, which is a
 * standalone labeled pill.
 */
export const CountBadge: React.FC<CountBadgeProps> = ({ count, maxDisplayCount = 99, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  if (count != null && count > 0) {
    const display = count > maxDisplayCount ? `${maxDisplayCount}+` : `${count}`;
    return (
      <View
        style={[styles.numeric, { backgroundColor: colors.destructive }, style]}
        accessibilityLabel={`${count} unread`}
      >
        <Text style={[styles.count, { color: colors.destructiveText }]}>{display}</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.dot, { backgroundColor: colors.destructive }, style]}
      accessibilityLabel="New"
    />
  );
};

const styles = StyleSheet.create({
  numeric: {
    minWidth: 16,
    height: 16,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  count: {
    fontSize: fontSizes.xs,
  },
});
