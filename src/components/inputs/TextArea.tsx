import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights, lineHeights } from '../../tokens/typography';

export interface TextAreaProps extends Omit<RNTextInputProps, 'style' | 'multiline'> {
  label: string;
  error?: string;
  minLines?: number;
  maxLines?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** A multi-line text input, matching `TextInput`'s visual conventions. */
export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  minLines = 3,
  maxLines = 6,
  style,
  accessibilityLabel,
  value,
  ...rest
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const hasError = Boolean(error);
  const minHeight = lineHeights.md * minLines + spacing.sm * 2;
  const maxHeight = lineHeights.md * maxLines + spacing.sm * 2;

  return (
    <View style={style}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <RNTextInput
        accessibilityLabel={accessibilityLabel ?? label}
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={minLines}
        style={[
          styles.input,
          {
            minHeight,
            maxHeight,
            backgroundColor: colors.surface,
            borderColor: hasError ? colors.error : colors.border,
            color: colors.textPrimary,
          },
        ]}
        value={value}
        {...rest}
      />
      {hasError ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSizes.md,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
