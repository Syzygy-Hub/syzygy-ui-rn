export const borderWidth = {
  thin: 0.5,
  regular: 1,
  thick: 2,
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
