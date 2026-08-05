import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  children,
  style,
  theme: themeProp,
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
      {children}
      {hasError ? (
        <Text
          style={[
            styles.caption,
            {
              fontSize: theme.typography.caption.fontSize,
              marginTop: theme.spacing.xs,
              color: theme.colors.error,
            },
          ]}
        >
          {error}
        </Text>
      ) : helperText ? (
        <Text
          style={[
            styles.caption,
            {
              fontSize: theme.typography.caption.fontSize,
              marginTop: theme.spacing.xs,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {},
  caption: {},
});
