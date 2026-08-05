import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

import { Avatar, AvatarProps } from './Avatar';

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

const OVERLAP = -12;

/** An overlapping stack of `Avatar`s, showing up to `max` with a "+N" overflow badge for the rest. */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <View style={[styles.container, style]} accessibilityLabel={`${avatars.length} people`}>
      {visible.map((avatarProps, index) => {
        const dynamicItemStyle = {
          marginLeft: index === 0 ? 0 : OVERLAP,
          borderColor: theme.colors.background,
          zIndex: visible.length - index,
        };
        return (
          <View key={index} style={[styles.item, dynamicItemStyle]}>
            <Avatar {...avatarProps} theme={theme} />
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
              borderColor: theme.colors.background,
              backgroundColor: theme.colors.surfaceSecondary,
            },
          ]}
        >
          <Text
            style={[
              styles.overflowText,
              {
                fontSize: theme.typography.footnote.fontSize,
                fontWeight: theme.typography.headline.fontWeight,
                color: theme.colors.textPrimary,
              },
            ]}
          >
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
  overflowText: {},
});
