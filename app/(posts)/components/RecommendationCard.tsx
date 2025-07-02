// import { Picker } from '@react-native-picker/picker';
import AddRecommendationModal from '@/app/(posts)/components/AddRecommendationModal';
import RatingStars from '@/app/(posts)/components/RatingStars';
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

// 推荐卡片组件
const RecommendationCard = ({ 
  recommendation,
  onLike,
}: any) => {
  const [isLiked, setIsLiked] = useState(recommendation?.isLiked || false);
  const navigation = useNavigation();
  const [isOpenRec, setIsOpenRec] = useState(false);

  const route = useRoute();

  // 渲染价格范围
  const renderPriceRange = (priceRange: number) => {
    const dollarSigns = [];
    for (let i = 0; i < priceRange; i++) {
      dollarSigns.push(
        <Text key={`dollar-${i}`} style={styles.priceSign}>$</Text>
      );
    }
    return dollarSigns;
  };

  const onCloseRec = () => {
    setIsOpenRec(false)
  }

  const onLikeMerchant = (merchantId:number|string) => {
    const data = {
      merchantId
    }
    const flag = true
    const api = flag ? '/api/merchants/favorite' : '/api/merchants/unfavorite'
    post(api,data).then(res => {
      // setCircleList(res.data);
      console.log('res is',res)
    });
  }

 const goMechantDetail = (item: any) => {
  navigation.navigate('(posts)/merchantDetail', {
    item
  });
};

  return (
    <View style={styles.card}>
      {/* 卡片图片区域 */}
      <View style={styles.cardImageContainer}>
        {recommendation?.images?.length ? (
          <Image 
            source={{ uri: recommendation.images[0] }} 
            style={styles.cardImage} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📷 {recommendation.name}</Text>
          </View>
        )}
        
        {/* 卡片操作按钮 */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionBtn, isLiked && styles.actionBtnLiked]}
            onPress={() => {
              setIsLiked(!isLiked);
              onLikeMerchant(recommendation.merchantId)
            }}
          >
            <Text style={[styles.actionBtnText, isLiked && styles.actionBtnTextLiked]}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* 分类标签 */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{recommendation.type}</Text>
        </View>
      </View>
      
      {/* 卡片内容区域 */}
      <View style={styles.cardContent}>
        {/* 卡片头部（标题和评分） */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{recommendation.name}</Text>
          <View style={styles.rating}>
            <RatingStars rating={recommendation.score} />
            <Text style={styles.ratingNumber}>{recommendation.score}</Text>
          </View>
        </View>
        
        {/* 位置和类型 */}
        <Text style={styles.location}>{recommendation.address} • {recommendation.type}</Text>
        
        {/* 价格范围 */}
        <View style={styles.priceContainer}>
          {renderPriceRange(recommendation.priceRange || 3)}
        </View>
        
        {/* 描述 */}
        <Text style={styles.description}>{recommendation.content}</Text>
        
        {/* 标签 */}
        <View style={styles.tags}>
          {recommendation.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        
        {/* 时间信息 */}
        <Text style={styles.timeInfo}>🕒 {recommendation.createdAt}</Text>
        
        {/* 推荐人 */}
        {recommendation.recommenders && recommendation.recommenders.length > 0 && (
          <View style={styles.recommendersContainer}>
            <Text style={styles.recommendersLabel}>Recommended by:</Text>
            <View style={styles.recommendersList}>
              { recommendation.recommenders.map((recommender:any, index : any) => (
                <View key={index} style={styles.recommenderItem}>
                  {recommender.avatarUrl ? (
                    <Image 
                      source={{ uri: recommender.avatarUrl }} 
                      style={styles.recommenderAvatar} 
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.recommenderAvatarPlaceholder}>
                      <Text style={styles.recommenderInitials}>
                        {recommender.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.recommenderName}>{recommender.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* 操作按钮 */}
        <View style={styles.actionButtons}>
          {route.name === 'index' && <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => goMechantDetail(recommendation)}
          >
            <Text style={styles.actionButtonText}>
              <Text style={styles.actionButtonIcon}>📖</Text> View Merchant Posts
            </Text>
          </TouchableOpacity>}
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              goMechantDetail(recommendation)
            }}
          >
            <Text style={styles.actionButtonText}>
              <Text style={styles.actionButtonIcon}>🌐</Text> View Website
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isOpenRec  && <AddRecommendationModal isOpenRec={isOpenRec} onCloseRec={onCloseRec}  type={'edit'} item={recommendation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 16,
  },
  cardActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  actionBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionBtnLiked: {
    backgroundColor: '#ff3e6c',
    borderColor: '#ff3e6c',
  },
  actionBtnText: {
    fontSize: 16,
    color: '#ffffff',
  },
  actionBtnTextLiked: {
    color: '#ffffff',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadgeText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingNumber: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  location: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  priceSign: {
    color: '#ff9500',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  timeInfo: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 12,
  },
  recommendersContainer: {
    marginBottom: 12,
  },
  recommendersLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 6,
  },
  recommendersList: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  recommenderInitials: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  recommenderName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: '#444444',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtonIcon: {
    fontSize: 14,
  },
  userRatingSection: {
    borderTopWidth: 1,
    borderColor: '#333333',
    paddingTop: 12,
  },
  userRatingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userRatingTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  userRatingStars: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userComment: {
    backgroundColor: '#222222',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white',
    marginVertical: 10,
    backgroundColor: '#222',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 15,
  },
  commentForm: {
    marginTop: 8,
  },
  commentInput: {
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 8,
  },
  commentFormActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  comentCommentButton: { 
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  commentFormButtonSave: {
    backgroundColor: '#3cdddd',
  },
  commentFormButtonCancelEdit: {
    backgroundColor: '#0f1729',
  },
  commentFormButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RecommendationCard;