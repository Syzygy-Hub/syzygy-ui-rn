import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface PageControlProps {
  pageCount: number;
  currentPage: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const PageControl: React.FC<PageControlProps> = ({
  pageCount,
  currentPage,
  activeColor,
  inactiveColor,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const active = activeColor ?? theme.colors.primary;
  const inactive = inactiveColor ?? theme.colors.border;

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={`Page ${currentPage + 1} of ${pageCount}`}
    >
      {Array.from({ length: pageCount }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { marginHorizontal: theme.spacing.xxs },
            { backgroundColor: index === currentPage ? active : inactive },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
