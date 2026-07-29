export type ColorScheme = 'light' | 'dark';

export interface ColorPalette {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textInverse: string;
  primary: string;
  primaryText: string;
  secondary: string;
  secondaryText: string;
  destructive: string;
  destructiveText: string;
  success: string;
  successText: string;
  warning: string;
  warningText: string;
  error: string;
  errorText: string;
  disabled: string;
  disabledText: string;
  overlay: string;
}

export const lightColors: ColorPalette = {
  background: '#FFFFFF',
  surface: '#F5F5F7',
  surfaceAlt: '#ECECEE',
  border: '#D8D8DC',
  textPrimary: '#1A1A1E',
  textSecondary: '#6B6B72',
  textInverse: '#FFFFFF',
  primary: '#2F6FED',
  primaryText: '#FFFFFF',
  secondary: '#ECECEE',
  secondaryText: '#1A1A1E',
  destructive: '#E5484D',
  destructiveText: '#FFFFFF',
  success: '#1F9254',
  successText: '#FFFFFF',
  warning: '#B7791F',
  warningText: '#FFFFFF',
  error: '#E5484D',
  errorText: '#FFFFFF',
  disabled: '#D8D8DC',
  disabledText: '#9A9AA1',
  overlay: 'rgba(0,0,0,0.4)',
};

export const darkColors: ColorPalette = {
  background: '#101012',
  surface: '#1C1C1F',
  surfaceAlt: '#27272B',
  border: '#3A3A3F',
  textPrimary: '#F5F5F7',
  textSecondary: '#A5A5AC',
  textInverse: '#101012',
  primary: '#5C8DF6',
  primaryText: '#101012',
  secondary: '#27272B',
  secondaryText: '#F5F5F7',
  destructive: '#F2555A',
  destructiveText: '#101012',
  success: '#3DD68C',
  successText: '#101012',
  warning: '#E3A008',
  warningText: '#101012',
  error: '#F2555A',
  errorText: '#101012',
  disabled: '#3A3A3F',
  disabledText: '#6B6B72',
  overlay: 'rgba(0,0,0,0.6)',
};

export const colors: Record<ColorScheme, ColorPalette> = {
  light: lightColors,
  dark: darkColors,
};

export const getColors = (scheme: ColorScheme | null | undefined): ColorPalette =>
  colors[scheme === 'dark' ? 'dark' : 'light'];
