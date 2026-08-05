import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface ButtonGroupProps {
  options: string[];
  selectedIndices: number[];
  onSelectionChange: (selectedIndices: number[]) => void;
  multiSelect?: boolean;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
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
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

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
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.border, borderRadius: theme.radius.md },
        style,
      ]}
    >
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
              { paddingHorizontal: theme.spacing.md },
              index > 0 ? [styles.itemDivider, { borderLeftColor: theme.colors.border }] : null,
              selected ? { backgroundColor: theme.colors.primary } : null,
            ]}
          >
            <Text
              style={[
                styles.itemLabel,
                {
                  fontSize: theme.typography.footnote.fontSize,
                  color: selected ? theme.colors.onPrimary : theme.colors.textPrimary,
                },
              ]}
            >
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
    overflow: 'hidden',
  },
  item: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDivider: {
    borderLeftWidth: 1,
  },
  itemLabel: {},
});
