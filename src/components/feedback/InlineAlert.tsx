import React from 'react';
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export type InlineAlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface InlineAlertProps {
  message: string;
  variant: InlineAlertVariant;
  style?: StyleProp<ViewStyle>;
}

/** An inline status banner (also known as `Banner`), using the `*Muted` background tokens per variant. */
export const InlineAlert: React.FC<InlineAlertProps> = ({ message, variant, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const backgroundColor =
    variant === 'success'
      ? colors.successMuted
      : variant === 'warning'
      ? colors.warningMuted
      : variant === 'error'
      ? colors.destructiveMuted
      : colors.primaryMuted;

  const textColor =
    variant === 'success'
      ? colors.success
      : variant === 'warning'
      ? colors.warning
      : variant === 'error'
      ? colors.error
      : colors.primary;

  return (
    <View
      style={[styles.container, { backgroundColor }, style]}
      accessibilityRole="alert"
      accessibilityLabel={message}
    >
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  text: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
});
