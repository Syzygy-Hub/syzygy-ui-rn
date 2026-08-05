import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

import { TabBarItem } from './TabBarItem';

export interface FloatingTabBarProps<T> {
  items: TabBarItem<T>[];
  selection: T;
  onSelectionChange: (tag: T) => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export function FloatingTabBar<T>({
  items,
  selection,
  onSelectionChange,
  style,
  theme: themeProp,
}: FloatingTabBarProps<T>) {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        { ...theme.elevation.md },
        {
          borderRadius: theme.radius.full,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.xs,
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
              {
                borderRadius: theme.radius.full,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
              },
              selected ? { backgroundColor: theme.colors.primaryMuted } : null,
            ]}
          >
            {item.icon}
            <Text
              style={{
                color: selected ? theme.colors.primary : theme.colors.textSecondary,
                fontSize: theme.typography.caption.fontSize,
                marginTop: theme.spacing.xxs,
              }}
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
    alignSelf: 'center',
  },
  item: {
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
