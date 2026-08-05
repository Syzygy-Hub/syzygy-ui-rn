import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface LoadingButtonProps {
  label: string;
  isLoading: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

/** A primary button that swaps its label for a spinner while `isLoading`, and disables itself meanwhile. */
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  label,
  isLoading,
  onPress,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isLoading, busy: isLoading }}
      style={[
        styles.base,
        {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.radius.md,
          backgroundColor: isLoading ? theme.colors.disabled : theme.colors.primary,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.onPrimary} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: theme.typography.callout.fontSize,
              fontWeight: theme.typography.headline.fontWeight,
              color: theme.colors.onPrimary,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});
