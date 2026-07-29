import { spacing, radius, lightColors, darkColors, fontSizes } from '../tokens';

describe('spacing tokens', () => {
  it('defines the expected scale', () => {
    expect(spacing).toEqual({
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    });
  });
});

describe('radius tokens', () => {
  it('defines the expected scale', () => {
    expect(radius).toEqual({
      sm: 4,
      md: 8,
      lg: 16,
      full: 9999,
    });
  });
});

describe('color tokens', () => {
  it('defines matching keys for light and dark palettes', () => {
    expect(Object.keys(lightColors).sort()).toEqual(Object.keys(darkColors).sort());
  });

  it('has core semantic colors defined', () => {
    ['background', 'primary', 'destructive', 'success', 'warning', 'error'].forEach(
      (key) => {
        expect(lightColors).toHaveProperty(key);
        expect(darkColors).toHaveProperty(key);
      }
    );
  });
});

describe('typography tokens', () => {
  it('defines the expected font sizes', () => {
    expect(fontSizes.md).toBe(16);
    expect(fontSizes.xxl).toBeGreaterThan(fontSizes.xs);
  });
});
