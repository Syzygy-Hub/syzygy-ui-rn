import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface PhoneCountry {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

/**
 * A small, deliberately minimal starter set of 15 real countries with
 * correct flag emoji and dial codes. This is NOT an exhaustive ISO list —
 * consumers with broader needs should pass their own list via the
 * `countries` prop.
 */
export const DEFAULT_PHONE_COUNTRIES: PhoneCountry[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '+64' },
];

export interface PhoneInputProps {
  /** Formatted display string, e.g. "🇺🇸 +1 555 123 4567". */
  value: string;
  /** Fires with both the raw digits-only number and the formatted display string. */
  onChangeText: (raw: string, formatted: string) => void;
  countries?: PhoneCountry[];
  selectedCountryCode?: string;
  onCountryChange?: (country: PhoneCountry) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const stripToDigits = (text: string) => text.replace(/[^0-9]/g, '');

/**
 * A phone number field with a tappable country-code prefix selector
 * (flag emoji + dial code) and a numeric keypad. Exposes both a formatted
 * display string and the raw digits-only number via `onChangeText`.
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  countries = DEFAULT_PHONE_COUNTRIES,
  selectedCountryCode,
  onCountryChange,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [country, setCountry] = useState<PhoneCountry>(
    countries.find((c) => c.code === selectedCountryCode) ?? countries[0]
  );

  const handleCountrySelect = (next: PhoneCountry) => {
    setCountry(next);
    setPickerOpen(false);
    onCountryChange?.(next);
    const raw = stripToDigits(value);
    onChangeText(raw, `${next.flag} ${next.dialCode} ${raw}`);
  };

  const handleChangeText = (text: string) => {
    const raw = stripToDigits(text);
    onChangeText(raw, `${country.flag} ${country.dialCode} ${raw}`);
  };

  return (
    <View style={style}>
      <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => setPickerOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`Country code, ${country.name}, ${country.dialCode}`}
          style={styles.prefix}
        >
          <Text style={{ color: colors.textPrimary }}>{`${country.flag} ${country.dialCode}`}</Text>
        </TouchableOpacity>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <RNTextInput
          value={stripToDigits(value)}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          placeholder="Phone number"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel={accessibilityLabel ?? 'Phone number'}
          style={[styles.input, { color: colors.textPrimary }]}
        />
      </View>
      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setPickerOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCountrySelect(item)} style={styles.option}>
                  <Text style={{ color: colors.textPrimary }}>{`${item.flag}  ${item.name} (${item.dialCode})`}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    paddingHorizontal: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginVertical: spacing.xs,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    fontSize: fontSizes.md,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: '60%',
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
});
