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
} from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

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
  theme?: SyzygyTheme;
}

export const Accordion: React.FC<AccordionProps> = ({
  sections,
  allowMultipleOpen = false,
  initiallyOpenKeys,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
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
    <View
      style={[styles.container, { backgroundColor: theme.colors.surface }, style]}
    >
      {sections.map((section, index) => {
        const expanded = openKeys.includes(section.key);
        return (
          <View
            key={section.key}
            style={
              index > 0
                ? [styles.sectionDivider, { borderTopColor: theme.colors.border }]
                : null
            }
          >
            <TouchableOpacity
              onPress={() => toggle(section.key)}
              accessibilityRole="button"
              accessibilityLabel={`${section.title}, ${expanded ? 'expanded' : 'collapsed'}`}
              style={[
                styles.header,
                {
                  paddingHorizontal: theme.spacing.md,
                  paddingVertical: theme.spacing.sm,
                },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: theme.typography.body.fontSize,
                    fontWeight: theme.typography.headline.fontWeight,
                    color: theme.colors.textPrimary,
                  },
                ]}
              >
                {section.title}
              </Text>
              <Text style={{ color: theme.colors.textSecondary }}>{expanded ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
            {expanded ? (
              <View
                style={[
                  styles.content,
                  {
                    paddingHorizontal: theme.spacing.md,
                    paddingBottom: theme.spacing.md,
                  },
                ]}
              >
                {section.content}
              </View>
            ) : null}
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
  },
  title: {},
  content: {},
});
