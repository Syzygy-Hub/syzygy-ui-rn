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

import { SyzygyTheme } from '../../theme';

export interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  style,
  // theme prop accepted but layout component does not consume it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: _theme,
}) => {
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
