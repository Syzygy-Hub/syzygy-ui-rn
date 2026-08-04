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
import { fontSizes } from '../../tokens/typography';

export interface ChipProps {
  text: string;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** A compact tag/chip with an optional trailing remove button. */
export const Chip: React.FC<ChipProps> = ({ text, onRemove, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surfaceSecondary }, style]}
      accessibilityLabel={text}
    >
      <Text style={[styles.text, { color: colors.textPrimary }]}>{text}</Text>
      {onRemove ? (
        <TouchableOpacity
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${text}`}
          style={styles.remove}
        >
          <Text style={{ color: colors.textSecondary }}>{'✕'}</Text>
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
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  remove: {
    marginLeft: spacing.xs,
    minWidth: 20,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontSizes.sm,
  },
});
