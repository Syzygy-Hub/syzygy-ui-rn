import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

import { TabBarItem } from './TabBarItem';

export interface TabBarProps<T> {
  items: TabBarItem<T>[];
  selection: T;
  onSelectionChange: (tag: T) => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export function TabBar<T>({
  items,
  selection,
  onSelectionChange,
  style,
  theme: themeProp,
}: TabBarProps<T>) {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: theme.spacing.xs,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        style,
      ]}
    >
      {items.map((item, index) => {
        const selected = item.tag === selection;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectionChange(item.tag)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            style={styles.item}
          >
            {item.icon}
            <Text
              style={[
                styles.itemLabel,
                {
                  fontSize: theme.typography.caption.fontSize,
                  color: selected ? theme.colors.primary : theme.colors.textSecondary,
                },
              ]}
            >
              {item.label}
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
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  item: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {},
});
