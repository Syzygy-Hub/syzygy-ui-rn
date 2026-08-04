export type ColorScheme = 'light' | 'dark';

export interface ColorPalette {
  // Surface
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  onSurface: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  // Brand
  primary: string;
  onPrimary: string;
  primaryMuted: string;
  /** Lightest primary tint for large-area background washes.
   * No prior equivalent; hex inferred as lighter than primaryMuted. */
  primarySubtle: string;
  // Error (form / system errors)
  error: string;
  onError: string;
  errorMuted: string;
  // Destructive (delete / irreversible actions)
  destructive: string;
  onDestructive: string;
  destructiveMuted: string;
  // Success
  success: string;
  onSuccess: string;
  successMuted: string;
  // Warning
  warning: string;
  onWarning: string;
  warningMuted: string;
  // UI
  border: string;
  separator: string;
  overlay: string;
  scrim: string;
  link: string;
  focus: string;
  // Non-canonical legacy tokens kept for backward-compat
  secondary: string;
  disabled: string;
}

export const lightColors: ColorPalette = {
  // Surface
  background: '#FFFFFF',
  surface: '#F5F5F7',
  surfaceSecondary: '#EFEFF2',
  surfaceTertiary: '#E4E4E8',
  onSurface: '#1A1A1E',
  // Text
  textPrimary: '#1A1A1E',
  textSecondary: '#6B6B72',
  textTertiary: '#9A9AA1',
  textDisabled: '#9A9AA1',
  textInverse: '#FFFFFF',
  // Brand
  primary: '#2F6FED',
  onPrimary: '#FFFFFF',
  primaryMuted: '#E3ECFC',
  primarySubtle: '#E9F0FD',
  // Error
  error: '#E5484D',
  onError: '#FFFFFF',
  errorMuted: '#FBE4E5',
  // Destructive
  destructive: '#E5484D',
  onDestructive: '#FFFFFF',
  destructiveMuted: '#FBE4E5',
  // Success
  success: '#1F9254',
  onSuccess: '#FFFFFF',
  successMuted: '#E1F2E8',
  // Warning
  warning: '#B7791F',
  onWarning: '#FFFFFF',
  warningMuted: '#F8ECD9',
  // UI
  border: '#D8D8DC',
  separator: '#D8D8DC',
  overlay: 'rgba(0,0,0,0.4)',
  scrim: 'rgba(0,0,0,0.4)',
  link: '#2F6FED',
  focus: '#2F6FED',
  // Legacy
  secondary: '#ECECEE',
  disabled: '#D8D8DC',
};

export const darkColors: ColorPalette = {
  // Surface
  background: '#101012',
  surface: '#1C1C1F',
  surfaceSecondary: '#232327',
  surfaceTertiary: '#2C2C31',
  onSurface: '#F5F5F7',
  // Text
  textPrimary: '#F5F5F7',
  textSecondary: '#A5A5AC',
  textTertiary: '#6B6B72',
  textDisabled: '#6B6B72',
  textInverse: '#101012',
  // Brand
  primary: '#5C8DF6',
  onPrimary: '#101012',
  primaryMuted: '#1E2C47',
  primarySubtle: '#102040',
  // Error
  error: '#F2555A',
  onError: '#101012',
  errorMuted: '#3B2023',
  // Destructive
  destructive: '#F2555A',
  onDestructive: '#101012',
  destructiveMuted: '#3B2023',
  // Success
  success: '#3DD68C',
  onSuccess: '#101012',
  successMuted: '#1B3327',
  // Warning
  warning: '#E3A008',
  onWarning: '#101012',
  warningMuted: '#3A2E14',
  // UI
  border: '#3A3A3F',
  separator: '#3A3A3F',
  overlay: 'rgba(0,0,0,0.6)',
  scrim: 'rgba(0,0,0,0.6)',
  link: '#5C8DF6',
  focus: '#5C8DF6',
  // Legacy
  secondary: '#27272B',
  disabled: '#3A3A3F',
};

export const colors: Record<ColorScheme, ColorPalette> = {
  light: lightColors,
  dark: darkColors,
};

export const getColors = (scheme: ColorScheme | 'unspecified' | null | undefined): ColorPalette =>
  colors[scheme === 'dark' ? 'dark' : 'light'];
