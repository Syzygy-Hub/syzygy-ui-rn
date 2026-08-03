import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';
import { elevation } from '../../tokens/elevation';

export interface TooltipProps {
  label: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A small floating label revealed on long-press of `children`.
 *
 * Uses the same measure-and-absolutely-position approach as `Popover`
 * (React Native core has no native anchor-positioning primitive), composed
 * directly here rather than wrapping `Popover` since a tooltip's trigger
 * gesture (`onLongPress`) and lifecycle (auto-dismiss on release) differ
 * enough from a tap-triggered popover to keep them separate and simple.
 */
export const Tooltip: React.FC<TooltipProps> = ({ label, children, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const anchorRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const show = () => {
    anchorRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      setVisible(true);
    });
  };

  const hide = () => setVisible(false);

  return (
    <>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity onLongPress={show} onPressOut={hide} accessibilityLabel={label}>
          {children}
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={hide}>
        <Pressable style={styles.backdrop} onPress={hide}>
          <View
            style={[
              styles.bubble,
              elevation.sm,
              {
                backgroundColor: colors.textPrimary,
                top: Math.max(spacing.xs, position.y - 36),
                left: position.x,
              },
              style,
            ]}
          >
            <Text style={{ color: colors.textInverse, fontSize: fontSizes.xs }}>{label}</Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  bubble: {
    position: 'absolute',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
});
