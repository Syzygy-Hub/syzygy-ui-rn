import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';
import { DividerLine } from '../display/DividerLine';

export interface LabeledDividerProps {
  label: string;
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const LabeledDivider: React.FC<LabeledDividerProps> = ({
  label,
  alignment = 'center',
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const leadingFlex = alignment === 'leading' ? 1 : alignment === 'trailing' ? 4 : 1;
  const trailingFlex = alignment === 'trailing' ? 1 : alignment === 'leading' ? 4 : 1;

  return (
    <View style={[styles.row, style]}>
      <DividerLine style={{ flex: leadingFlex }} theme={theme} />
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.footnote.fontSize,
            marginHorizontal: theme.spacing.sm,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
      <DividerLine style={{ flex: trailingFlex }} theme={theme} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {},
});
