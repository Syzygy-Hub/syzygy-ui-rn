import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A cross-platform safe-area inset wrapper built entirely from React Native
 * core APIs — no `react-native-safe-area-context` dependency.
 *
 * On iOS, this renders core `SafeAreaView`, which correctly insets for the
 * notch/Dynamic Island and home indicator.
 *
 * On Android, core React Native has no equivalent safe-area API, so this
 * falls back to a plain `View` padded by `StatusBar.currentHeight` (a
 * core, Android-only API) as a best-effort top inset only.
 *
 * KNOWN LIMITATIONS of this best-effort approach:
 * - No bottom gesture-navigation-bar inset on Android — content can sit
 *   under the gesture bar on devices that use it.
 * - No precise cutout/notch handling on Android (only the status bar
 *   height is accounted for, not display cutouts).
 * - `StatusBar.currentHeight` is `undefined`/`0` in some edge cases (e.g.
 *   translucent status bar configurations), which degrades to no top
 *   padding at all.
 *
 * Consumers that need precise, reliable cross-platform safe-area handling
 * (bottom insets, cutouts, orientation changes, etc.) should use
 * `react-native-safe-area-context` in their own app instead of relying on
 * this component for that purpose.
 */
export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children, style }) => {
  if (Platform.OS === 'ios') {
    return <SafeAreaView style={[styles.fill, style]}>{children}</SafeAreaView>;
  }

  return (
    <View style={[styles.fill, styles.androidTopInset, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  androidTopInset: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
  },
});
