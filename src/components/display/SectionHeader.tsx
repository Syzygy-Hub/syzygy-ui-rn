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
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** A section title with an optional trailing text action (e.g. "See All"). */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, style]} accessibilityRole="header">
      <Text style={{ color: colors.textPrimary, fontSize: fontSizes.lg, fontWeight: fontWeights.semibold }}>
        {title}
      </Text>
      {actionLabel && onActionPress ? (
        <TouchableOpacity onPress={onActionPress} accessibilityRole="button" accessibilityLabel={actionLabel}>
          <Text style={{ color: colors.primary, fontSize: fontSizes.sm }}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
});
