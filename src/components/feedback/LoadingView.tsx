import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface LoadingViewProps {
  message?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  message,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[styles.container, { padding: theme.spacing.lg }, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? message ?? 'Loading'}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {message ? (
        <Text
          style={[
            styles.message,
            {
              marginTop: theme.spacing.sm,
              fontSize: theme.typography.footnote.fontSize,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
