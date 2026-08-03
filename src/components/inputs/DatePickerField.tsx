import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface DatePickerFieldProps {
  label: string;
  date: Date | null;
  onDateChange: (date: Date) => void;
  onPress?: () => void;
  formatDate?: (date: Date) => string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A tappable field that displays a formatted date and manages its own
 * open/closed visual state.
 *
 * NOTE (platform limitation, not a shortcut): React Native core ships no
 * cross-platform date picker — unlike SwiftUI's `DatePicker` or Jetpack
 * Compose's `DatePicker`, there is no built-in equivalent, and this library
 * has a zero-third-party-dependency constraint (so it cannot pull in
 * `@react-native-community/datetimepicker`). This component therefore only
 * owns the trigger/field UI and open state; wiring an actual native date
 * picker requires either the host app's own picker UI or a platform date
 * picker dependency added at the app level. `onPress` fires in addition to
 * the internal toggle so a consumer can open their own picker (modal,
 * native `DatePickerIOS`-style component, etc.) and call `onDateChange` with
 * the result.
 */
export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  date,
  onDateChange,
  onPress,
  formatDate = (d) => d.toLocaleDateString(),
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
        <Text style={{ color: date ? colors.textPrimary : colors.textSecondary, fontSize: fontSizes.md }}>
          {date ? formatDate(date) : 'Select date'}
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
