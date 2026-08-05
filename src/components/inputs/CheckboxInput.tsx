import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onValueChange,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const boxStyle = {
    borderRadius: theme.radius.sm,
    backgroundColor: checked ? theme.colors.primary : ('transparent' as const),
    borderColor: checked ? theme.colors.primary : theme.colors.border,
  };

  return (
    <TouchableOpacity
      onPress={() => onValueChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.container, style]}
    >
      <View
        style={[styles.box, boxStyle]}
      >
        {checked ? <Text style={{ color: theme.colors.onPrimary }}>{'✓'}</Text> : null}
      </View>
      <Text style={[styles.label, { marginLeft: theme.spacing.sm, color: theme.colors.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});
