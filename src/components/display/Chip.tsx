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

export interface ChipProps {
  text: string;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

/** A compact tag/chip with an optional trailing remove button. */
export const Chip: React.FC<ChipProps> = ({ text, onRemove, style, theme: themeProp }) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.surfaceSecondary,
        },
        style,
      ]}
      accessibilityLabel={text}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: theme.typography.footnote.fontSize,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {text}
      </Text>
      {onRemove ? (
        <TouchableOpacity
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${text}`}
          style={[styles.remove, { marginLeft: theme.spacing.xs }]}
        >
          <Text style={{ color: theme.colors.textSecondary }}>{'✕'}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  remove: {
    minWidth: 20,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});
