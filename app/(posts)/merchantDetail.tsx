import RatingStars from '@/components/posts/RatingStars';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const fetchMerchantPosts = async (merchantId) => {
  return [
    {
      id: 1,
      authorId: 1,
      circleId: 4,
      merchantId,
      name: 'Great lunch experience',
      content: 'The steak was amazing—tender and juicy. Highly recommended!',
      score: 4.5,
      createdAt: '2025-06-15',
      type: 'food',
      priceLevel: '2',
      images: ['https://picsum.photos/400/300?random=1'],
    },
    {
      id: 2,
      authorId: 2,
      circleId: 4,
      merchantId,
      name: 'High value dinner',
      content: 'Surprisingly affordable and filling! I’ll come back.',
      score: 3.5,
      createdAt: '2025-06-05',
      type: 'food',
      priceLevel: '1',
      images: ['https://picsum.photos/400/300?random=4'],
    },
  ];
};

const PostItem = ({ post }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const onViewDetail = () => {
    navigation.navigate('(posts)/postDetail', {
      postId: post.id,
      item: route?.params?.item,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>
          {route?.params?.item?.name || 'Merchant'}
        </Text>
      </View>

      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.name}</Text>
        <View style={styles.rating}>
          <RatingStars rating={post.score} />
          <Text style={styles.ratingNumber}>{post.score}</Text>
        </View>
      </View>

      <View style={styles.postImagesContainer}>{renderImages()}</View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="heart" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="trash-2" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.postMeta}>
        <Text style={styles.postDate}>{formatDate(post.createdAt)}</Text>
        <View style={styles.postTags}>
          <Text style={styles.postTag}>{post.type}</Text>
          <Text style={styles.postTag}>
            Price: {post.priceLevel === '1' ? '$' : post.priceLevel === '2' ? '$$' : '$$$'}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onViewDetail}>
        <Text style={styles.actionButtonText}>
          <Feather name="book-open" size={14} /> View Post Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const MerchantDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const merchantId = route.params?.item?.merchantId || 1;
  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMerchantPosts(merchantId);
      setPosts(data);
    };
    fetchData();
  }, [merchantId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 统一风格的 Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleGroup}>
          <Text style={styles.pageTitle}>Feedbacker</Text>
          <Text style={styles.pageSubtitle}>Merchant Posts</Text>
        </View>
        <View style={{ width: 24 }} /> {/* 占位使标题居中 */}
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No related posts yet</Text>
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          paddingTop: 16, // 与 header 拉开距离
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleGroup: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  pageSubtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  postContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  postHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  postImagesContainer: {
    backgroundColor: '#222',
  },
  postImage: {
    width: '100%',
    height: width * 0.45,
  },
  cardActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#555',
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#222',
  },
  postDate: {
    color: '#888',
    fontSize: 12,
  },
  postTags: {
    flexDirection: 'row',
    gap: 8,
  },
  postTag: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  actionButtonText: {
    color: '#00BFFF',
    fontSize: 14,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});

export default MerchantDetailScreen;
