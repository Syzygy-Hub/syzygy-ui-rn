import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface ActionSheetAction {
  label: string;
  isDestructive?: boolean;
  onPress: () => void;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  actions: ActionSheetAction[];
  theme?: SyzygyTheme;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  actions,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              borderTopLeftRadius: theme.radius.lg,
              borderTopRightRadius: theme.radius.lg,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onClose();
                action.onPress();
              }}
              accessibilityRole="button"
              accessibilityLabel={action.label}
              style={[
                styles.action,
                { paddingHorizontal: theme.spacing.lg },
                index > 0
                  ? [styles.actionDivider, { borderTopColor: theme.colors.border }]
                  : null,
              ]}
            >
              <Text
                style={[
                  styles.actionText,
                  {
                    fontSize: theme.typography.callout.fontSize,
                    color: action.isDestructive ? theme.colors.destructive : theme.colors.textPrimary,
                  },
                ]}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {},
  action: {
    minHeight: 48,
    justifyContent: 'center',
  },
  actionDivider: {
    borderTopWidth: 1,
  },
  actionText: {},
});
