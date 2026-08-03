import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { elevation } from '../../tokens/elevation';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * An anchored floating content bubble, triggered by tapping `trigger`.
 *
 * Implementation approach: React Native core has no native popover /
 * anchor-positioning primitive (no built-in `useLayout`-based anchor
 * system). This measures the trigger's on-screen position with the
 * wrapping View's `measure()` (via `onLayout` to ensure the node is
 * mounted first) and absolutely positions the floating content just below
 * it inside a transparent `Modal`, which reliably renders above all other
 * content regardless of where the trigger lives in the tree.
 */
export const Popover: React.FC<PopoverProps> = ({ trigger, children, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const anchorRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const open = () => {
    anchorRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      setVisible(true);
    });
  };

  return (
    <>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity onPress={open} accessibilityRole="button">
          {trigger}
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View
            style={[
              styles.bubble,
              elevation.md,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                top: position.y + position.height + spacing.xs,
                left: position.x,
              },
              style,
            ]}
          >
            {children}
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
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm,
    maxWidth: 260,
  },
});
