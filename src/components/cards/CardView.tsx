import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface CardViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const CardView: React.FC<CardViewProps> = ({
  children,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.container,
        {
          borderRadius: theme.radius.lg,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
