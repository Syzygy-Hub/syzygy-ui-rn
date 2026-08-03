import { Easing } from 'react-native';

/** Durations (ms) for use with `Animated.timing`'s `duration` option. */
export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Easing curves for use with `Animated.timing`'s `easing` option.
 *
 * `spring` is intentionally NOT an `Easing` curve: React Native's
 * `Animated.spring()` takes a physical spring configuration (tension/friction
 * or damping/stiffness), not an easing function, so it can't be represented
 * as a `(t: number) => number` curve like the others. It's exported here as
 * a plain config object — pass it as `Animated.spring(value, { ...toValue, ...easing.spring })`,
 * not as an `easing` option on `Animated.timing`.
 */
export const easing = {
  standard: Easing.inOut(Easing.ease),
  decelerate: Easing.out(Easing.ease),
  accelerate: Easing.in(Easing.ease),
  spring: { damping: 15, stiffness: 150 },
} as const;
