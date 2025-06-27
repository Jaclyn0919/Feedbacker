// MerchantDetailScreen.js
import RatingStars from '@/components/Posts/components/RatingStars';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// 模拟API调用的函数
const fetchMerchantPosts = async (merchantId) => {
  try {
    // 补充更完整的模拟数据，修复图片URL重复问题
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
        images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5', 'https://picsum.photos/400/300?random=6', 'https://picsum.photos/400/300?random=7', 'https://picsum.photos/400/300?random=8', 'https://picsum.photos/400/300?random=9']
      },
      {
        id: 4,
        authorId: 4,
        circleId: 4,
        merchantId: merchantId,
        name: '早餐新选择',
        content: '发现了一家很棒的早餐店，他们的三明治和咖啡搭配得非常好，价格也很实惠。',
        score: 4.2,
        createdAt: '2025-06-01',
        updatedAt: '2025-06-01',
        type: 'breakfast',
        priceLevel: '1',
        images: ['https://picsum.photos/400/300?random=10', 'https://picsum.photos/400/300?random=11']
      }
    ];
  } catch (error) {
    console.error('获取帖子数据失败:', error);
    return [];
  }
};

// 帖子项组件 - 添加事件拦截优化滚动
const PostItem = ({ post }) => {
  const [comments, setComments] = useState([
    {
      id: post.id + '_comment1',
      author: '用户1',
      text: '非常同意，这家店的牛排确实很棒！',
      date: '2025-06-16 10:30',
      isEditing: false,
      editedText: null,
    },
    {
      id: post.id + '_comment2',
      author: '用户2',
      text: '我也来过，服务确实很周到，环境也不错。',
      date: '2025-06-17 14:15',
      isEditing: false,
      editedText: null,
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // 添加评论
  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      author: '你', 
      text: newCommentText,
      date: formatDate(new Date()),
      isEditing: false,
      editedText: null,
    };
    
    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  // 删除评论
  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  // 开始编辑评论
  const handleStartEdit = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, isEditing: true } : comment
      )
    );
  };

  // 取消编辑
  const handleCancelEdit = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, isEditing: false, editedText: null }
          : comment
      )
    );
  };

  // 更新编辑中的评论内容
  const handleEditCommentText = (commentId, text) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, editedText: text } : comment
      )
    );
  };

  // 保存编辑
  const handleSaveEdit = (commentId) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            text: comment.editedText || comment.text,
            isEditing: false,
            editedText: null,
          };
        }
        return comment;
      })
    );
  };

  // 日期格式化函数
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  
  return (
    <View 
      style={styles.postContainer}
      // 阻止事件向上传递，避免ScrollView拦截
      onTouchStart={(e) => e.stopPropagation()}
    >
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.name}</Text>
        <View style={styles.rating}>
          <RatingStars rating={post.score} />
          <Text style={styles.ratingNumber}>{post.score}</Text>
        </View>
      </View>
      
      <View style={styles.postImagesContainer}>
        {post.images.map((image, index) => (
          <Image 
            key={index} 
            source={{ uri: image }} 
            style={[
              styles.postImage,
              {
                marginLeft: 0,
                marginRight: 0,
                marginBottom: index === post.images.length - 1 ? 0 : 8,
              }
            ]} 
            resizeMode="cover"
          />
        ))}
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      <View style={styles.postMeta}>
        <Text style={styles.postDate}>{post.createdAt}</Text>
        <View style={styles.postTags}>
          <Text style={styles.postTag}>{post.type}</Text>
          <Text style={styles.postTag}>Prices: {post.priceLevel === '1' ? '¥' : post.priceLevel === '2' ? '¥¥' : '¥¥¥'}</Text>
        </View>
      </View>
      
      {/* 评论输入区域 */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="添加评论..."
          value={newCommentText}
          onChangeText={(text) => setNewCommentText(text)}
        />
        <Button
          title="发布"
          onPress={handleAddComment}
          disabled={!newCommentText.trim()}
        />
      </View>
      
      {/* 评论列表 */}
      <View style={styles.commentsContainer}>
        {comments.length === 0 ? (
          <Text style={styles.noCommentsText}>暂无评论</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentDate}>{comment.date}</Text>
              </View>
              {comment.isEditing ? (
                <View>
                  <TextInput
                    style={styles.commentEditInput}
                    value={comment.editedText || comment.text}
                    onChangeText={(text) => handleEditCommentText(comment.id, text)}
                  />
                  <View style={styles.commentActions}>
                    <Button title="取消" onPress={() => handleCancelEdit(comment.id)} />
                    <Button title="保存" onPress={() => handleSaveEdit(comment.id)} />
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  <View style={styles.commentActions}>
                    <Button title="编辑" onPress={() => handleStartEdit(comment.id)} />
                    <Button title="删除" onPress={() => handleDeleteComment(comment.id)} />
                  </View>
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const MerchantDetailScreen = () => {
  const route = useRoute();
  const merchantId = route.params?.item?.merchantId || 1;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(route)
  
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
  
  // 渲染列表内容（根据不同状态）
  const RenderListContent = ({post}) => {
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
    
    // 正常渲染帖子列表
    return    <PostItem key={post.id} post={post} />
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 直接使用FlatList作为主滚动容器 */}
      <FlatList
        // 关键属性：开启嵌套滚动支持（iOS必加）
        nestedScrollEnabled={true}
        // Android平台优化：控制滚动边界效果
        overScrollMode={Platform.OS === 'android' ? 'always' : 'auto'}
        // iOS平台优化：加快滚动减速
        decelerationRate={Platform.OS === 'ios' ? 'fast' : 'normal'}
        // 性能优化：减少不必要的渲染
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={15}
        // 列表配置
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <RenderListContent post={item} />}
        contentContainerStyle={[
          styles.postsContainer,
          { paddingHorizontal: 16, paddingBottom: 32 } // 合并原postsSection的样式
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  postsContainer: {
    // 移除了paddingHorizontal，改为在FlatList的contentContainerStyle中设置
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
  },
  postImage: {
    width: '100%',  // 占满容器宽度
    height: 150,    // 固定高度
    borderRadius: 8,
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
  // 评论相关样式
  commentInputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    color: '#ffffff',
  },
  commentsContainer: {
    padding: 16,
  },
  noCommentsText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
  commentItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  commentDate: {
    color: '#888888',
    fontSize: 12,
  },
  commentText: {
    color: '#cccccc',
    marginBottom: 8,
  },
  commentEditInput: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    color: '#ffffff',
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  // 加载和错误状态样式
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