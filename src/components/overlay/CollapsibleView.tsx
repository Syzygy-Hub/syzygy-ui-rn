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
}

/** An expandable/collapsible section (accordion) with a tappable header. */
export const CollapsibleView: React.FC<CollapsibleViewProps> = ({
  title,
  initiallyExpanded = false,
  children,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
      <TouchableOpacity
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${expanded ? 'expanded' : 'collapsed'}`}
        style={styles.header}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={{ color: colors.textSecondary }}>{expanded ? '⌃' : '⌄'}</Text>
      </TouchableOpacity>
      {expanded ? <View style={styles.content}>{children}</View> : null}
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
    paddingHorizontal: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
  },
});
