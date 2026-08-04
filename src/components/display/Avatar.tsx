import React from 'react';
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { fontSizes, fontWeights } from '../../tokens/typography';

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
}

/** A circular avatar showing a fallback initials label. */
export const Avatar: React.FC<AvatarProps> = ({ initials, size = 'medium', style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
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
          backgroundColor: colors.primary,
        },
        style,
      ]}
    >
      <Text style={[styles.initials, { color: colors.onPrimary }]}>
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
  initials: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
});
