import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface SnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  isVisible: boolean;
  onDismiss: () => void;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A bottom-anchored temporary message with an optional action button.
 * Presentational, like `ToastView` — the consumer drives `isVisible` from
 * their own state; this component auto-dismisses itself by calling
 * `onDismiss` after `duration` ms while visible.
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  actionLabel,
  onAction,
  isVisible,
  onDismiss,
  duration = 3000,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

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
      style={[styles.container, { backgroundColor: colors.textPrimary }, style]}
      accessibilityRole="alert"
      accessibilityLabel={message}
      accessibilityLiveRegion="polite"
    >
      <Text style={[styles.message, { color: colors.textInverse }]}>{message}</Text>
      {actionLabel ? (
        <TouchableOpacity onPress={onAction} accessibilityRole="button" accessibilityLabel={actionLabel}>
          <Text style={[styles.action, { color: colors.primary }]}>{actionLabel}</Text>
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
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  message: {
    flexShrink: 1,
    fontSize: fontSizes.sm,
  },
  action: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    marginLeft: spacing.md,
  },
});
