import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';

export interface StarRatingViewProps {
  rating: number;
  maxRating?: number;
  onRatingChanged?: (rating: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A star rating display. Pass `onRatingChanged` to make it interactively
 * tappable; omit it for a read-only display.
 */
export const StarRatingView: React.FC<StarRatingViewProps> = ({
  rating,
  maxRating = 5,
  onRatingChanged,
  style,
}) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <View
      style={[styles.container, style]}
      accessibilityLabel={`Rating: ${rating} out of ${maxRating} stars`}
    >
      {stars.map((star) => {
        const filled = star <= rating;
        const glyph = filled ? '★' : '☆';
        const color = filled ? colors.warning : colors.textSecondary;

        if (!onRatingChanged) {
          return (
            <Text key={star} style={{ color, fontSize: 20 }}>
              {glyph}
            </Text>
          );
        }
        return (
          <TouchableOpacity
            key={star}
            onPress={() => onRatingChanged(star)}
            accessibilityRole="button"
            accessibilityLabel={`${star} star${star === 1 ? '' : 's'}`}
            style={styles.star}
          >
            <Text style={{ color, fontSize: 20 }}>{glyph}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
