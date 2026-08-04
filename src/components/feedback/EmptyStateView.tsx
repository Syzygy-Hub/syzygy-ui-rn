import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface EmptyStateViewProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  icon,
  title,
  subtitle,
  ctaLabel,
  onCtaPress,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, style]} accessibilityRole="text">
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      ) : null}
      {ctaLabel && onCtaPress ? (
        <TouchableOpacity
          onPress={onCtaPress}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}
          style={[styles.cta, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.ctaText, { color: colors.onPrimary }]}>
            {ctaLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
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
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
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
  ctaText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
});
