import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export interface KeyboardAvoidingScrollViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A scrollable container that automatically insets its content to avoid the
 * on-screen keyboard, wrapping React Native's core `KeyboardAvoidingView`.
 */
export const KeyboardAvoidingScrollView: React.FC<KeyboardAvoidingScrollViewProps> = ({
  children,
  style,
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
