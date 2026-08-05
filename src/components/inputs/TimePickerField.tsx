import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface TimePickerFieldProps {
  label: string;
  time: Date | null;
  onTimeChange: (time: Date) => void;
  onPress?: () => void;
  formatTime?: (time: Date) => string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  time,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTimeChange,
  onPress,
  formatTime = (t) => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen((prev) => !prev);
    onPress?.();
  };

  return (
    <View style={style}>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.footnote.fontSize,
            marginBottom: theme.spacing.xs,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ expanded: isOpen }}
        style={[
          styles.trigger,
          {
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: theme.colors.surface,
            borderColor: isOpen ? theme.colors.focus : theme.colors.border,
          },
        ]}
      >
        <Text
          style={{
            color: time ? theme.colors.textPrimary : theme.colors.textSecondary,
            fontSize: theme.typography.callout.fontSize,
          }}
        >
          {time ? formatTime(time) : 'Select time'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {},
  trigger: {
    minHeight: 44,
    borderWidth: 1,
    justifyContent: 'center',
  },
});
