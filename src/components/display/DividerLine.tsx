import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';

export interface DividerLineProps {
  style?: StyleProp<ViewStyle>;
}

/** A hairline horizontal rule. */
export const DividerLine: React.FC<DividerLineProps> = ({ style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[styles.line, { backgroundColor: colors.border }, style]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
