import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  theme?: SyzygyTheme;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  children,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      accessibilityViewIsModal={true}
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}
        onPress={onDismiss}
      >
        <Animated.View
          style={[
            styles.sheet,
            {
              borderTopLeftRadius: theme.radius.lg,
              borderTopRightRadius: theme.radius.lg,
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.surface,
              transform: [{ translateY }],
            },
          ]}
        >
          <Pressable style={[styles.handle, { backgroundColor: theme.colors.border, marginBottom: theme.spacing.md }]} />
          {children}
        </Animated.View>
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
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
  },
});
