import { Animated } from 'react-native';

/**
 * Reusable `Animated`-driven transition helpers for common
 * navigation/presentation motion. Each returns an interpolated style object
 * to spread onto an `Animated.View`, driven by an `Animated.Value` that the
 * caller animates from 0 to 1 with `Animated.timing`.
 */

export type HorizontalDirection = 'leftToRight' | 'rightToLeft';

/** Slides content in/out horizontally as `progress` animates 0 -> 1. */
export const slideTransition = (progress: Animated.Value, direction: HorizontalDirection, width: number) => {
  const sign = direction === 'leftToRight' ? 1 : -1;
  return {
    opacity: progress,
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [sign * width, 0],
        }),
      },
    ],
  };
};

/** A plain cross-fade as `progress` animates 0 -> 1. */
export const crossFadeTransition = (progress: Animated.Value) => ({
  opacity: progress,
});

export type VerticalDirection = 'topToBottom' | 'bottomToTop';

/** Slides content in/out vertically as `progress` animates 0 -> 1. */
export const slideVerticalTransition = (
  progress: Animated.Value,
  direction: VerticalDirection,
  height: number
) => {
  const sign = direction === 'topToBottom' ? -1 : 1;
  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [sign * height, 0],
        }),
      },
    ],
  };
};

/** A slide-up-and-fade transition suited to modal/sheet presentation. */
export const modalPresentationTransition = (progress: Animated.Value, height: number) => ({
  opacity: progress,
  transform: [
    {
      translateY: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
      }),
    },
  ],
});
