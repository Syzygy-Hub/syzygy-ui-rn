import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

import { TabBarItem } from './TabBarItem';

export interface TabBarProps<T> {
  items: TabBarItem<T>[];
  selection: T;
  onSelectionChange: (tag: T) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An edge-to-edge, icon-and-label tab bar. Presentational only — this
 * library has no navigation dependency, so wire `onSelectionChange` into
 * your own navigator.
 */
export function TabBar<T>({ items, selection, onSelectionChange, style }: TabBarProps<T>) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderTopColor: colors.border },
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
            <Text style={{ color: selected ? colors.primary : colors.textSecondary, fontSize: fontSizes.xs }}>
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
    paddingTop: spacing.xs,
  },
  item: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
