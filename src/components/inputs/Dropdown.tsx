import React, { useState } from 'react';
import {
  FlatList,
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

export interface DropdownProps<T> {
  label: string;
  selection: T;
  options: T[];
  onSelectionChange: (option: T) => void;
  optionTitle: (option: T) => string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export function Dropdown<T>({
  label,
  selection,
  options,
  onSelectionChange,
  optionTitle,
  style,
  accessibilityLabel,
  theme: themeProp,
}: DropdownProps<T>) {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [open, setOpen] = useState(false);

  return (
    <View style={style}>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.footnote.fontSize,
            marginBottom: theme.spacing.xs,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        style={[
          styles.trigger,
          {
            borderRadius: theme.radius.md,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Text style={{ color: theme.colors.textPrimary }}>{optionTitle(selection)}</Text>
        <Text style={{ color: theme.colors.textSecondary }}>{'⌄'}</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={[styles.backdrop, { backgroundColor: `rgba(0,0,0,${theme.colors.overlayAlpha})` }]} onPress={() => setOpen(false)}>
          <View
            style={[
              styles.sheet,
              {
                borderTopLeftRadius: theme.radius.lg,
                borderTopRightRadius: theme.radius.lg,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item, index) => `${optionTitle(item)}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectionChange(item);
                    setOpen(false);
                  }}
                  style={[styles.option, { paddingHorizontal: theme.spacing.md }]}
                >
                  <Text style={{ color: theme.colors.textPrimary }}>{optionTitle(item)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {},
  trigger: {
    minHeight: 44,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '60%',
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
  },
});
