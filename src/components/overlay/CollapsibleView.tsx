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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface CollapsibleViewProps {
  title: string;
  initiallyExpanded?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  title,
  initiallyExpanded = false,
  children,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }, style]}>
      <TouchableOpacity
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${expanded ? 'expanded' : 'collapsed'}`}
        style={[styles.header, { paddingHorizontal: theme.spacing.md }]}
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
          {title}
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
          {children}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {},
  title: {},
});
