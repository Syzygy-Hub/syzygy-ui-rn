import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface CurrencyInputProps {
  value: number | null;
  onValueChange: (value: number | null) => void;
  currency?: string;
  locale?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

const parseRawNumber = (text: string): number | null => {
  const cleaned = text.replace(/[^0-9.,-]/g, '');
  if (!cleaned) return null;
  const normalized = cleaned.replace(/,(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? null : parsed;
};

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onValueChange,
  currency = 'USD',
  locale = 'en-US',
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [isFocused, setIsFocused] = useState(false);

  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const displayValue = value == null ? '' : formatter.format(value);

  const handleChangeText = (text: string) => {
    onValueChange(parseRawNumber(text));
  };

  return (
    <View style={style}>
      <RNTextInput
        value={isFocused ? (value == null ? '' : String(value)) : displayValue}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="decimal-pad"
        placeholder={formatter.format(0)}
        placeholderTextColor={theme.colors.textSecondary}
        accessibilityLabel={accessibilityLabel ?? 'Currency amount'}
        style={[
          styles.input,
          {
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.md,
            fontSize: theme.typography.callout.fontSize,
            color: theme.colors.textPrimary,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderWidth: 1,
  },
});
