import React from 'react';
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** A generic composable wrapper adding a label, and an error/helper caption, around any input. */
export const FormField: React.FC<FormFieldProps> = ({ label, error, helperText, children, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const hasError = Boolean(error);

  return (
    <View style={style}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      {children}
      {hasError ? (
        <Text style={[styles.caption, { color: colors.error }]}>{error}</Text>
      ) : helperText ? (
        <Text style={[styles.caption, { color: colors.textSecondary }]}>{helperText}</Text>
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
  caption: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
