import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface CountBadgeProps {
  count?: number;
  maxDisplayCount?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  maxDisplayCount = 99,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  if (count != null && count > 0) {
    const display = count > maxDisplayCount ? `${maxDisplayCount}+` : `${count}`;
    return (
      <View
        style={[
          styles.numeric,
          {
            borderRadius: theme.radius.full,
            paddingHorizontal: theme.spacing.xs,
            backgroundColor: theme.colors.destructive,
          },
          style,
        ]}
        accessibilityLabel={`${count} unread`}
      >
        <Text
          style={[
            styles.count,
            {
              fontSize: theme.typography.caption.fontSize,
              color: theme.colors.onDestructive,
            },
          ]}
        >
          {display}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.dot,
        { backgroundColor: theme.colors.destructive },
        style,
      ]}
      accessibilityLabel="New"
    />
  );
};

const styles = StyleSheet.create({
  numeric: {
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  count: {},
});
