import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';
import { ModalDialog } from '../overlay/ModalDialog';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  /** Styles the confirm button in the destructive/error color token. */
  isDestructive?: boolean;
}

/**
 * A preset confirm/cancel modal built on top of `ModalDialog` (rather than
 * re-implementing modal presentation): title, optional message, and two
 * action buttons. Pass `isDestructive` to tint the confirm button with the
 * destructive/error color token for actions like delete.
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <ModalDialog visible={visible} onDismiss={onCancel}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {message ? (
        <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      ) : null}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel={cancelLabel}
          style={[styles.button, styles.cancelButton, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.buttonText, { color: colors.textPrimary }]}>{cancelLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onConfirm}
          accessibilityRole="button"
          accessibilityLabel={confirmLabel}
          style={[
            styles.button,
            { backgroundColor: isDestructive ? colors.destructive : colors.primary },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isDestructive ? colors.onDestructive : colors.onPrimary },
            ]}
          >
            {confirmLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </ModalDialog>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
  },
  message: {
    fontSize: fontSizes.sm,
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.lg,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    marginRight: spacing.sm,
  },
  buttonText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },
});
