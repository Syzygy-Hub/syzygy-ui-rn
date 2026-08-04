import React from 'react';
import { StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { fontSizes, fontWeights } from '../../tokens/typography';

import { Avatar, AvatarProps } from './Avatar';

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  style?: StyleProp<ViewStyle>;
}

const OVERLAP = -12;

/** An overlapping stack of `Avatar`s, showing up to `max` with a "+N" overflow badge for the rest. */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, max = 4, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <View style={[styles.container, style]} accessibilityLabel={`${avatars.length} people`}>
      {visible.map((avatarProps, index) => {
        const dynamicItemStyle = {
          marginLeft: index === 0 ? 0 : OVERLAP,
          borderColor: colors.background,
          zIndex: visible.length - index,
        };
        return (
          <View key={index} style={[styles.item, dynamicItemStyle]}>
            <Avatar {...avatarProps} />
          </View>
        );
      })}
      {overflow > 0 ? (
        <View
          style={[
            styles.item,
            styles.overflow,
            {
              marginLeft: OVERLAP,
              borderColor: colors.background,
              backgroundColor: colors.surfaceSecondary,
            },
          ]}
        >
          <Text style={[styles.overflowText, { color: colors.textPrimary }]}>
            {`+${overflow}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    borderWidth: 2,
    borderRadius: 999,
  },
  overflow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
});
