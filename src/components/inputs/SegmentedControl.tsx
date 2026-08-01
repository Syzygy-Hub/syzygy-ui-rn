import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface SegmentedControlProps<T> {
  options: T[];
  selection: T;
  onSelectionChange: (option: T) => void;
  optionTitle: (option: T) => string;
  style?: StyleProp<ViewStyle>;
}

/**
 * An inline, single-row segmented picker for switching between a small set
 * of content states — distinct from `TabBar`/`BottomNavigationBar`, which
 * are for primary app navigation.
 */
export function SegmentedControl<T>({
  options,
  selection,
  onSelectionChange,
  optionTitle,
  style,
}: SegmentedControlProps<T>) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {options.map((option, index) => {
        const selected = option === selection;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectionChange(option)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={optionTitle(option)}
            style={[styles.segment, selected ? { backgroundColor: colors.primary } : null]}
          >
            <Text style={{ color: selected ? colors.primaryText : colors.textPrimary, fontSize: fontSizes.sm }}>
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
    borderRadius: radius.md,
    padding: 2,
  },
  segment: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
  },
});
