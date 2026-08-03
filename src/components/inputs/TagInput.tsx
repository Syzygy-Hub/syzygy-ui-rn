import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { fontSizes } from '../../tokens/typography';
import { Chip } from '../display/Chip';

export interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** A text input that renders entered tags as dismissible `Chip`s, adding a new tag on submit. */
export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add a tag',
  style,
  accessibilityLabel,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
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
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }, style]}
      accessibilityLabel={accessibilityLabel ?? 'Tags'}
    >
      {tags.map((tag, index) => (
        <Chip key={`${tag}-${index}`} text={tag} onRemove={() => removeTag(index)} style={styles.chip} />
      ))}
      <RNTextInput
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={commitDraft}
        onBlur={commitDraft}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.textPrimary }]}
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
    borderRadius: radius.md,
    padding: spacing.xs,
  },
  chip: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  input: {
    flexGrow: 1,
    minWidth: 80,
    minHeight: 32,
    fontSize: fontSizes.md,
    paddingHorizontal: spacing.xs,
  },
});
