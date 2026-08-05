import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';
import { ModalDialog } from '../overlay/ModalDialog';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  theme?: SyzygyTheme;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <ModalDialog visible={visible} onDismiss={onCancel} theme={theme}>
      <Text
        style={[
          styles.title,
          {
            fontSize: theme.typography.body.fontSize,
            fontWeight: theme.typography.headline.fontWeight,
            color: theme.colors.textPrimary,
          },
        ]}
      >
        {title}
      </Text>
      {message ? (
        <Text
          style={[
            styles.message,
            {
              fontSize: theme.typography.footnote.fontSize,
              marginTop: theme.spacing.sm,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          {message}
        </Text>
      ) : null}
      <View style={[styles.actions, { marginTop: theme.spacing.lg }]}>
        <TouchableOpacity
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel={cancelLabel}
          style={[
            styles.button,
            {
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.md,
              marginRight: theme.spacing.sm,
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: theme.typography.callout.fontSize,
                color: theme.colors.textPrimary,
              },
            ]}
          >
            {cancelLabel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onConfirm}
          accessibilityRole="button"
          accessibilityLabel={confirmLabel}
          style={[
            styles.button,
            {
              paddingHorizontal: theme.spacing.md,
              borderRadius: theme.radius.md,
              backgroundColor: isDestructive ? theme.colors.destructive : theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: theme.typography.callout.fontSize,
                color: isDestructive ? theme.colors.onDestructive : theme.colors.onPrimary,
              },
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
  title: {},
  message: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {},
});
