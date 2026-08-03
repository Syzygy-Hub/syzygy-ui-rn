import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';
import { elevation } from '../../tokens/elevation';

import { TabBarItem } from './TabBarItem';

export interface FloatingTabBarProps<T> {
  items: TabBarItem<T>[];
  selection: T;
  onSelectionChange: (tag: T) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A floating, icon-AND-label pill-style bottom navigation bar.
 *
 * This is deliberately distinct from the other two bottom-nav components,
 * filling the real gap in the 2x2 matrix of {edge-to-edge vs floating} x
 * {icon-only vs icon+label}: `TabBar` is edge-to-edge + icon-and-label,
 * `BottomNavigationBar` is floating + icon-only, so `FloatingTabBar` is
 * floating + icon-and-label — not a near-duplicate of either. Presentational
 * only, like the other nav components — wire `onSelectionChange` into your
 * own navigator.
 */
export function FloatingTabBar<T>({ items, selection, onSelectionChange, style }: FloatingTabBarProps<T>) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, elevation.md, { backgroundColor: colors.surface }, style]}>
      {items.map((item, index) => {
        const selected = item.tag === selection;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectionChange(item.tag)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            style={[styles.item, selected ? { backgroundColor: colors.primaryMuted } : null]}
          >
            {item.icon}
            <Text
              style={{
                color: selected ? colors.primary : colors.textSecondary,
                fontSize: fontSizes.xs,
                marginTop: spacing.xxs,
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
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  item: {
    minWidth: 64,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
