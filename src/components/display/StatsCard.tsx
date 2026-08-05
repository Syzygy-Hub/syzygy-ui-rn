import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export type StatsCardTrend = 'up' | 'down' | 'neutral';

export interface StatsCardProps {
  label: string;
  value: string;
  trend?: StatsCardTrend;
  trendValue?: string;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  trend,
  trendValue,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const trendColor =
    trend === 'up'
      ? theme.colors.success
      : trend === 'down'
      ? theme.colors.error
      : theme.colors.textSecondary;
  const trendGlyph = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '●';

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.lg,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      accessibilityLabel={`${label}: ${value}`}
    >
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.footnote.fontSize,
            marginBottom: theme.spacing.xs,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          {
            fontSize: theme.typography.display.fontSize,
            fontWeight: theme.typography.display.fontWeight,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {value}
      </Text>
      {trend ? (
        <View style={[styles.trendRow, { marginTop: theme.spacing.xs }]}>
          <Text style={{ color: trendColor, fontSize: theme.typography.caption.fontSize }}>
            {trendGlyph}
          </Text>
          {trendValue ? (
            <Text
              style={[
                styles.trendValue,
                {
                  fontSize: theme.typography.caption.fontSize,
                  marginLeft: theme.spacing.xxs,
                  color: trendColor,
                },
              ]}
            >
              {trendValue}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  label: {},
  value: {},
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendValue: {},
});
