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
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface PhoneCountry {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

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
  value: string;
  onChangeText: (raw: string, formatted: string) => void;
  countries?: PhoneCountry[];
  selectedCountryCode?: string;
  onCountryChange?: (country: PhoneCountry) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

const stripToDigits = (text: string) => text.replace(/[^0-9]/g, '');

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  countries = DEFAULT_PHONE_COUNTRIES,
  selectedCountryCode,
  onCountryChange,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
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
      <View
        style={[
          styles.row,
          {
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setPickerOpen(true)}
          accessibilityRole="button"
          accessibilityLabel={`Country code, ${country.name}, ${country.dialCode}`}
          style={[styles.prefix, { paddingHorizontal: theme.spacing.sm }]}
        >
          <Text style={{ color: theme.colors.textPrimary }}>{`${country.flag} ${country.dialCode}`}</Text>
        </TouchableOpacity>
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        <RNTextInput
          value={stripToDigits(value)}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          placeholder="Phone number"
          placeholderTextColor={theme.colors.textSecondary}
          accessibilityLabel={accessibilityLabel ?? 'Phone number'}
          style={[
            styles.input,
            {
              paddingHorizontal: theme.spacing.sm,
              fontSize: theme.typography.callout.fontSize,
              color: theme.colors.textPrimary,
            },
          ]}
        />
      </View>
      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable style={[styles.backdrop, { backgroundColor: `rgba(0,0,0,${theme.colors.overlayAlpha})` }]} onPress={() => setPickerOpen(false)}>
          <View
            style={[
              styles.sheet,
              {
                borderTopLeftRadius: theme.radius.lg,
                borderTopRightRadius: theme.radius.lg,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCountrySelect(item)}
                  style={[styles.option, { paddingHorizontal: theme.spacing.md }]}
                >
                  <Text
                    style={{ color: theme.colors.textPrimary }}
                  >{`${item.flag}  ${item.name} (${item.dialCode})`}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    minHeight: 44,
    justifyContent: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
  },
  input: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '60%',
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
  },
});
