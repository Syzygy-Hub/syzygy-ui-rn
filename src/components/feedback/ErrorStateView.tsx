import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface ErrorStateViewProps {
  title: string;
  subtitle?: string;
  retryLabel?: string;
  onRetryPress: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An icon, title, subtitle, and retry action for error states. Mirrors
 * `EmptyStateView`'s structure with a destructive-tinted icon and a
 * mandatory retry action.
 */
export const ErrorStateView: React.FC<ErrorStateViewProps> = ({
  title,
  subtitle,
  retryLabel = 'Retry',
  onRetryPress,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, style]} accessibilityRole="text">
      <Text style={[styles.icon, { color: colors.destructive }]}>{'⚠'}</Text>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      ) : null}
      <TouchableOpacity
        onPress={onRetryPress}
        accessibilityRole="button"
        accessibilityLabel={retryLabel}
        style={[styles.cta, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.onPrimary, fontWeight: fontWeights.semibold }}>{retryLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  cta: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
});
