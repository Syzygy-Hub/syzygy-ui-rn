import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';

export interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** A labeled checkbox. React Native has no core `Checkbox`, so this owns the name. */
export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onValueChange,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const dynamicBoxStyle = {
    backgroundColor: checked ? colors.primary : 'transparent',
    borderColor: checked ? colors.primary : colors.border,
  };

  return (
    <TouchableOpacity
      onPress={() => onValueChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.container, style]}
    >
      <View style={[styles.box, dynamicBoxStyle]}>
        {checked ? <Text style={{ color: colors.onPrimary }}>{'✓'}</Text> : null}
      </View>
      <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
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
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: spacing.sm,
  },
});
