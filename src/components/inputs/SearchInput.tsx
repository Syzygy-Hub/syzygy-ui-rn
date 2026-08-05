import React, { useEffect, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceMs?: number;
  onSearchTextChanged?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  debounceMs = 300,
  onSearchTextChanged,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
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
        {
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.sm,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <Text style={{ color: theme.colors.textSecondary }}>{'\u{1F50D}'}</Text>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        style={[
          styles.input,
          {
            marginLeft: theme.spacing.xs,
            fontSize: theme.typography.callout.fontSize,
            color: theme.colors.textPrimary,
          },
        ]}
      />
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          style={styles.clear}
        >
          <Text style={{ color: theme.colors.textSecondary }}>{'✕'}</Text>
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
  },
  input: {
    flex: 1,
    minHeight: 44,
  },
  clear: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
