import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface BreadcrumbItem {
  label: string;
  onPress: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

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
              <Text
                style={{
                  color: isLast ? theme.colors.textPrimary : theme.colors.link,
                  fontSize: theme.typography.footnote.fontSize,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
            {!isLast ? (
              <Text
                style={[
                  styles.separator,
                  {
                    marginHorizontal: theme.spacing.xs,
                    fontSize: theme.typography.footnote.fontSize,
                    color: theme.colors.separator,
                  },
                ]}
              >
                {'›'}
              </Text>
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
  separator: {},
});
