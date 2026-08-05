import { TextStyle } from 'react-native';

export interface SyzygyTypography {
  largeTitle: TextStyle;
  display: TextStyle;
  title: TextStyle;
  headline: TextStyle;
  body: TextStyle;
  callout: TextStyle;
  subheadline: TextStyle;
  footnote: TextStyle;
  caption: TextStyle;
}

export const defaultTypography: SyzygyTypography = {
  largeTitle: { fontSize: 34, fontWeight: '700', lineHeight: 41 },
  display: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
  title: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
  headline: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  body: { fontSize: 17, fontWeight: '400', lineHeight: 22 },
  callout: { fontSize: 16, fontWeight: '400', lineHeight: 21 },
  subheadline: { fontSize: 15, fontWeight: '400', lineHeight: 20 },
  footnote: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

export const highContrastTypography: SyzygyTypography = {
  largeTitle: { fontSize: 34, fontWeight: '900', lineHeight: 41 },
  display: { fontSize: 28, fontWeight: '900', lineHeight: 34 },
  title: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
  headline: { fontSize: 17, fontWeight: '700', lineHeight: 22 },
  body: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  callout: { fontSize: 16, fontWeight: '600', lineHeight: 21 },
  subheadline: { fontSize: 15, fontWeight: '600', lineHeight: 20 },
  footnote: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
};
