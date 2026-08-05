import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface EmptyStateViewProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  icon,
  title,
  subtitle,
  ctaLabel,
  onCtaPress,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[styles.container, { padding: theme.spacing.xl }, style]}
      accessibilityRole="text"
    >
      {icon ? <View style={[styles.icon, { marginBottom: theme.spacing.md }]}>{icon}</View> : null}
      <Text
        style={[
          styles.title,
          {
            fontSize: theme.typography.body.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: theme.typography.footnote.fontSize,
              marginTop: theme.spacing.xs,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
      {ctaLabel && onCtaPress ? (
        <TouchableOpacity
          onPress={onCtaPress}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel}
          style={[
            styles.cta,
            {
              paddingHorizontal: theme.spacing.lg,
              borderRadius: theme.radius.md,
              marginTop: theme.spacing.md,
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.ctaText,
              {
                fontSize: theme.typography.callout.fontSize,
                fontWeight: theme.typography.headline.fontWeight,
                color: theme.colors.onPrimary,
              },
            ]}
          >
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
  },
  icon: {},
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  cta: {
    minHeight: 44,
    justifyContent: 'center',
  },
  ctaText: {
    textAlign: 'center',
  },
});
