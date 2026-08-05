import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme } from '../../theme';

export interface KeyboardAvoidingScrollViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const KeyboardAvoidingScrollView: React.FC<KeyboardAvoidingScrollViewProps> = ({
  children,
  style,
  // theme prop accepted but layout component does not consume it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: _theme,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <ScrollView style={[styles.flex, style]} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
