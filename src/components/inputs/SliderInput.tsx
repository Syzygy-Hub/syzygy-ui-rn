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
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SliderInputProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
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
        <Text
          style={[
            styles.headerText,
            {
              fontSize: theme.typography.footnote.fontSize,
              color: theme.colors.textPrimary,
            },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.headerText,
            {
              fontSize: theme.typography.footnote.fontSize,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {value.toFixed(2)}
        </Text>
      </View>
      <View
        onLayout={onLayout}
        {...panResponder.panHandlers}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityValue={{ min: minimumValue, max: maximumValue, now: value }}
        style={[
          styles.track,
          {
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${ratio * 100}%`,
              borderRadius: theme.radius.full,
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
        <View
          style={[
            styles.thumb,
            {
              left: `${ratio * 100}%`,
              backgroundColor: theme.colors.primary,
            },
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
    marginBottom: 4,
  },
  headerText: {},
  track: {
    height: TRACK_HEIGHT,
    justifyContent: 'center',
    marginVertical: (44 - TRACK_HEIGHT) / 2,
  },
  fill: {
    height: TRACK_HEIGHT,
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
