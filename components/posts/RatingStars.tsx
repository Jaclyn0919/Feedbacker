import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type RatingStarsProps = {
  rating: number;
  maxRating?: number;
  containerStyle?: ViewStyle;
  fullStarStyle?: TextStyle;
  halfStarStyle?: TextStyle;
  emptyStarStyle?: TextStyle;
  starSize?: number;
  showRatingText?: boolean;
  ratingTextStyle?: TextStyle;
};

const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 0,
  maxRating = 5,
  containerStyle,
  fullStarStyle,
  halfStarStyle,
  emptyStarStyle,
  starSize = 16,
  showRatingText = false,
  ratingTextStyle,
}) => {
  // 确保评分在有效范围内
  const clampedRating = Math.max(0, Math.min(rating, maxRating));
  const stars = [];
  
  // 计算各种星星的数量
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  // 添加满星
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FontAwesome 
        key={`full-star-${i}`} 
        name="star" 
        size={starSize} 
        style={[styles.ratingStar, fullStarStyle]} 
      />
    );
  }

  // 添加半星
  if (hasHalfStar) {
    stars.push(
      <FontAwesome 
        key="half-star" 
        name="star-half-o" 
        size={starSize} 
        style={[styles.ratingStarHalf, halfStarStyle]} 
      />
    );
  }

  // 添加空星
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FontAwesome 
        key={`empty-star-${i}`} 
        name="star-o" 
        size={starSize} 
        style={[styles.ratingStarEmpty, emptyStarStyle]} 
      />
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.starsContainer}>{stars}</View>
      {showRatingText && (
        <Text style={[styles.ratingText, ratingTextStyle]}>
          {clampedRating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingStar: {
    color: '#ffd700',
  },
  ratingStarHalf: {
    color: '#ffd700',
  },
  ratingStarEmpty: {
    color: '#666666',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333333',
  },
});

export default RatingStars;    