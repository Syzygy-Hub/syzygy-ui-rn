import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  theme?: SyzygyTheme;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  children,
  width = 280,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen, width, translateX]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      accessibilityViewIsModal={true}
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.panel,
            {
              width,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.surface,
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
  },
});
