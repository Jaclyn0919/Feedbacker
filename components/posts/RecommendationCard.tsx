// RecommendationCard.tsx
import AddRecommendationModal from '@/components/posts/AddRecommendationModal';
import RatingStars from '@/components/posts/RatingStars';
import { post } from '@/utils/http';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const RecommendationCard = ({ recommendation }: any) => {
  const [isLiked, setIsLiked] = useState(recommendation?.isLiked || false);
  const [isOpenRec, setIsOpenRec] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const renderPriceRange = (priceRange: number) => {
    return Array(priceRange)
      .fill('$')
      .map((dollar, i) => (
        <Text key={i} style={styles.priceSign}>{dollar}</Text>
      ));
  };

  const onLikeMerchant = (merchantId: number | string) => {
    const api = isLiked ? '/api/merchants/unfavorite' : '/api/merchants/favorite';
    post(api, { merchantId }).then(res => {
      console.log('Like toggled:', res);
    });
  };

  const goMechantDetail = (item: any) => {
    navigation.navigate('(posts)/merchantDetail', { item });
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={styles.cardImageContainer}>
          {recommendation?.images?.length ? (
            <Image source={{ uri: recommendation.images[0] }} style={styles.cardImage} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>📷 {recommendation.name}</Text>
            </View>
          )}
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={[styles.actionBtn, isLiked && styles.actionBtnLiked]}
              onPress={() => {
                setIsLiked(!isLiked);
                onLikeMerchant(recommendation.merchantId);
              }}
            >
              <Text style={styles.actionBtnText}>{isLiked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{recommendation.type}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{recommendation.name}</Text>
            <View style={styles.rating}>
              <RatingStars rating={recommendation.score} />
              <Text style={styles.ratingNumber}>{recommendation.score}</Text>
            </View>
          </View>

          <Text style={styles.location}>{recommendation.address} • {recommendation.type}</Text>
          <View style={styles.priceContainer}>{renderPriceRange(recommendation.priceRange || 3)}</View>
          <Text style={styles.description}>{recommendation.content}</Text>

          <View style={styles.tags}>
            {recommendation.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.timeInfo}>🕒 {recommendation.createdAt}</Text>

          {recommendation.recommenders?.length > 0 && (
            <View style={styles.recommendersContainer}>
              <Text style={styles.recommendersLabel}>Recommended by:</Text>
              <View style={styles.recommendersList}>
                {recommendation.recommenders.map((r: any, i: number) => (
                  <View key={i} style={styles.recommenderItem}>
                    {r.avatarUrl ? (
                      <Image source={{ uri: r.avatarUrl }} style={styles.recommenderAvatar} />
                    ) : (
                      <View style={styles.recommenderAvatarPlaceholder}>
                        <Text style={styles.recommenderInitials}>
                          {r.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.recommenderName}>{r.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.actionButtons}>
            {route.name === 'index' && (
              <TouchableOpacity style={styles.actionButton} onPress={() => goMechantDetail(recommendation)}>
                <Text style={styles.actionButtonText}>📖 View Posts</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.actionButton} onPress={() => goMechantDetail(recommendation)}>
              <Text style={styles.actionButtonText}>🌐 View Website</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isOpenRec && (
        <AddRecommendationModal isOpenRec={isOpenRec} onCloseRec={() => setIsOpenRec(false)} type="edit" item={recommendation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 192,
  },
  imagePlaceholder: {
    width: '100%',
    height: 192,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#888888',
  },
  cardActions: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  actionBtnLiked: {
    backgroundColor: '#ff3e6c',
    borderColor: '#ff3e6c',
  },
  actionBtnText: {
    fontSize: 16,
    color: '#fff',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    color: '#fff',
    marginLeft: 4,
  },
  location: {
    color: '#888',
    marginTop: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  priceSign: {
    color: '#ff9500',
    fontSize: 16,
    marginRight: 2,
  },
  description: {
    color: '#ccc',
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  timeInfo: {
    color: '#666',
    fontSize: 12,
    marginTop: 6,
  },
  recommendersContainer: {
    marginTop: 10,
  },
  recommendersLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  recommendersList: {
    flexDirection: 'row',
    gap: 8,
  },
  recommenderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommenderAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  recommenderAvatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  recommenderInitials: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  recommenderName: {
    color: '#fff',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#444',
    borderWidth: 1,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default RecommendationCard;
