import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface ErrorStateViewProps {
  title: string;
  subtitle?: string;
  retryLabel?: string;
  onRetryPress: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const ErrorStateView: React.FC<ErrorStateViewProps> = ({
  title,
  subtitle,
  retryLabel = 'Retry',
  onRetryPress,
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
      <Text style={[styles.icon, { color: theme.colors.destructive }]}>{'⚠'}</Text>
      <Text
        style={[
          styles.title,
          {
            fontSize: theme.typography.body.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            marginTop: theme.spacing.sm,
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
      <TouchableOpacity
        onPress={onRetryPress}
        accessibilityRole="button"
        accessibilityLabel={retryLabel}
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
          style={{
            fontWeight: theme.typography.headline.fontWeight,
            color: theme.colors.onPrimary,
          }}
        >
          {retryLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 40, // Hardcoded: warning glyph size
  },
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
});
