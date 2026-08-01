import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export type ToastVariant = 'success' | 'warning' | 'error';

export interface ToastViewProps {
  message: string;
  variant?: ToastVariant;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const ToastView: React.FC<ToastViewProps> = ({
  message,
  variant = 'success',
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const backgroundColor =
    variant === 'success'
      ? colors.success
      : variant === 'warning'
      ? colors.warning
      : colors.error;

  const textColor =
    variant === 'success'
      ? colors.successText
      : variant === 'warning'
      ? colors.warningText
      : colors.errorText;

  return (
    <View
      style={[styles.container, { backgroundColor }, style]}
      accessibilityRole="alert"
      accessibilityLabel={accessibilityLabel ?? message}
    >
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
  },
  text: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
});
