// MerchantDetailScreen.js
import RecommendationCard from '@/components/Posts/RecommendationCard';
import RatingStars from '@/components/Posts/components/RatingStars';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// 模拟API调用的函数
const fetchMerchantPosts = async (merchantId) => {
  try {
    // 模拟数据
    return [
      {
        id: 1,
        authorId: 1,
        circleId: 4,
        merchantId: merchantId,
        name: '美味午餐体验',
        content: '这家餐厅的牛排简直太棒了！肉质鲜嫩多汁，服务也非常周到。强烈推荐给大家！',
        score: 4.5,
        createdAt: '2025-06-15',
        updatedAt: '2025-06-15',
        type: 'food',
        priceLevel: '2',
        images: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2']
      },
      {
        id: 2,
        authorId: 2,
        circleId: 4,
        merchantId: merchantId,
        name: '环境优雅的下午茶',
        content: '周末和朋友一起来这里喝下午茶，环境非常优雅，甜点也很精致。价格适中，值得再来！',
        score: 4.0,
        createdAt: '2025-06-10',
        updatedAt: '2025-06-10',
        type: 'food',
        priceLevel: '2',
        images: ['https://picsum.photos/400/300?random=3']
      },
      {
        id: 3,
        authorId: 3,
        circleId: 4,
        merchantId: merchantId,
        name: '性价比超高的晚餐',
        content: '第一次来这家店，没想到性价比这么高！分量很足，味道也不错，以后会常来的。',
        score: 3.5,
        createdAt: '2025-06-05',
        updatedAt: '2025-06-05',
        type: 'food',
        priceLevel: '1',
        images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6']
      }
    ];
  } catch (error) {
    console.error('获取帖子数据失败:', error);
    return [];
  }
};

// 帖子项组件
const PostItem = ({ post }) => {
  const ratingOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ];
  
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.name}</Text>
        <View style={styles.rating}>
          <RatingStars rating={post.score} />
          <Text style={styles.ratingNumber}>{post.score}</Text>
        </View>
      </View>
      
      {post.images && post.images.length > 0 && (
        <View style={styles.postImages}>
          {post.images.map((image, index) => (
            <Image 
              key={index} 
              source={{ uri: image }} 
              style={styles.postImage} 
              resizeMode="cover"
            />
          ))}
        </View>
      )}
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      <View style={styles.postMeta}>
        <Text style={styles.postDate}>{post.createdAt}</Text>
        <View style={styles.postTags}>
          <Text style={styles.postTag}>{post.type}</Text>
          <Text style={styles.postTag}>价格: {post.priceLevel === '1' ? '¥' : post.priceLevel === '2' ? '¥¥' : '¥¥¥'}</Text>
        </View>
      </View>
    </View>
  );
};

const MerchantDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const merchantId = route.params?.merchantId || 1;
  const [merchant, setMerchant] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 模拟获取商家信息，实际项目中应从API获取
  const getMerchantInfo = (merchantId) => {
    // 这里使用RecommendationCard中的数据结构模拟商家信息
    return {
      id: merchantId,
      imageUrl: 'https://picsum.photos/600/400?random=' + merchantId,
      title: '商家名称 ' + merchantId,
      rating: 4.2,
      location: '北京市朝阳区',
      type: '餐厅',
      priceRange: 2,
      description: '这是一家很棒的商家，提供优质的产品和服务，深受顾客喜爱。',
      tags: ['美食', '休闲', '聚会'],
      timeAgo: '1周前更新',
      recommenders: [
        {
          id: 1,
          name: '张三',
          avatarUrl: 'https://picsum.photos/100/100?random=101'
        },
        {
          id: 2,
          name: '李四',
          avatarUrl: 'https://picsum.photos/100/100?random=102'
        }
      ],
      websiteUrl: 'https://www.example.com/merchant/' + merchantId
    };
  };
  
  useEffect(() => {
    if (!merchantId) {
      setError('商家ID不存在');
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 获取商家信息
        const merchantInfo = getMerchantInfo(merchantId);
        setMerchant(merchantInfo);
        
        // 获取商家帖子
        const postsData = await fetchMerchantPosts(merchantId);
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
  
  const renderHeader = () => {
    if (!merchant || isLoading) return null;
    
    return (
      <View style={styles.headerContainer}>
        <RecommendationCard 
          recommendation={merchant}
        />
      </View>
    );
  };
  
  const renderPosts = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3cdddd" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      );
    }
    
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setError('');
              setIsLoading(true);
              fetchMerchantPosts(merchantId).then(data => setPosts(data)).finally(() => setIsLoading(false));
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    if (posts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No related posts yet</Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderHeader()}
        <View style={styles.postsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>User posts</Text>
          </View>
          {renderPosts()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    marginBottom: 16,
  },
  postsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
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
  postImages: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: 150,
  },
  postImage: {
    flex: 1,
    height: '100%',
  },
  postContent: {
    color: '#cccccc',
    fontSize: 14,
    padding: 16,
    lineHeight: 20,
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
  postsContainer: {
    paddingBottom: 20,
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
  },
  emptyText: {
    color: '#888888',
    fontSize: 14,
  },
});

export default MerchantDetailScreen; 