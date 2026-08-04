import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface PagerViewProps {
  onPageChange?: (page: number) => void;
  /**
   * When provided, scrolls the pager to the given zero-based page index.
   * Setting this prop puts the component in *controlled* mode. The host is
   * responsible for keeping it in sync with `onPageChange` callbacks.
   */
  currentPage?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Swipeable, paged content — e.g. onboarding screens or an image carousel.
 * Distinct from `TabBar`, which is navigation chrome; this has no chrome of
 * its own, just paged content via a horizontally-paging `ScrollView`.
 *
 * Pass `currentPage` to enter controlled mode, where the host drives which
 * page is shown programmatically in addition to (or instead of) swipe input.
 */
export const PagerView: React.FC<PagerViewProps> = ({ onPageChange, currentPage, children, style }) => {
  const scrollRef = useRef<ScrollView>(null);
  const layoutWidth = useRef<number>(0);
  // Guards against re-firing onPageChange during a programmatic scroll.
  const isScrollingProgrammatically = useRef(false);

  const [, setLayoutReady] = useState(false);

  const handleLayout = (e: LayoutChangeEvent) => {
    layoutWidth.current = e.nativeEvent.layout.width;
    setLayoutReady(true); // trigger a re-render so the effect can fire after layout
  };

  useEffect(() => {
    if (currentPage == null || layoutWidth.current === 0) return;
    isScrollingProgrammatically.current = true;
    scrollRef.current?.scrollTo({ x: currentPage * layoutWidth.current, animated: true });
  }, [currentPage]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollingProgrammatically.current) {
      isScrollingProgrammatically.current = false;
      return;
    }
    if (!onPageChange) return;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const page = Math.round(contentOffset.x / layoutMeasurement.width);
    onPageChange(page);
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
      onLayout={handleLayout}
      style={[styles.container, style]}
      accessibilityRole="adjustable"
      accessibilityLabel="Page viewer"
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
