import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface AppBarProps {
  title: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  leading,
  trailing,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}
      accessibilityRole="header"
    >
      <View style={styles.side}>{leading}</View>
      <Text
        style={[
          styles.title,
          {
            fontSize: theme.typography.body.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            color: theme.colors.textPrimary,
          },
        ]}
      >
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    minWidth: 44,
  },
  trailing: {
    alignItems: 'flex-end',
  },
  title: {},
});
