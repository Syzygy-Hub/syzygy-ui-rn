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
import { spacing } from '../../tokens/spacing';

export interface RadioButtonInputProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A single labeled radio option. Compose several with shared parent state to
 * build a radio group. React Native has no core `RadioButton`, so this owns
 * the name.
 */
export const RadioButtonInput: React.FC<RadioButtonInputProps> = ({
  label,
  selected,
  onPress,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.container, style]}
    >
      <View style={[styles.outer, { borderColor: selected ? colors.primary : colors.border }]}>
        {selected ? <View style={[styles.inner, { backgroundColor: colors.primary }]} /> : null}
      </View>
      <Text style={{ color: colors.textPrimary, marginLeft: spacing.sm }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  outer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
