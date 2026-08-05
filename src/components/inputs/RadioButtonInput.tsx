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

export interface RadioButtonInputProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const RadioButtonInput: React.FC<RadioButtonInputProps> = ({
  label,
  selected,
  onPress,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.outer,
          { borderColor: selected ? theme.colors.primary : theme.colors.border },
        ]}
      >
        {selected ? (
          <View style={[styles.inner, { backgroundColor: theme.colors.primary }]} />
        ) : null}
      </View>
      <Text
        style={[
          styles.label,
          { marginLeft: theme.spacing.sm, color: theme.colors.textPrimary },
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
  label: {},
});
