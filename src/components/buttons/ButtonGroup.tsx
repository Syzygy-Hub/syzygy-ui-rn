import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface ButtonGroupProps {
  options: string[];
  selectedIndices: number[];
  onSelectionChange: (selectedIndices: number[]) => void;
  multiSelect?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal segmented row of buttons. Single-select by default (tapping
 * an option replaces the selection); pass `multiSelect` to let any number of
 * options be toggled independently.
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  selectedIndices,
  onSelectionChange,
  multiSelect = false,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const handlePress = (index: number) => {
    if (multiSelect) {
      const isSelected = selectedIndices.includes(index);
      onSelectionChange(
        isSelected ? selectedIndices.filter((i) => i !== index) : [...selectedIndices, index]
      );
    } else {
      onSelectionChange([index]);
    }
  };

  return (
    <View style={[styles.container, { borderColor: colors.border }, style]}>
      {options.map((option, index) => {
        const selected = selectedIndices.includes(index);
        return (
          <TouchableOpacity
            key={option}
            onPress={() => handlePress(index)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={option}
            style={[
              styles.item,
              index > 0 ? [styles.itemDivider, { borderLeftColor: colors.border }] : null,
              selected ? { backgroundColor: colors.primary } : null,
            ]}
          >
            <Text style={[styles.itemLabel, { color: selected ? colors.primaryText : colors.textPrimary }]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  item: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDivider: {
    borderLeftWidth: 1,
  },
  itemLabel: {
    fontSize: fontSizes.sm,
  },
});
