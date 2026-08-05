import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { SyzygyTheme, useSyzygyTheme } from '../../theme';

export interface StarRatingViewProps {
  rating: number;
  maxRating?: number;
  onRatingChanged?: (rating: number) => void;
  style?: StyleProp<ViewStyle>;
  theme?: SyzygyTheme;
}

export const StarRatingView: React.FC<StarRatingViewProps> = ({
  rating,
  maxRating = 5,
  onRatingChanged,
  style,
  theme: themeProp,
}) => {
  const { theme: contextTheme } = useSyzygyTheme();
  const theme = themeProp ?? contextTheme;
  const stars = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <View
      style={[styles.container, style]}
      accessibilityLabel={`Rating: ${rating} out of ${maxRating} stars`}
    >
      {stars.map((star) => {
        const filled = star <= rating;
        const glyph = filled ? '★' : '☆';
        const color = filled ? theme.colors.warning : theme.colors.textSecondary;

        if (!onRatingChanged) {
          return (
            <Text key={star} style={[styles.starText, { color }]}>
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
            <Text style={[styles.starText, { color }]}>{glyph}</Text>
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
    fontSize: 20, // Hardcoded: star glyph size, not a typography token
  },
});
