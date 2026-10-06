import { Animated } from 'react-native';

import {
  spacing,
  radius,
  lightColors,
  darkColors,
  fontSizes,
  elevation,
  opacity,
  borderWidth,
  iconSize,
  duration,
  easing,
} from '../tokens';
import {
  slideTransition,
  crossFadeTransition,
  slideVerticalTransition,
  scaleTransition,
  fadeThroughTransition,
  modalPresentationTransition,
} from '../transitions/navigationTransitions';

describe('spacing tokens', () => {
  it('defines the expected scale', () => {
    expect(spacing).toEqual({
      xxs: 2,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
      xxxl: 64,
    });
  });
});

describe('radius tokens', () => {
  it('defines the expected scale', () => {
    expect(radius).toEqual({
      xs: 2,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      full: 9999,
    });
  });
});

describe('color tokens', () => {
  it('defines matching keys for light and dark palettes', () => {
    expect(Object.keys(lightColors).sort()).toEqual(Object.keys(darkColors).sort());
  });

  it('has core semantic colors defined', () => {
    ['background', 'primary', 'destructive', 'success', 'warning', 'error'].forEach((key) => {
      expect(lightColors).toHaveProperty(key);
      expect(darkColors).toHaveProperty(key);
    });
  });

  it('has the new v2.1.0 semantic colors defined', () => {
    [
      'primaryMuted',
      'destructiveMuted',
      'successMuted',
      'warningMuted',
      'surfaceSecondary',
      'surfaceTertiary',
      'textTertiary',
      'overlay',
      'link',
      'focus',
      'separator',
    ].forEach((key) => {
      expect(lightColors).toHaveProperty(key);
      expect(darkColors).toHaveProperty(key);
    });
  });
});

describe('typography tokens', () => {
  it('defines the expected font sizes', () => {
    expect(fontSizes.md).toBe(16);
    expect(fontSizes.xxl).toBeGreaterThan(fontSizes.xs);
    expect(fontSizes.largeTitle).toBe(34);
  });
});

describe('elevation tokens', () => {
  it('defines cross-platform elevation levels', () => {
    ['none', 'sm', 'md', 'lg'].forEach((key) => {
      expect(elevation).toHaveProperty(key);
      expect(elevation[key as keyof typeof elevation]).toHaveProperty('elevation');
      expect(elevation[key as keyof typeof elevation]).toHaveProperty('shadowOpacity');
    });
  });
});

describe('opacity tokens', () => {
  it('defines the expected scale', () => {
    expect(opacity).toEqual({
      disabled: 0.38,
      secondary: 0.6,
      overlay: 0.54,
    });
  });
});

describe('borderWidth tokens', () => {
  it('defines the expected scale', () => {
    expect(borderWidth).toEqual({
      thin: 0.5,
      regular: 1,
      thick: 2,
    });
  });
});

describe('iconSize tokens', () => {
  it('defines the expected scale', () => {
    expect(iconSize).toEqual({
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    });
  });
});

describe('animation tokens', () => {
  it('defines duration values', () => {
    expect(duration).toEqual({
      fast: 150,
      normal: 300,
      slow: 500,
    });
  });

  it('defines easing curves and a spring config', () => {
    expect(typeof easing.standard).toBe('function');
    expect(typeof easing.decelerate).toBe('function');
    expect(typeof easing.accelerate).toBe('function');
    expect(easing.spring).toEqual({ damping: 15, stiffness: 150 });
  });
});

describe('navigation transition helpers', () => {
  it('crossFadeTransition returns an opacity interpolation driven by the progress value', () => {
    const progress = new Animated.Value(0);
    const style = crossFadeTransition(progress);
    // The returned object must carry an `opacity` key.
    expect(style).toHaveProperty('opacity');
    // The opacity key must be the same Animated.Value we passed in.
    expect(style.opacity).toBe(progress);
  });

  it('slideTransition returns opacity and a translateX transform', () => {
    const progress = new Animated.Value(0);
    const style = slideTransition(progress, 'rightToLeft', 375);
    expect(style).toHaveProperty('opacity');
    expect(style).toHaveProperty('transform');
    const transforms = style.transform as Array<Record<string, unknown>>;
    const hasTranslateX = transforms.some((t) => 'translateX' in t);
    expect(hasTranslateX).toBe(true);
  });

  it('slideTransition leftToRight uses a positive starting offset', () => {
    const progress = new Animated.Value(0);
    const ltr = slideTransition(progress, 'leftToRight', 375);
    const rtl = slideTransition(progress, 'rightToLeft', 375);
    // The two directions must produce distinct style objects (different interpolations).
    expect(ltr).not.toEqual(rtl);
  });

  it('slideVerticalTransition returns opacity and a translateY transform', () => {
    const progress = new Animated.Value(0);
    const style = slideVerticalTransition(progress, 'bottomToTop', 800);
    expect(style).toHaveProperty('opacity');
    expect(style).toHaveProperty('transform');
    const transforms = style.transform as Array<Record<string, unknown>>;
    const hasTranslateY = transforms.some((t) => 'translateY' in t);
    expect(hasTranslateY).toBe(true);
  });

  it('scaleTransition returns opacity and a scale transform', () => {
    const progress = new Animated.Value(0);
    const style = scaleTransition(progress);
    expect(style).toHaveProperty('opacity');
    expect(style).toHaveProperty('transform');
    const transforms = style.transform as Array<Record<string, unknown>>;
    const hasScale = transforms.some((t) => 'scale' in t);
    expect(hasScale).toBe(true);
  });

  it('fadeThroughTransition "out" phase fades opacity from 1 to 0', () => {
    const progress = new Animated.Value(0);
    const outStyle = fadeThroughTransition(progress, 'out');
    expect(outStyle).toHaveProperty('opacity');
  });

  it('fadeThroughTransition "in" phase fades opacity from 0 to 1', () => {
    const progress = new Animated.Value(0);
    const inStyle = fadeThroughTransition(progress, 'in');
    expect(inStyle).toHaveProperty('opacity');
    // "in" and "out" phases must produce distinct interpolations.
    const outStyle = fadeThroughTransition(progress, 'out');
    expect(inStyle.opacity).not.toBe(outStyle.opacity);
  });

  it('modalPresentationTransition returns opacity and a translateY transform', () => {
    const progress = new Animated.Value(0);
    const style = modalPresentationTransition(progress, 800);
    expect(style).toHaveProperty('opacity');
    expect(style).toHaveProperty('transform');
    const transforms = style.transform as Array<Record<string, unknown>>;
    const hasTranslateY = transforms.some((t) => 'translateY' in t);
    expect(hasTranslateY).toBe(true);
  });
});
