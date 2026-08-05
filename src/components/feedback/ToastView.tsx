import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export type ToastVariant = 'success' | 'warning' | 'error';

export interface ToastViewProps {
  message: string;
  variant?: ToastVariant;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const ToastView: React.FC<ToastViewProps> = ({
  message,
  variant = 'success',
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const backgroundColor =
    variant === 'success'
      ? theme.colors.success
      : variant === 'warning'
      ? theme.colors.warning
      : theme.colors.error;

  const textColor =
    variant === 'success'
      ? theme.colors.onSuccess
      : variant === 'warning'
      ? theme.colors.onWarning
      : theme.colors.onError;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={accessibilityLabel ?? message}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: theme.typography.footnote.fontSize,
            color: textColor,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    justifyContent: 'center',
  },
  text: {},
});
