import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface NetworkStatusBannerProps {
  isOffline: boolean;
  anchor?: 'top' | 'bottom';
  message?: string;
  manualOverride?: boolean;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  isOffline,
  anchor = 'top',
  message = 'No internet connection',
  manualOverride,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const visible = manualOverride ?? isOffline;

  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.banner,
        { paddingHorizontal: theme.spacing.md, backgroundColor: theme.colors.error },
        anchor === 'top' ? styles.anchorTop : styles.anchorBottom,
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLabel={message}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: theme.typography.footnote.fontSize,
            color: theme.colors.onError,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchorTop: {
    width: '100%',
  },
  anchorBottom: {
    width: '100%',
  },
  text: {},
});
