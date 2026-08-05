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

import { SyzygyTheme } from '../../theme';

export interface PagerViewProps {
  onPageChange?: (page: number) => void;
  /**
   * When provided, scrolls the pager to the given zero-based page index.
   * Setting this prop puts the component in *controlled* mode.
   */
  currentPage?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const PagerView: React.FC<PagerViewProps> = ({
  onPageChange,
  currentPage,
  children,
  style,
  // theme prop accepted for API consistency
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: _theme,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const layoutWidth = useRef<number>(0);
  const isScrollingProgrammatically = useRef(false);
  const [, setLayoutReady] = useState(false);

  const handleLayout = (e: LayoutChangeEvent) => {
    layoutWidth.current = e.nativeEvent.layout.width;
    setLayoutReady(true);
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
