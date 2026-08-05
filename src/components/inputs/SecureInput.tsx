import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SecureInputProps
  extends Omit<RNTextInputProps, 'style' | 'secureTextEntry'> {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const SecureInput: React.FC<SecureInputProps> = ({
  label,
  error,
  style,
  accessibilityLabel,
  theme: themeProp,
  ...rest
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [visible, setVisible] = useState(false);
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
      <View
        style={[
          styles.inputRow,
          {
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: theme.colors.surface,
            borderColor: hasError ? theme.colors.error : theme.colors.border,
          },
        ]}
      >
        <RNTextInput
          accessibilityLabel={accessibilityLabel ?? label}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={!visible}
          style={[
            styles.input,
            {
              fontSize: theme.typography.callout.fontSize,
              color: theme.colors.textPrimary,
            },
          ]}
          {...rest}
        />
        <TouchableOpacity
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          style={styles.toggle}
        >
          <Text
            style={[
              styles.toggleText,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            {visible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
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
  inputRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 44,
  },
  toggle: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {},
  toggleText: {},
});
