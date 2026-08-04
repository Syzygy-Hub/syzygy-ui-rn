import React, { useRef, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface SliderInputProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A labeled slider with a live value readout. React Native's core `Slider`
 * was removed in favor of a community package, so this is a lightweight
 * `PanResponder`-based implementation with no third-party dependency.
 */
export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [trackWidth, setTrackWidth] = useState(0);

  const clamp = (v: number) => Math.min(maximumValue, Math.max(minimumValue, v));

  const updateFromLocation = (locationX: number) => {
    if (trackWidth <= 0) return;
    const ratio = Math.min(1, Math.max(0, locationX / trackWidth));
    const raw = minimumValue + ratio * (maximumValue - minimumValue);
    onValueChange(clamp(raw));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt: GestureResponderEvent) =>
        updateFromLocation(evt.nativeEvent.locationX),
      onPanResponderMove: (evt: GestureResponderEvent) =>
        updateFromLocation(evt.nativeEvent.locationX),
    })
  ).current;

  const ratio = (clamp(value) - minimumValue) / (maximumValue - minimumValue);

  const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width);

  return (
    <View style={style}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.textPrimary }]}>{label}</Text>
        <Text style={[styles.headerText, { color: colors.textSecondary }]}>
          {value.toFixed(2)}
        </Text>
      </View>
      <View
        onLayout={onLayout}
        {...panResponder.panHandlers}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityValue={{ min: minimumValue, max: maximumValue, now: value }}
        style={[styles.track, { backgroundColor: colors.border }]}
      >
        <View
          style={[
            styles.fill,
            { width: `${ratio * 100}%`, backgroundColor: colors.primary },
          ]}
        />
        <View
          style={[
            styles.thumb,
            { left: `${ratio * 100}%`, backgroundColor: colors.primary },
          ]}
        />
      </View>
    </View>
  );
};

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 20;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  headerText: {
    fontSize: fontSizes.sm,
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
    marginVertical: (44 - TRACK_HEIGHT) / 2,
  },
  fill: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    position: 'absolute',
    left: 0,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    marginLeft: -THUMB_SIZE / 2,
  },
});
