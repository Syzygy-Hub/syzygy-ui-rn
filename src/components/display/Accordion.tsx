import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';

import { getColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontSizes, fontWeights } from '../../tokens/typography';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionSection {
  key: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  sections: AccordionSection[];
  /** Allow more than one section open at once. Defaults to single-open. */
  allowMultipleOpen?: boolean;
  /** Keys of initially expanded sections. */
  initiallyOpenKeys?: string[];
  style?: StyleProp<ViewStyle>;
}

/**
 * A vertically stacked list of expandable/collapsible sections, single-open
 * at a time by default (opening one section closes the others), or
 * `allowMultipleOpen` to let several stay open independently.
 *
 * Mirrors `CollapsibleView`'s `LayoutAnimation`-driven expand/collapse for
 * each individual section, but coordinates open/closed state across the
 * whole group rather than owning it per-section.
 */
export const Accordion: React.FC<AccordionProps> = ({
  sections,
  allowMultipleOpen = false,
  initiallyOpenKeys,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [openKeys, setOpenKeys] = useState<string[]>(initiallyOpenKeys ?? []);

  const toggle = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenKeys((prev) => {
      const isOpen = prev.includes(key);
      if (allowMultipleOpen) {
        return isOpen ? prev.filter((k) => k !== key) : [...prev, key];
      }
      return isOpen ? [] : [key];
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
      {sections.map((section, index) => {
        const expanded = openKeys.includes(section.key);
        return (
          <View
            key={section.key}
            style={index > 0 ? [styles.sectionDivider, { borderTopColor: colors.border }] : null}
          >
            <TouchableOpacity
              onPress={() => toggle(section.key)}
              accessibilityRole="button"
              accessibilityLabel={`${section.title}, ${expanded ? 'expanded' : 'collapsed'}`}
              style={styles.header}
            >
              <Text style={[styles.title, { color: colors.textPrimary }]}>{section.title}</Text>
              <Text style={{ color: colors.textSecondary }}>{expanded ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
            {expanded ? <View style={styles.content}>{section.content}</View> : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  sectionDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  header: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
