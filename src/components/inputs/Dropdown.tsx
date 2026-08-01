import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface DropdownProps<T> {
  label: string;
  selection: T;
  options: T[];
  onSelectionChange: (option: T) => void;
  optionTitle: (option: T) => string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** A labeled dropdown / picker, selecting from a fixed list of options. */
export function Dropdown<T>({
  label,
  selection,
  options,
  onSelectionChange,
  optionTitle,
  style,
  accessibilityLabel,
}: DropdownProps<T>) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [open, setOpen] = useState(false);

  return (
    <View style={style}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        style={[styles.trigger, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <Text style={{ color: colors.textPrimary }}>{optionTitle(selection)}</Text>
        <Text style={{ color: colors.textSecondary }}>{'⌄'}</Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => `${optionTitle(item)}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectionChange(item);
                    setOpen(false);
                  }}
                  style={styles.option}
                >
                  <Text style={{ color: colors.textPrimary }}>{optionTitle(item)}</Text>
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
  label: {
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs,
  },
  trigger: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: '60%',
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
});
