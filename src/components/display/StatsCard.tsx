import React from 'react';
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export type StatsCardTrend = 'up' | 'down' | 'neutral';

export interface StatsCardProps {
  label: string;
  value: string;
  trend?: StatsCardTrend;
  trendValue?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A card showing a label, a large value, and an optional trend indicator
 * (also known as `MetricCard` in other design systems).
 */
export const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend, trendValue, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const trendColor = trend === 'up' ? colors.success : trend === 'down' ? colors.error : colors.textSecondary;
  const trendGlyph = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '●';

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }, style]}
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
      {trend ? (
        <View style={styles.trendRow}>
          <Text style={{ color: trendColor, fontSize: fontSizes.xs }}>{trendGlyph}</Text>
          {trendValue ? (
            <Text style={[styles.trendValue, { color: trendColor }]}>{trendValue}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  label: {
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  trendValue: {
    fontSize: fontSizes.xs,
    marginLeft: spacing.xxs,
    fontWeight: fontWeights.medium,
  },
});
