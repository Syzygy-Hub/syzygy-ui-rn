import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

import { TabBarItem } from './TabBarItem';

export interface BottomNavigationBarProps<T> {
  items: TabBarItem<T>[];
  selection: T;
  onSelectionChange: (tag: T) => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export function BottomNavigationBar<T>({
  items,
  selection,
  onSelectionChange,
  style,
  theme: themeProp,
}: BottomNavigationBarProps<T>) {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.full,
          padding: theme.spacing.xs,
          backgroundColor: theme.colors.surface,
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
            style={[
              styles.item,
              selected ? { backgroundColor: theme.colors.primary } : null,
            ]}
          >
            {item.icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
