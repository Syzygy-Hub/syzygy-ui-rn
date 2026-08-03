import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface PageControlProps {
  pageCount: number;
  currentPage: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row of dots indicating the current page position within a paged view
 * (also known as `DotIndicator`), typically used alongside `PagerView` to
 * mirror its current page.
 *
 * This is a read-only display, not a tappable control — a page indicator is
 * meant to reflect state driven by the paged content (e.g. a swipe gesture
 * on `PagerView`), not to be an independent input. Consumers that want
 * tap-to-navigate should wire their own `TouchableOpacity` around each dot,
 * or drive `PagerView`'s page directly.
 */
export const PageControl: React.FC<PageControlProps> = ({
  pageCount,
  currentPage,
  activeColor,
  inactiveColor,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const active = activeColor ?? colors.primary;
  const inactive = inactiveColor ?? colors.border;

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={`Page ${currentPage + 1} of ${pageCount}`}
    >
      {Array.from({ length: pageCount }, (_, index) => (
        <View
          key={index}
          style={[styles.dot, { backgroundColor: index === currentPage ? active : inactive }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: spacing.xxs,
  },
});
