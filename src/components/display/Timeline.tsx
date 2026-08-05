import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface TimelineItem {
  key: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  events: TimelineItem[];
  alignment?: 'leading' | 'trailing';
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

const DOT_SIZE = 12;

export const Timeline: React.FC<TimelineProps> = ({
  events,
  alignment = 'leading',
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View style={style}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const rail = (
          <View style={[styles.rail, { marginHorizontal: theme.spacing.sm }]}>
            <View style={[styles.dot, { backgroundColor: theme.colors.primary }]}>
              {event.icon}
            </View>
            {!isLast ? (
              <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
            ) : null}
          </View>
        );
        const body = (
          <View style={[styles.body, isLast ? null : { paddingBottom: theme.spacing.lg }]}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: theme.typography.callout.fontSize,
                  fontWeight: theme.typography.headline.fontWeight,
                  color: theme.colors.textPrimary,
                },
              ]}
            >
              {event.title}
            </Text>
            {event.subtitle ? (
              <Text
                style={[
                  styles.subtitle,
                  {
                    fontSize: theme.typography.footnote.fontSize,
                    marginTop: theme.spacing.xxs,
                    color: theme.colors.textSecondary,
                  },
                ]}
              >
                {event.subtitle}
              </Text>
            ) : null}
            {event.timestamp ? (
              <Text
                style={[
                  styles.timestamp,
                  {
                    fontSize: theme.typography.caption.fontSize,
                    marginTop: theme.spacing.xxs,
                    color: theme.colors.textTertiary,
                  },
                ]}
              >
                {event.timestamp}
              </Text>
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
    minHeight: 24,
  },
  body: {
    flex: 1,
  },
  title: {},
  subtitle: {},
  timestamp: {},
});
