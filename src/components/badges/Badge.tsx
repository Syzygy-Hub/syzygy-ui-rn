import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'success'
      ? theme.colors.success
      : variant === 'warning'
      ? theme.colors.warning
      : theme.colors.error;

  const textColor =
    variant === 'primary'
      ? theme.colors.onPrimary
      : variant === 'success'
      ? theme.colors.onSuccess
      : variant === 'warning'
      ? theme.colors.onWarning
      : theme.colors.onError;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.radius.full,
          backgroundColor,
        },
        style,
      ]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? text}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: theme.typography.caption.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            color: textColor,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {},
});
