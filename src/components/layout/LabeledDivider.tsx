import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';
import { DividerLine } from '../display/DividerLine';

export interface LabeledDividerProps {
  label: string;
  /** Where the label sits along the divider. */
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal divider with a centered (or leading/trailing) text label
 * breaking the line, built from two `DividerLine` segments flanking the
 * label — proportioned via `flex` according to `alignment`.
 */
export const LabeledDivider: React.FC<LabeledDividerProps> = ({
  label,
  alignment = 'center',
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const leadingFlex = alignment === 'leading' ? 1 : alignment === 'trailing' ? 4 : 1;
  const trailingFlex = alignment === 'trailing' ? 1 : alignment === 'leading' ? 4 : 1;
  const leadingLineStyle = { flex: leadingFlex };
  const trailingLineStyle = { flex: trailingFlex };

  return (
    <View style={[styles.row, style]}>
      <DividerLine style={leadingLineStyle} />
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <DividerLine style={trailingLineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSizes.sm,
    marginHorizontal: spacing.sm,
  },
});
