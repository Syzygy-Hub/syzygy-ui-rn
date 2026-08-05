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

export interface TextAreaProps extends Omit<RNTextInputProps, 'style' | 'multiline'> {
  label: string;
  error?: string;
  minLines?: number;
  maxLines?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  minLines = 3,
  maxLines = 6,
  style,
  accessibilityLabel,
  value,
  theme: themeProp,
  ...rest
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const hasError = Boolean(error);
  // Use body lineHeight (22) for min/maxHeight calculation
  const lineHeight = theme.typography.body.lineHeight ?? 22;
  const minHeight = (lineHeight as number) * minLines + theme.spacing.sm * 2;
  const maxHeight = (lineHeight as number) * maxLines + theme.spacing.sm * 2;

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
        multiline
        numberOfLines={minLines}
        style={[
          styles.input,
          {
            minHeight,
            maxHeight,
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            fontSize: theme.typography.callout.fontSize,
            backgroundColor: theme.colors.surface,
            borderColor: hasError ? theme.colors.error : theme.colors.border,
            color: theme.colors.textPrimary,
          },
        ]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  label: {},
  input: {
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  error: {},
});
