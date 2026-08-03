import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface TimelineEvent {
  key: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  /** Custom glyph/icon rendered inside the dot. Defaults to a plain filled dot. */
  icon?: React.ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  /** Whether the dot/line sits on the leading or trailing edge of each row. */
  alignment?: 'leading' | 'trailing';
  style?: StyleProp<ViewStyle>;
}

const DOT_SIZE = 12;

/**
 * A vertical list of events (also known as `ActivityFeed`), each with a
 * dot/icon on a connecting vertical line, a title, an optional subtitle, and
 * an optional timestamp. The connecting line is a simple fixed-width View
 * segment rendered between each pair of dots.
 */
export const Timeline: React.FC<TimelineProps> = ({ events, alignment = 'leading', style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={style}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const rail = (
          <View style={styles.rail}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]}>{event.icon}</View>
            {!isLast ? <View style={[styles.line, { backgroundColor: colors.border }]} /> : null}
          </View>
        );
        const body = (
          <View style={[styles.body, isLast ? null : styles.bodySpacing]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{event.title}</Text>
            {event.subtitle ? (
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{event.subtitle}</Text>
            ) : null}
            {event.timestamp ? (
              <Text style={[styles.timestamp, { color: colors.textTertiary }]}>{event.timestamp}</Text>
            ) : null}
          </View>
        );

        return (
          <View key={event.key} style={styles.row}>
            {alignment === 'leading' ? rail : null}
            {body}
            {alignment === 'trailing' ? rail : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rail: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: spacing.lg,
  },
  body: {
    flex: 1,
  },
  bodySpacing: {
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    marginTop: spacing.xxs,
  },
  timestamp: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xxs,
  },
});
