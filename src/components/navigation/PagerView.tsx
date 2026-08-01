import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

export interface PagerViewProps {
  onPageChange?: (page: number) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Swipeable, paged content — e.g. onboarding screens or an image carousel.
 * Distinct from `TabBar`, which is navigation chrome; this has no chrome of
 * its own, just paged content via a horizontally-paging `ScrollView`.
 */
export const PagerView: React.FC<PagerViewProps> = ({ onPageChange, children, style }) => {
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onPageChange) return;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const page = Math.round(contentOffset.x / layoutMeasurement.width);
    onPageChange(page);
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
      style={[styles.container, style]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
