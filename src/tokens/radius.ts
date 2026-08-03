export const radius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 16,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
