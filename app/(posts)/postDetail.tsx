import RatingStars from '@/components/posts/RatingStars';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Color palette
const COLORS = {
  background: '#121212',
  cardBackground: '#1a1a1a',
  sectionBackground: '#222222',
  border: '#333333',
  primary: '#3cdddd',
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textTertiary: '#888888',
  error: '#ff5252',
};

// Sizing
const { width, height } = Dimensions.get('window');
const SIZES = {
  paddingSmall: width * 0.025,
  paddingMedium: width * 0.05,
  paddingLarge: width * 0.075,
  borderRadius: 12,
  borderWidth: 1,
  imageHeight: height * 0.25,
};

// Simulated API to fetch post detail
const fetchPostDetail = async (postId) => {
  try {
    return {
      id: postId,
      authorId: 1,
      circleId: 4,
      merchantId: 1,
      name: 'Delicious lunch experience',
      content:
        'The steak at this restaurant was absolutely amazing! The meat was tender and juicy, and the service was excellent. Highly recommended!',
      score: 4.5,
      createdAt: '2025-06-15',
      updatedAt: '2025-06-15',
      type: 'food',
      priceLevel: '2',
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
      ],
    };
  } catch (error) {
    console.error('Failed to fetch post detail:', error);
    return null;
  }
};

// Single comment item
const CommentItem = ({ comment, onEdit, onDelete, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(comment.isEditing);
  const [editedText, setEditedText] = useState(comment.editedText || comment.text);

  const handleStartEdit = () => {
    setIsEditing(true);
    onEdit(comment.id);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
    onCancel(comment.id);
  };

  const handleEditCommentText = (text) => {
    setEditedText(text);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onSave(comment.id, editedText);
  };

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentAuthor}>{comment.author}</Text>
        <Text style={styles.commentDate}>{comment.date}</Text>
      </View>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.commentEditInput}
            value={editedText}
            onChangeText={handleEditCommentText}
          />
          <View style={styles.commentActions}>
            <Button title="Cancel" onPress={handleCancelEdit} />
            <Button title="Save" onPress={handleSaveEdit} />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.commentText}>{comment.text}</Text>
          <View style={styles.commentActions}>
            <Button title="Delete" onPress={() => onDelete(comment.id)} />
          </View>
        </View>
      )}
    </View>
  );
};

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const postId = route.params?.postId || 1;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      text: newCommentText,
      date: formatDate(new Date()),
      isEditing: false,
      editedText: null,
    };
    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleStartEditComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, isEditing: true } : comment
      )
    );
  };

  const handleCancelEditComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, isEditing: false, editedText: null }
          : comment
      )
    );
  };

  const handleSaveEditComment = (commentId, text) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, text, isEditing: false, editedText: null }
          : comment
      )
    );
  };

  useEffect(() => {
    if (!postId) {
      setError('Post ID not found.');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const postData = await fetchPostDetail(postId);
        if (postData) {
          setPost(postData);
        } else {
          setError('Failed to fetch post details.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const renderPostContent = () => {
    if (!post) return null;

    return (
      <View style={styles.postContainer}>
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
              style={styles.postImage}
              resizeMode="cover"
            />
          ))}
        </View>

        <Text style={styles.postContent}>{post.content}</Text>

        <View style={styles.postMeta}>
          <Text style={styles.postDate}>{post.createdAt}</Text>
          <View style={styles.postTags}>
            <Text style={styles.postTag}>{post.type}</Text>
            <Text style={styles.postTag}>
              Prices: {post.priceLevel === '1' ? '$' : post.priceLevel === '2' ? '$$' : '$$$'}
            </Text>
          </View>
        </View>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newCommentText}
            onChangeText={(text) => setNewCommentText(text)}
          />
          <Button
            title="Publish"
            onPress={handleAddComment}
            disabled={!newCommentText.trim()}
          />
        </View>

        <View style={styles.commentsContainer}>
          {comments.length === 0 ? (
            <Text style={styles.noCommentsText}>No comments yet</Text>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={handleStartEditComment}
                onDelete={handleDeleteComment}
                onSave={handleSaveEditComment}
                onCancel={handleCancelEditComment}
              />
            ))
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom header matching other screens */}
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleGroup}>
          <Text style={styles.pageTitle}>Feedbacker</Text>
          <Text style={styles.pageSubtitle}>Post Details</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading post details...</Text>
          </View>
        )}

        {error && !isLoading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                setError('');
                setIsLoading(true);
                fetchPostDetail(postId)
                  .then((data) => setPost(data))
                  .finally(() => setIsLoading(false));
              }}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLoading && !error && post && (
          <View style={styles.contentContainer}>{renderPostContent()}</View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  titleGroup: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  pageSubtitle: {
    color: COLORS.textTertiary,
    fontSize: 13,
    marginTop: 2,
  },
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: SIZES.paddingMedium,
    paddingBottom: SIZES.paddingLarge,
  },
  backButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '500',
  },
  postContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.paddingMedium,
    overflow: 'hidden',
    borderWidth: SIZES.borderWidth,
    borderColor: COLORS.border,
  },
  postHeader: {
    padding: SIZES.paddingMedium,
    borderBottomWidth: SIZES.borderWidth,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    color: COLORS.textPrimary,
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  postImagesContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: SIZES.imageHeight,
    borderRadius: 0,
  },
  postContent: {
    color: COLORS.textSecondary,
    fontSize: 16,
    padding: SIZES.paddingMedium,
    lineHeight: 24,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.paddingMedium,
    backgroundColor: COLORS.sectionBackground,
    borderTopWidth: SIZES.borderWidth,
    borderTopColor: COLORS.border,
  },
  postDate: {
    color: COLORS.textTertiary,
    fontSize: 14,
  },
  postTags: {
    flexDirection: 'row',
    gap: 8,
  },
  postTag: {
    backgroundColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    color: COLORS.textPrimary,
    fontSize: 12,
  },
  commentInputContainer: {
    padding: SIZES.paddingMedium,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: SIZES.borderWidth,
    borderTopColor: COLORS.border,
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.border,
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    color: COLORS.textPrimary,
  },
  commentsContainer: {
    padding: SIZES.paddingMedium,
  },
  noCommentsText: {
    color: COLORS.textTertiary,
    fontSize: 14,
    textAlign: 'center',
  },
  commentItem: {
    marginBottom: SIZES.paddingMedium,
    paddingBottom: SIZES.paddingMedium,
    borderBottomWidth: SIZES.borderWidth,
    borderBottomColor: COLORS.border,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  commentDate: {
    color: COLORS.textTertiary,
    fontSize: 12,
  },
  commentText: {
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  commentEditInput: {
    backgroundColor: COLORS.border,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.textTertiary,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.paddingMedium,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PostDetailScreen;
