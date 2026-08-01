import React from 'react';
import { RefreshControl, ScrollView, StyleProp, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';

export interface PullToRefreshProps {
  refreshing: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** A scrollable container with native pull-to-refresh wired to a refresh handler. */
export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  refreshing,
  onRefresh,
  children,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <ScrollView
      style={style}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      {children}
    </ScrollView>
  );
};
