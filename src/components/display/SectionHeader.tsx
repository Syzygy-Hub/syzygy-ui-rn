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

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: theme.spacing.md },
        style,
      ]}
      accessibilityRole="header"
    >
      <Text
        style={[
          styles.title,
          {
            fontSize: theme.typography.body.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {title}
      </Text>
      {actionLabel && onActionPress ? (
        <TouchableOpacity
          onPress={onActionPress}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text
            style={[
              styles.actionLabel,
              {
                fontSize: theme.typography.footnote.fontSize,
                color: theme.colors.primary,
              },
            ]}
          >
            {actionLabel}
          </Text>
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
  },
  title: {},
  actionLabel: {},
});
