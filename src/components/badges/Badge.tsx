import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { getColors } from '../../tokens/colors';
import { fontSizes, fontWeights } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error';

export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'success'
      ? colors.success
      : variant === 'warning'
      ? colors.warning
      : colors.error;

  const textColor =
    variant === 'primary'
      ? colors.primaryText
      : variant === 'success'
      ? colors.successText
      : variant === 'warning'
      ? colors.warningText
      : colors.errorText;

  return (
    <View
      style={[styles.container, { backgroundColor }, style]}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? text}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  text: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
  },
});
