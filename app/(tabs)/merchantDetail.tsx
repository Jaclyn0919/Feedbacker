// MerchantDetailScreen.js
import AddRecommendationModal from '@/components/Posts/AddRecommendationModal';
import RatingStars from '@/components/Posts/components/RatingStars';
// import * as api from '@/utils/http';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const fetchMerchantPosts = async (merchantId:any,circleId:any) => {
  try {
    return [
      {
        id: 1,
        authorId: 1,
        circleId: 4,
        merchantId: merchantId,
        name: 'Delicious lunch experience',
        content: 'The steak at this restaurant was absolutely amazing! The meat was tender and juicy, and the service was excellent. Highly recommended!',
        score: 4.5,
        createdAt: '2025-06-15',
        updatedAt: '2025-06-15',
        type: 'food',
        priceLevel: '2',
        images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2']
      },
      {
        id: 3,
        authorId: 3,
        circleId: 4,
        merchantId: merchantId,
        name: 'Great value-for-money dinner',
        content: 'It was my first time at this restaurant, and I didn’t expect it to be such great value! The portions were generous and the food tasted great. I will definitely be coming back.',
        score: 3.5,
        createdAt: '2025-06-05',
        updatedAt: '2025-06-05',
        type: 'food',
        priceLevel: '1',
        images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6', 'https://picsum.photos/400/300?random=7', 'https://picsum.photos/400/300?random=8', 'https://picsum.photos/400/300?random=9']
      },
      {
        id: 4,
        authorId: 4,
        circleId: 4,
        merchantId: merchantId,
        name: 'A new breakfast option',
        content: 'I discovered a great new breakfast spot—their sandwiches and coffee make a perfect combo, and the prices are very reasonable.',
        score: 4.2,
        createdAt: '2025-06-01',
        updatedAt: '2025-06-01',
        type: 'breakfast',
        priceLevel: '1',
        images: []
      }
    ];
    // const data = {
    //   merchantId,
    //   circleId,
    //   page: 1,
    //   size:99999
    // }
    // api.post('/api/posts/list', data).then(res => {
    //   console.log('res is',res)
    // })
  } catch (error) {
    console.error('获取帖子数据失败:', error);
    return [];
  }
};

const PostItem = ({ post }) => {
  const [isOpenRec, setIsOpenRec] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const onViewDetail = () => {
    navigation.navigate('postDetail', { postId:post.id,item:route?.params?.item });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const onLikePosts = () => {
    // const flag = true
    // const url = flag ? '/api/posts/like' : '/api/posts/unlike'
    // api.post(url, { postId: post.id }).then(res => {
    //   console.log('res is',res)
    // })
  }
  const onCloseRec = () => {
    setIsOpenRec(false)
  }
  
  const renderImages = () => {
    if (!post.images || post.images.length === 0) return null;
    return (
        <Image 
          source={{ uri: post.images[0] }} 
          style={styles.postImage} 
          resizeMode="cover"
        />
      );
  };

  return (
    <View 
      style={styles.postContainer}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{route?.params?.item?.name || ''}</Text>
      </View>

      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.name}</Text>
        <View style={styles.rating}>
          <RatingStars rating={post.score} />
          <Text style={styles.ratingNumber}>{post.score}</Text>
        </View>
      </View>
      
      <View style={styles.postImagesContainer}>
        {renderImages()}
      </View>

        {/* 卡片操作按钮 */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionBtn, post.isLiked && styles.actionBtnLiked]}
            onPress={() => {
              console.log('like')
              onLikePosts()
            }}
          >
            <Text style={[styles.actionBtnText, post.isLiked && styles.actionBtnTextLiked]}>
              {post.isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => {
              console.log('123')
            }}
          >
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      
      <View style={styles.postMeta}>
        <Text style={styles.postDate}>{formatDate(post.createdAt)}</Text>
        <View style={styles.postTags}>
          <Text style={styles.postTag}>{post.type}</Text>
          <Text style={styles.postTag}>Prices: {post.priceLevel === '1' ? '$' : post.priceLevel === '2' ? '$$' : '$$$'}</Text>
        </View>
      </View>

    <TouchableOpacity 
      onPress={() => onViewDetail(post.id)}
    >
      <Text style={styles.actionButtonText}>
        <Text style={styles.actionButtonIcon}>📖</Text> View This Post Detail
      </Text>
    </TouchableOpacity>
      {isOpenRec  && <AddRecommendationModal isOpenRec={isOpenRec} onCloseRec={onCloseRec}  type={'edit'} item={post} />}
    </View>
  );
};

const MerchantDetailScreen = () => {
  const route = useRoute();
  const merchantId = route.params?.item?.merchantId || 1;
  const circleId = route.params?.item?.circleId || 1;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!merchantId) {
      setError('商家ID不存在');
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // 获取商家帖子
        const postsData = await fetchMerchantPosts(merchantId,circleId);
        setPosts(postsData);
        
      } catch (err) {
        setError('获取数据失败，请稍后再试');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [merchantId]);
  
  const renderItem = ({ item }) => (
    <PostItem 
      post={item}
    />
  );
  
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No related posts yet</Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        overScrollMode={Platform.OS === 'android' ? 'always' : 'auto'}
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 'normal'}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={15}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.postsContainer,
          { paddingHorizontal: 16, paddingBottom: 32 }
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  postsContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  postHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  postTitle: {
    fontSize: 16,
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
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  postImagesContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#222222',
  },
  postImage: {
    width: '100%',
    height: width * 0.45,
    borderRadius: 8,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#222222',
  },
  postDate: {
    color: '#888888',
    fontSize: 12,
  },
  postTags: {
    flexDirection: 'row',
    gap: 8,
  },
  postTag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: '#ffffff',
    fontSize: 12,
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
  actionButtonText: {
    color: '#3cdddd',
    fontSize: 14,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  actionButtonIcon: {
    marginRight: 5,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#888888',
    marginTop: 10,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff5252',
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    color: '#888888',
    fontSize: 14,
  },
});

export default MerchantDetailScreen;