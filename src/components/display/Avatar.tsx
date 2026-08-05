import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export type AvatarSize = 'small' | 'medium' | 'large';

const DIMENSIONS: Record<AvatarSize, number> = {
  small: 32,
  medium: 44,
  large: 64,
};

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

/** A circular avatar showing a fallback initials label. */
export const Avatar: React.FC<AvatarProps> = ({ initials, size = 'medium', style, theme: themeProp }) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const dimension = DIMENSIONS[size];

  return (
    <View
      accessibilityLabel={initials}
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: theme.colors.primary,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: theme.typography.footnote.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            color: theme.colors.onPrimary,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {},
});
