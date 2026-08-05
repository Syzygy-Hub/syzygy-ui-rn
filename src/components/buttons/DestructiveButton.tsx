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

export interface DestructiveButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const DestructiveButton: React.FC<DestructiveButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[
        styles.base,
        {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.radius.md,
          backgroundColor: isDisabled ? theme.colors.disabled : theme.colors.destructive,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.onDestructive} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: theme.typography.callout.fontSize,
              fontWeight: theme.typography.headline.fontWeight,
              color: isDisabled ? theme.colors.textDisabled : theme.colors.onDestructive,
            },
          ]}
        >
          {title}
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
