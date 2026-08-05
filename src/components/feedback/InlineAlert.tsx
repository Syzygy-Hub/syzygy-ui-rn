import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export type InlineAlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface InlineAlertProps {
  message: string;
  variant: InlineAlertVariant;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const InlineAlert: React.FC<InlineAlertProps> = ({
  message,
  variant,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const backgroundColor =
    variant === 'success'
      ? theme.colors.successMuted
      : variant === 'warning'
      ? theme.colors.warningMuted
      : variant === 'error'
      ? theme.colors.destructiveMuted
      : theme.colors.primaryMuted;

  const textColor =
    variant === 'success'
      ? theme.colors.success
      : variant === 'warning'
      ? theme.colors.warning
      : variant === 'error'
      ? theme.colors.error
      : theme.colors.primary;

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
      accessibilityLabel={message}
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
  container: {},
  text: {},
});
