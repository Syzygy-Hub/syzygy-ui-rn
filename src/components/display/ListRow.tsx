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

export interface ListRowProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const ListRow: React.FC<ListRowProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  const content = (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
        style,
      ]}
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
    >
      {leading}
      <View style={[styles.textContainer, { marginLeft: theme.spacing.sm }]}>
        <Text
          style={[
            styles.title,
            {
              fontSize: theme.typography.callout.fontSize,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: theme.typography.footnote.fontSize,
                color: theme.colors.textSecondary,
              },
            ]}
          >
            {subtitle}
          </Text>
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
  },
  textContainer: {
    flex: 1,
  },
  title: {},
  subtitle: {},
});
