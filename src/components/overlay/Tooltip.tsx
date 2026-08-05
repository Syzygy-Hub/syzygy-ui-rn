import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface TooltipProps {
  label: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const anchorRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const show = () => {
    anchorRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setPosition({ x: pageX, y: pageY, width, height });
      setVisible(true);
    });
  };

  const hide = () => setVisible(false);

  return (
    <>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity onLongPress={show} onPressOut={hide} accessibilityLabel={label}>
          {children}
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={hide}>
        <Pressable style={styles.backdrop} onPress={hide}>
          <View
            style={[
              styles.bubble,
              { ...theme.elevation.sm },
              {
                borderRadius: theme.radius.sm,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xxs,
                backgroundColor: theme.colors.textPrimary,
                top: Math.max(theme.spacing.xs, position.y - 36),
                left: position.x,
              },
              style,
            ]}
          >
            <Text
              style={[
                styles.tooltipText,
                {
                  fontSize: theme.typography.caption.fontSize,
                  color: theme.colors.textInverse,
                },
              ]}
            >
              {label}
            </Text>
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
  },
  tooltipText: {},
});
