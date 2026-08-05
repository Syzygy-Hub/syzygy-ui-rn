import React, { useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';
import { ShimmerView } from '../feedback/ShimmerView';

export interface LazyImageViewProps {
  uri: string | null | undefined;
  style?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  theme?: SyzygyTheme;
}

export const LazyImageView: React.FC<LazyImageViewProps> = ({
  uri,
  style,
  resizeMode = 'cover',
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(uri ? 'loading' : 'error');

  if (!uri || status === 'error') {
    return (
      <View
        style={[styles.fallback, { backgroundColor: theme.colors.surfaceSecondary }, style]}
        accessibilityLabel="Image failed to load"
      >
        <Text style={{ color: theme.colors.textSecondary }}>{'🖼'}</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      {status === 'loading' ? (
        <ShimmerView style={StyleSheet.absoluteFill} theme={theme} />
      ) : null}
      <Image
        source={{ uri }}
        resizeMode={resizeMode}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        accessibilityLabel="Image"
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
