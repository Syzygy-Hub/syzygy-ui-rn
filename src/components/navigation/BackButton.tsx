import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface BackButtonProps {
  onPress: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  label = 'Back',
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.sm,
          borderRadius: theme.radius.sm,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.arrow,
          {
            fontSize: theme.typography.title.fontSize,
            fontWeight: theme.typography.display.fontWeight,
            marginRight: theme.spacing.xs,
            color: theme.colors.primary,
          },
        ]}
      >
        {'‹'}
      </Text>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.callout.fontSize,
            color: theme.colors.primary,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {},
  label: {},
});
