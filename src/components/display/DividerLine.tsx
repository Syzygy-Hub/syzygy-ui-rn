import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface DividerLineProps {
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

/** A hairline horizontal rule. */
export const DividerLine: React.FC<DividerLineProps> = ({ style, theme: themeProp }) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[styles.line, { backgroundColor: theme.colors.border }, style]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
