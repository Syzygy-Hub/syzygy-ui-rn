import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface TimePickerFieldProps {
  label: string;
  time: Date | null;
  onTimeChange: (time: Date) => void;
  onPress?: () => void;
  formatTime?: (time: Date) => string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A tappable field that displays a formatted time and manages its own
 * open/closed visual state.
 *
 * NOTE (platform limitation, not a shortcut): same situation as
 * `DatePickerField` — React Native core has no built-in time picker
 * equivalent to SwiftUI's/Compose's, and this library takes on no
 * third-party dependencies. This component owns only the field/trigger UI
 * and open state; wire an actual native time picker (host-app-provided or a
 * platform dependency added at the app level) into `onPress`, and call
 * `onTimeChange` with its result.
 */
export const TimePickerField: React.FC<TimePickerFieldProps> = ({
  label,
  time,
  onTimeChange,
  onPress,
  formatTime = (t) => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen((prev) => !prev);
    onPress?.();
  };

  return (
    <View style={style}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TouchableOpacity
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ expanded: isOpen }}
        style={[
          styles.trigger,
          {
            backgroundColor: colors.surface,
            borderColor: isOpen ? colors.focus : colors.border,
          },
        ]}
      >
        <Text style={{ color: time ? colors.textPrimary : colors.textSecondary, fontSize: fontSizes.md }}>
          {time ? formatTime(time) : 'Select time'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    marginBottom: spacing.xs,
  },
  trigger: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
});
