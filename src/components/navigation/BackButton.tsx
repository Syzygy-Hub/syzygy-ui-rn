import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface BackButtonProps {
  onPress: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  label = 'Back',
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.container, style]}
    >
      <Text style={[styles.arrow, { color: colors.primary }]}>{'‹'}</Text>
      <Text style={[styles.label, { color: colors.primary }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  arrow: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    marginRight: spacing.xs,
  },
  label: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },
});
