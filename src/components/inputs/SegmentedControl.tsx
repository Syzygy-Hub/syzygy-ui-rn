import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SegmentedControlProps<T> {
  options: T[];
  selection: T;
  onSelectionChange: (option: T) => void;
  optionTitle: (option: T) => string;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export function SegmentedControl<T>({
  options,
  selection,
  onSelectionChange,
  optionTitle,
  style,
  theme: themeProp,
}: SegmentedControlProps<T>) {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      {options.map((option, index) => {
        const selected = option === selection;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectionChange(option)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={optionTitle(option)}
            style={[
              styles.segment,
              {
                borderRadius: theme.radius.sm,
                paddingHorizontal: theme.spacing.sm,
              },
              selected ? { backgroundColor: theme.colors.primary } : null,
            ]}
          >
            <Text
              style={{
                color: selected ? theme.colors.onPrimary : theme.colors.textPrimary,
                fontSize: theme.typography.footnote.fontSize,
              }}
            >
              {optionTitle(option)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 2,
  },
  segment: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
