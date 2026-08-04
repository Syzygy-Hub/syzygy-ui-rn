import React from 'react';
import { Modal, Pressable, StyleSheet, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';

export interface ModalDialogProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

/**
 * A centered dialog card over a dimmed scrim, wrapping React Native's core
 * `Modal`. Named `ModalDialog` (not `Modal`) to avoid ambiguity with the
 * `Modal` import from `react-native`.
 */
export const ModalDialog: React.FC<ModalDialogProps> = ({ visible, onDismiss, children }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss} accessibilityViewIsModal={true}>
      <Pressable style={[styles.backdrop, { backgroundColor: colors.overlay }]} onPress={onDismiss}>
        <Pressable style={[styles.card, { backgroundColor: colors.surface }]}>
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
    padding: spacing.lg,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
});
