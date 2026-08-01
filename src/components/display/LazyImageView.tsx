import React, { useState } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { ShimmerView } from '../feedback/ShimmerView';

export interface LazyImageViewProps {
  uri: string | null | undefined;
  style?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

/**
 * Asynchronously loads a remote image using React Native's core `Image`
 * component (which handles async loading and caching natively — no
 * third-party image-loading dependency needed), showing a `ShimmerView`
 * placeholder while loading and a fallback glyph if the load fails.
 */
export const LazyImageView: React.FC<LazyImageViewProps> = ({ uri, style, resizeMode = 'cover' }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(uri ? 'loading' : 'error');

  if (!uri || status === 'error') {
    return (
      <View
        style={[styles.fallback, { backgroundColor: colors.surfaceAlt }, style]}
        accessibilityLabel="Image failed to load"
      >
        <Text style={{ color: colors.textSecondary }}>{'🖼'}</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      {status === 'loading' ? (
        <ShimmerView style={StyleSheet.absoluteFill} />
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
