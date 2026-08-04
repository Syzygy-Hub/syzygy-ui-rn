import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}


/**
 * A slide-in side navigation panel (also known as a `Drawer`), sliding in
 * from the leading edge via `Animated.timing` with a dimming scrim behind
 * it, using the `overlay` color token — same presentation family as
 * `BottomSheet`/`ModalDialog` but anchored to the side instead of bottom/center.
 */
export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, children, width = 280 }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen, width, translateX]);

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose} accessibilityViewIsModal={true}>
      <Pressable style={[styles.backdrop, { backgroundColor: colors.overlay }]} onPress={onClose}>
        <Animated.View
          style={[
            styles.panel,
            {
              width,
              backgroundColor: colors.surface,
              transform: [{ translateX }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    padding: spacing.md,
  },
});
