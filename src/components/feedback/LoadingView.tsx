import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { getColors } from '../../tokens/colors';
import { fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';

export interface LoadingViewProps {
  message?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({
  message,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? message ?? 'Loading'}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.sm,
    fontSize: fontSizes.sm,
    textAlign: 'center',
  },
});
