import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

export interface ActionSheetAction {
  label: string;
  isDestructive?: boolean;
  onPress: () => void;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  actions: ActionSheetAction[];
}

/**
 * A bottom-anchored sheet listing labelled actions, following the same
 * `Modal` + `visible`/`onClose` presentation convention as `BottomSheet` and
 * `ModalDialog` for consistency across overlay components.
 */
export const ActionSheet: React.FC<ActionSheetProps> = ({ visible, onClose, actions }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: colors.overlay }]} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: colors.surface }]}>
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
                index > 0 ? [styles.actionDivider, { borderTopColor: colors.border }] : null,
              ]}
            >
              <Text
                style={[
                  styles.actionText,
                  { color: action.isDestructive ? colors.destructive : colors.textPrimary },
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
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingVertical: spacing.xs,
  },
  action: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  actionDivider: {
    borderTopWidth: 1,
  },
  actionText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.medium,
  },
});
