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
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface SearchableDropdownProps<T> {
  label: string;
  selection: T;
  options: T[];
  onSelectionChange: (option: T) => void;
  optionTitle: (option: T) => string;
  searchPlaceholder?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export function SearchableDropdown<T>({
  label,
  selection,
  options,
  onSelectionChange,
  optionTitle,
  searchPlaceholder = 'Search…',
  style,
  accessibilityLabel,
  theme: themeProp,
}: SearchableDropdownProps<T>) {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) =>
      optionTitle(option).toLowerCase().includes(needle)
    );
  }, [options, optionTitle, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

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
      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <Pressable style={[styles.backdrop, { backgroundColor: `rgba(0,0,0,${theme.colors.overlayAlpha})` }]} onPress={close}>
          <View
            style={[
              styles.sheet,
              {
                borderTopLeftRadius: theme.radius.lg,
                borderTopRightRadius: theme.radius.lg,
                paddingTop: theme.spacing.sm,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <RNTextInput
              value={query}
              onChangeText={setQuery}
              placeholder={searchPlaceholder}
              placeholderTextColor={theme.colors.textSecondary}
              autoCorrect={false}
              autoCapitalize="none"
              style={[
                styles.searchInput,
                {
                  borderRadius: theme.radius.md,
                  paddingHorizontal: theme.spacing.md,
                  marginHorizontal: theme.spacing.md,
                  marginBottom: theme.spacing.xs,
                  color: theme.colors.textPrimary,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                },
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
                  style={[styles.option, { paddingHorizontal: theme.spacing.md }]}
                >
                  <Text style={{ color: theme.colors.textPrimary }}>{optionTitle(item)}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text
                  style={[
                    styles.empty,
                    {
                      fontSize: theme.typography.footnote.fontSize,
                      paddingVertical: theme.spacing.lg,
                      color: theme.colors.textSecondary,
                    },
                  ]}
                >
                  No matches
                </Text>
              }
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
  searchInput: {
    minHeight: 40,
    borderWidth: 1,
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
  },
});
