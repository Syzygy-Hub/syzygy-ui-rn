import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, useColorScheme, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { elevation } from '../../tokens/elevation';

export interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A circular elevated primary action button. Uses the `elevation` token,
 * which carries both Android's `elevation` prop and iOS's `shadow*` props on
 * one object — the standard way to express elevation cross-platform in RN.
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'Action'}
      style={[
        styles.base,
        elevation.lg,
        { backgroundColor: colors.primary },
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
