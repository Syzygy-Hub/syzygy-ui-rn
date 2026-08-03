import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle, useColorScheme } from 'react-native';

import { getColors } from '../../tokens/colors';

export interface RatingInputProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * An interactive, always-tappable counterpart to `StarRatingView` (which is
 * read-only unless its optional `onRatingChanged` is supplied). Use
 * `RatingInput` whenever the star row is meant to collect input.
 */
export const RatingInput: React.FC<RatingInputProps> = ({ rating, onRatingChange, maxRating = 5, style }) => {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <View style={[styles.container, style]} accessibilityLabel={`Rating: ${rating} out of ${maxRating} stars`}>
      {stars.map((star) => {
        const filled = star <= rating;
        return (
          <TouchableOpacity
            key={star}
            onPress={() => onRatingChange(star)}
            accessibilityRole="button"
            accessibilityLabel={`${star} star${star === 1 ? '' : 's'}`}
            style={styles.star}
          >
            <Text style={[styles.starText, { color: filled ? colors.warning : colors.textSecondary }]}>
              {filled ? '★' : '☆'}
            </Text>
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
  starText: {
    fontSize: 20,
  },
});
