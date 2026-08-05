import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  isVisible: boolean;
  onDismiss: () => void;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  actionLabel,
  onAction,
  isVisible,
  onDismiss,
  duration = 3000,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onDismiss]);

  if (!isVisible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.textPrimary,
        },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLabel={message}
      accessibilityLiveRegion="polite"
    >
      <Text
        style={[
          styles.message,
          {
            fontSize: theme.typography.footnote.fontSize,
            color: theme.colors.textInverse,
          },
        ]}
      >
        {message}
      </Text>
      {actionLabel ? (
        <TouchableOpacity
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text
            style={[
              styles.action,
              {
                fontSize: theme.typography.footnote.fontSize,
                fontWeight: theme.typography.headline.fontWeight,
                marginLeft: theme.spacing.md,
                color: theme.colors.primary,
              },
            ]}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  message: {
    flexShrink: 1,
  },
  action: {},
});
