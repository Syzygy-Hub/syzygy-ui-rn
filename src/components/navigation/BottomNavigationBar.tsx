import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';

import { TabBarItem } from './TabBarItem';

export interface BottomNavigationBarProps<T> {
  items: TabBarItem<T>[];
  selection: T;
  onSelectionChange: (tag: T) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A floating, icon-only bottom navigation pill — a visual alternative to
 * `TabBar` for screens that want a compact, inset navigation surface.
 */
export function BottomNavigationBar<T>({
  items,
  selection,
  onSelectionChange,
  style,
}: BottomNavigationBarProps<T>) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
      {items.map((item, index) => {
        const selected = item.tag === selection;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectionChange(item.tag)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            style={[styles.item, selected ? { backgroundColor: colors.primary } : null]}
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
    borderRadius: radius.full,
    padding: spacing.xs,
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
