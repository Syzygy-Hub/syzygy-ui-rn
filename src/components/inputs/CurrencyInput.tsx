import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface CurrencyInputProps {
  /** The raw numeric value (not the formatted display string). */
  value: number | null;
  onValueChange: (value: number | null) => void;
  currency?: string;
  /** BCP 47 locale passed to `Intl.NumberFormat`. Defaults to 'en-US'. */
  locale?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Strips everything except digits, a single decimal separator, and a
 * leading minus sign, then parses to a number. This is a best-effort
 * approach for reversing `Intl.NumberFormat`'s currency formatting back
 * into a raw numeric value as the user types.
 */
const parseRawNumber = (text: string): number | null => {
  const cleaned = text.replace(/[^0-9.,-]/g, '');
  if (!cleaned) {
    return null;
  }
  // Normalize a trailing comma-as-decimal (some locales) to a dot, and drop
  // thousands separators.
  const normalized = cleaned.replace(/,(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isNaN(parsed) ? null : parsed;
};

/**
 * A numeric field prefixed/suffixed with a currency symbol, formatted via
 * the JS-native `Intl.NumberFormat(locale, { style: 'currency', currency })`
 * — no third-party currency-formatting library required.
 *
 * Caveat: Hermes (React Native's default JS engine) ships with a reduced
 * ICU data set by default. Full `Intl.NumberFormat` currency formatting
 * (correct symbols/grouping for arbitrary locales) requires either the
 * `hermes-intl` polyfill or building Hermes with full ICU — otherwise
 * lesser-used locale/currency combinations may fall back to a simplified
 * format. 'en-US' + 'USD' (the defaults here) work out of the box on
 * standard React Native + Hermes setups.
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onValueChange,
  currency = 'USD',
  locale = 'en-US',
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
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
        placeholderTextColor={colors.textSecondary}
        accessibilityLabel={accessibilityLabel ?? 'Currency amount'}
        style={[
          styles.input,
          { color: colors.textPrimary, borderColor: colors.border, backgroundColor: colors.surface },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: fontSizes.md,
  },
});
