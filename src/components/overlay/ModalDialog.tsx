import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface ModalDialogProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  theme?: SyzygyTheme;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  visible,
  onDismiss,
  children,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      accessibilityViewIsModal={true}
    >
      <Pressable
        style={[styles.backdrop, {
          backgroundColor: theme.colors.overlay,
          opacity: theme.colors.overlayAlpha,
          padding: theme.spacing.lg,
        }]}
        onPress={onDismiss}
      >
        <Pressable
          style={[
            styles.card,
            {
              borderRadius: theme.radius.lg,
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
});
