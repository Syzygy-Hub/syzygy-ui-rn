import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  ViewStyle,
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';
import { Chip } from '../display/Chip';

export interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  theme?: SyzygyTheme;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add a tag',
  style,
  accessibilityLabel,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [draft, setDraft] = useState('');

  const commitDraft = () => {
    const trimmed = draft.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
    }
    setDraft('');
  };

  const removeTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radius.md,
          padding: theme.spacing.xs,
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      accessibilityLabel={accessibilityLabel ?? 'Tags'}
    >
      {tags.map((tag, index) => (
        <Chip
          key={`${tag}-${index}`}
          text={tag}
          onRemove={() => removeTag(index)}
          style={[styles.chip, { marginRight: theme.spacing.xs, marginBottom: theme.spacing.xs }]}
          theme={theme}
        />
      ))}
      <RNTextInput
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={commitDraft}
        onBlur={commitDraft}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        style={[
          styles.input,
          {
            fontSize: theme.typography.callout.fontSize,
            paddingHorizontal: theme.spacing.xs,
            color: theme.colors.textPrimary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
  },
  chip: {},
  input: {
    flexGrow: 1,
    minWidth: 80,
    minHeight: 32,
  },
});
