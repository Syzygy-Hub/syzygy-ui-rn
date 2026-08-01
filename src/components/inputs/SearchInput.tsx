import React, { useEffect, useRef } from 'react';
import {
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

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onSearchTextChanged?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A search field with a leading icon, trailing clear button, and built-in
 * debounce. Named `SearchInput` to match this library's `*Input` naming
 * convention (see `TextInput`/`SecureInput`).
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  debounceMs = 300,
  onSearchTextChanged,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!onSearchTextChanged) return;
    if (timer.current !== undefined) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearchTextChanged(value), debounceMs);
    return () => {
      if (timer.current !== undefined) clearTimeout(timer.current);
    };
  }, [value, debounceMs, onSearchTextChanged]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
    >
      <Text style={{ color: colors.textSecondary }}>{'\u{1F50D}'}</Text>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        style={[styles.input, { color: colors.textPrimary }]}
      />
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={styles.clear}
        >
          <Text style={{ color: colors.textSecondary }}>{'✕'}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.md,
    minHeight: 44,
    marginLeft: spacing.xs,
  },
  clear: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
