import { SyzygyAnimation, defaultAnimation } from './SyzygyAnimation';
import { SyzygyColors, defaultColors, darkThemeColors, highContrastColors } from './SyzygyColors';
import { SyzygyElevation, defaultElevation } from './SyzygyElevation';
import { SyzygyRadius, defaultRadius, sharpRadius } from './SyzygyRadius';
import { SyzygySpacing, defaultSpacing } from './SyzygySpacing';
import { SyzygyTypography, defaultTypography, highContrastTypography } from './SyzygyTypography';

export interface SyzygyTheme {
  colors: SyzygyColors;
  radius: SyzygyRadius;
  typography: SyzygyTypography;
  spacing: SyzygySpacing;
  elevation: SyzygyElevation;
  animation: SyzygyAnimation;
}

export const defaultTheme: SyzygyTheme = {
  colors: defaultColors,
  radius: defaultRadius,
  typography: defaultTypography,
  spacing: defaultSpacing,
  elevation: defaultElevation,
  animation: defaultAnimation,
};

export const darkTheme: SyzygyTheme = {
  colors: darkThemeColors,
  radius: defaultRadius,
  typography: defaultTypography,
  spacing: defaultSpacing,
  elevation: defaultElevation,
  animation: defaultAnimation,
};

export const highContrastTheme: SyzygyTheme = {
  colors: highContrastColors,
  radius: sharpRadius,
  typography: highContrastTypography,
  spacing: defaultSpacing,
  elevation: defaultElevation,
  animation: defaultAnimation,
};
