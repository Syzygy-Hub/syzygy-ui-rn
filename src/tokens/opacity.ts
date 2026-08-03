export const opacity = {
  disabled: 0.38,
  secondary: 0.6,
  overlay: 0.54,
} as const;

export type OpacityToken = keyof typeof opacity;
