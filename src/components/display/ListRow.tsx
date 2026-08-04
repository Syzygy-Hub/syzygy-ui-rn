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
import { fontSizes } from '../../tokens/typography';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** A styled, optionally-tappable row wrapper with a leading slot, title,
 * subtitle, and a trailing accessory slot. */
export const ListRow: React.FC<ListRowProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const content = (
    <View
      style={[styles.container, style]}
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
    >
      {leading}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} accessibilityRole="button">
        {content}
      </TouchableOpacity>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  title: {
    fontSize: fontSizes.md,
  },
  subtitle: {
    fontSize: fontSizes.sm,
  },
});
