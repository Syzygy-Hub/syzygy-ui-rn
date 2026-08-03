import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';

export interface SearchableDropdownProps<T> {
  label: string;
  selection: T;
  options: T[];
  onSelectionChange: (option: T) => void;
  optionTitle: (option: T) => string;
  searchPlaceholder?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * A `Dropdown` variant with an inline search field that filters the option
 * list as the user types (case-insensitive substring match against
 * `optionTitle(option)`).
 *
 * Implementation note: this mirrors `Dropdown`'s trigger + bottom sheet
 * rendering approach (same trigger row, same `Modal` + `FlatList` sheet)
 * rather than literally wrapping the `Dropdown` component. `Dropdown` has no
 * prop for injecting extra header content into its sheet or for controlling
 * its internally-owned `options` list, so composing around it would require
 * either forking its open state via re-implemented trigger UI anyway, or
 * reaching into its internals. Rebuilding the same small amount of
 * rendering logic here — with a search `TextInput` added to the sheet header
 * and the options list filtered before being handed to `FlatList` — was the
 * more genuine, less hacky option.
 */
export function SearchableDropdown<T>({
  label,
  selection,
  options,
  onSelectionChange,
  optionTitle,
  searchPlaceholder = 'Search…',
  style,
  accessibilityLabel,
}: SearchableDropdownProps<T>) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return options;
    }
    return options.filter((option) => optionTitle(option).toLowerCase().includes(needle));
  }, [options, optionTitle, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

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
      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <Pressable style={styles.backdrop} onPress={close}>
          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <RNTextInput
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.textSecondary}
              autoCorrect={false}
              autoCapitalize="none"
              style={[
                styles.searchInput,
                { color: colors.textPrimary, borderColor: colors.border, backgroundColor: colors.background },
              ]}
              accessibilityLabel={searchPlaceholder}
            />
            <FlatList
              data={filteredOptions}
              keyExtractor={(item, index) => `${optionTitle(item)}-${index}`}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectionChange(item);
                    close();
                  }}
                  style={styles.option}
                >
                  <Text style={{ color: colors.textPrimary }}>{optionTitle(item)}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={[styles.empty, { color: colors.textSecondary }]}>No matches</Text>
              }
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
    paddingTop: spacing.sm,
  },
  searchInput: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  empty: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});
