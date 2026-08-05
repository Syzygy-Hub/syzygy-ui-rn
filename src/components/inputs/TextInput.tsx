import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  style,
  accessibilityLabel,
  maxLength,
  value,
  theme: themeProp,
  ...rest
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const hasError = Boolean(error);

  return (
    <View style={style}>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.footnote.fontSize,
            marginBottom: theme.spacing.xs,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
      <RNTextInput
        accessibilityLabel={accessibilityLabel ?? label}
        placeholderTextColor={theme.colors.textSecondary}
        style={[
          styles.input,
          {
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.md,
            fontSize: theme.typography.callout.fontSize,
            backgroundColor: theme.colors.surface,
            borderColor: hasError ? theme.colors.error : theme.colors.border,
            color: theme.colors.textPrimary,
          },
        ]}
        maxLength={maxLength}
        value={value}
        {...rest}
      />
      {hasError ? (
        <Text
          style={[
            styles.error,
            {
              fontSize: theme.typography.caption.fontSize,
              marginTop: theme.spacing.xs,
              color: theme.colors.error,
            },
          ]}
        >
          {error}
        </Text>
      ) : null}
      {maxLength != null ? (
        <Text
          style={[
            styles.counter,
            {
              fontSize: theme.typography.caption.fontSize,
              marginTop: theme.spacing.xs,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {`${(value ?? '').length}/${maxLength}`}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {},
  input: {
    minHeight: 44,
    borderWidth: 1,
  },
  error: {},
  counter: {
    textAlign: 'right',
  },
});
