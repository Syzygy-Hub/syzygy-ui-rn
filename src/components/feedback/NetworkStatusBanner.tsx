import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface NetworkStatusBannerProps {
  /**
   * Whether the device is currently offline. This component is CONTROLLED —
   * it does not detect connectivity itself. See the doc comment above the
   * component for why.
   */
  isOffline: boolean;
  anchor?: 'top' | 'bottom';
  message?: string;
  /** Force the banner to show/hide regardless of `isOffline`, for testing or demos. */
  manualOverride?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A top- or bottom-anchored banner that reads "No internet connection" while
 * offline, and disappears automatically once `isOffline` flips back to
 * `false`.
 *
 * Deliberately presentational/controlled: this library has a zero-third-
 * party-dependency goal, and real network detection in React Native
 * requires `@react-native-community/netinfo`, which is a third-party
 * package this library does not bundle. Rather than fake network detection
 * with an unreliable in-house heuristic, `NetworkStatusBanner` simply
 * renders based on the `isOffline` prop the host app supplies (typically
 * sourced from NetInfo, a custom heartbeat check, or any other connectivity
 * signal the app already has). `manualOverride`, if provided, takes
 * precedence over `isOffline` — useful for tests/storybooks that want to
 * force the banner open without wiring up real connectivity state.
 */
export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  isOffline,
  anchor = 'top',
  message = 'No internet connection',
  manualOverride,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const visible = manualOverride ?? isOffline;

  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.banner,
        anchor === 'top' ? styles.anchorTop : styles.anchorBottom,
        { backgroundColor: colors.error },
        style,
      ]}
      accessibilityRole="alert"
      accessibilityLabel={message}
    >
      <Text style={[styles.text, { color: colors.onError }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchorTop: {
    width: '100%',
  },
  anchorBottom: {
    width: '100%',
  },
  text: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
});
