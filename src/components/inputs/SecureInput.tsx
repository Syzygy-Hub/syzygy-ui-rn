import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface SecureInputProps
  extends Omit<RNTextInputProps, 'style' | 'secureTextEntry'> {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const SecureInput: React.FC<SecureInputProps> = ({
  label,
  error,
  style,
  accessibilityLabel,
  ...rest
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [visible, setVisible] = useState(false);
  const hasError = Boolean(error);

  return (
    <View style={style}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.surface,
            borderColor: hasError ? colors.error : colors.border,
          },
        ]}
      >
        <RNTextInput
          accessibilityLabel={accessibilityLabel ?? label}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!visible}
          style={[styles.input, { color: colors.textPrimary }]}
          {...rest}
        />
        <TouchableOpacity
          onPress={() => setVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}
          style={styles.toggle}
        >
          <Text style={{ color: colors.primary, fontWeight: fontWeights.medium }}>
            {visible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
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
  inputRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.md,
    minHeight: 44,
  },
  toggle: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
