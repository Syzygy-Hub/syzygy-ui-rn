import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface BreadcrumbItem {
  label: string;
  onPress: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  style?: StyleProp<ViewStyle>;
}

/** A horizontal trail of tappable navigation labels, separated by the `separator` color token. */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index} style={styles.itemRow}>
            <TouchableOpacity
              onPress={item.onPress}
              disabled={isLast}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <Text style={{ color: isLast ? colors.textPrimary : colors.link, fontSize: fontSizes.sm }}>
                {item.label}
              </Text>
            </TouchableOpacity>
            {!isLast ? (
              <Text style={[styles.separator, { color: colors.separator }]}>{'›'}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: spacing.xs,
    fontSize: fontSizes.sm,
  },
});
