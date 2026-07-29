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
import { fontSizes, fontWeights } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  style,
  accessibilityLabel,
  ...rest
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const hasError = Boolean(error);

  return (
    <View style={style}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <RNTextInput
        accessibilityLabel={accessibilityLabel ?? label}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: hasError ? colors.error : colors.border,
            color: colors.textPrimary,
          },
        ]}
        {...rest}
      />
      {hasError ? (
        <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      ) : null}
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
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: fontSizes.md,
  },
  error: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
