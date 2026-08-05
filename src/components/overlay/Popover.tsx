import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
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
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View
            style={[
              styles.bubble,
              { ...theme.elevation.md },
              {
                borderRadius: theme.radius.md,
                padding: theme.spacing.sm,
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                top: position.y + position.height + theme.spacing.xs,
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
    maxWidth: 260,
  },
});
