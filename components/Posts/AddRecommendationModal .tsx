import {
  CloseOutline,
  DownlandOutline, // 下拉箭头
  UploadOutline, // 上传图标
} from 'antd-mobile-icons'; // 导入需要的图标组件
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// 推荐类型数据
const recommendationTypes = [
  { label: 'Food', value: 'food' },
  { label: 'Travel', value: 'travel' },
  { label: 'Business', value: 'business' },
];

// 评分数据
const ratingOptions = [
  { label: '1 Star', value: '1' },
  { label: '2 Stars', value: '2' },
  { label: '3 Stars', value: '3' },
  { label: '4 Stars', value: '4' },
  { label: '5 Stars', value: '5' },
];

// 价格水平数据
const priceLevels = [
  { label: 'Budget', value: '1' },
  { label: '$$Moderate', value: '2' },
  { label: '$$$Expensive', value: '3' },
  { label: '$$$$Very Expensive', value: '4' },
];

const AddRecommendationModal = ({ isOpenRec, onCloseRec }:any) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'food',
    category: '',
    location: '',
    rating: '4',
    priceLevel: '2',
    description: '',
    tags: '',
    url: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  // 处理表单输入变化
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 处理类型选择
  const handleTypeSelect = (value) => {
    setFormData({ ...formData, type: value });
    setShowTypeDropdown(false);
  };

  // 处理评分选择
  const handleRatingSelect = (value) => {
    setFormData({ ...formData, rating: value });
    setShowRatingDropdown(false);
  };

  // 处理价格水平选择
  const handlePriceSelect = (value) => {
    setFormData({ ...formData, priceLevel: value });
    setShowPriceDropdown(false);
  };

  // 处理图片上传
  const handleImageUpload = async () => {
    // 在实际应用中，这里会调用相机或相册API
    // 简化示例，这里仅模拟图片选择
    setPickedImage({ uri: 'https://picsum.photos/400/300?random=' + Date.now() });
    setFormData({ ...formData, image: { uri: 'https://picsum.photos/400/300?random=' + Date.now() } });
  };

  // 处理标签添加
  const handleAddTag = () => {
    if (formData.tags.trim() !== '') {
      // 在实际应用中，这里会将标签添加到数组中
      Alert.alert('Tag Added', formData.tags);
      setFormData({ ...formData, tags: '' });
    }
  };

  // 验证表单
  const validateForm = () => {
    if (!formData.name || !formData.category || !formData.location || !formData.description) {
      Alert.alert('Form Error', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  // 处理表单提交
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // 在实际应用中，这里会将数据发送到服务器
      await new Promise(resolve => setTimeout(resolve, 1500));
      (formData);
      onCloseRec();
    } catch (error) {
      console.error('Error saving recommendation:', error);
      Alert.alert('Error', 'Failed to save recommendation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpenRec}
      onRequestClose={onCloseRec}
      hardwareAccelerated={true}
    >
      <TouchableWithoutFeedback onPress={onCloseRec}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContent}>
            {/* 头部区域 */}
            <View style={styles.header}>
              <Text style={styles.title}>Add New Recommendation</Text>
              <Text style={styles.subtitle}>Share places, experiences, and business services you recommend.</Text>
            </View>
            
            {/* 关闭按钮 */}
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onCloseRec}
            >
              <CloseOutline fontSize={24} color={isOpenRec ? '#5E6AD2' : '#6B7280'} />
            </TouchableOpacity>
            
            {/* 表单内容 */}
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={styles.keyboardAvoiding}
              >
                <View style={styles.formContainer}>
                  {/* 名称输入 */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Name *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter place name"
                      value={formData.name}
                      onChangeText={(text) => handleInputChange('name', text)}
                      required
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                  
                  {/* 类型和分类 */}
                  <View style={styles.gridTwoColumns}>
                    {/* 类型选择 */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Type *</Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowTypeDropdown(!showTypeDropdown)}
                      >
                        <View style={styles.dropdownContent}>
                          <Text style={styles.dropdownText}>{recommendationTypes.find(t => t.value === formData.type)?.label || 'Food'}</Text>
                          <DownlandOutline fontSize={20} color="#9CA3AF" />
                        </View>
                        
                        {showTypeDropdown && (
                          <View style={styles.dropdownMenu}>
                            {recommendationTypes.map(type => (
                              <TouchableOpacity
                                key={type.value}
                                style={[styles.dropdownMenuItem, { borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' }]}
                                onPress={() => handleTypeSelect(type.value)}
                              >
                                <Text style={styles.dropdownMenuItemText}>{type.label}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    
                    {/* 分类输入 */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Category *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., Italian, Museum"
                        value={formData.category}
                        onChangeText={(text) => handleInputChange('category', text)}
                        required
                        placeholderTextColor="#6B7280"
                      />
                    </View>
                  </View>
                  
                  {/* 位置输入 */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Location *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="City, Country"
                      value={formData.location}
                      onChangeText={(text) => handleInputChange('location', text)}
                      required
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                  
                  {/* 评分和价格水平 */}
                  <View style={styles.gridTwoColumns}>
                    {/* 评分选择 */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Rating</Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowRatingDropdown(!showRatingDropdown)}
                      >
                        <View style={styles.dropdownContent}>
                          <Text style={styles.dropdownText}>{ratingOptions.find(r => r.value === formData.rating)?.label || '4 Stars'}</Text>
                          <DownlandOutline fontSize={20} color="#9CA3AF" />
                        </View>
                        
                        {showRatingDropdown && (
                          <View style={styles.dropdownMenu}>
                            {ratingOptions.map(rating => (
                              <TouchableOpacity
                                key={rating.value}
                                style={[styles.dropdownMenuItem, { borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' }]}
                                onPress={() => handleRatingSelect(rating.value)}
                              >
                                <Text style={styles.dropdownMenuItemText}>{rating.label}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                    
                    {/* 价格水平选择 */}
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Price Level</Text>
                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowPriceDropdown(!showPriceDropdown)}
                      >
                        <View style={styles.dropdownContent}>
                          <Text style={styles.dropdownText}>
                            {priceLevels.find(p => p.value === formData.priceLevel)?.label || '$$Moderate'}
                          </Text>
                          <DownlandOutline fontSize={20} color="#9CA3AF" />
                        </View>
                        
                        {showPriceDropdown && (
                          <View style={styles.dropdownMenu}>
                            {priceLevels.map(price => (
                              <TouchableOpacity
                                key={price.value}
                                style={[styles.dropdownMenuItem, { borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB' }]}
                                onPress={() => handlePriceSelect(price.value)}
                              >
                                <Text style={styles.dropdownMenuItemText}>{price.label}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* 描述输入 */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Description *</Text>
                    <TextInput
                      style={[styles.textArea, styles.input]}
                      placeholder="Share your thoughts..."
                      value={formData.description}
                      onChangeText={(text) => handleInputChange('description', text)}
                      multiline
                      numberOfLines={4}
                      required
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                  
                  {/* 图片上传 */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Image</Text>
                    <View style={styles.imageUploadContainer}>
                      <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handleImageUpload}
                      >
                        <UploadOutline fontSize={20} style={styles.uploadIcon} />
                        <Text style={styles.uploadText}>Upload Image</Text>
                      </TouchableOpacity>
                      {pickedImage && (
                        <Image 
                          source={pickedImage} 
                          style={styles.previewImage} 
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  </View>
                  
                  {/* 标签输入 */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Tags</Text>
                    <View style={styles.tagsContainer}>
                      <TextInput
                        style={styles.tagsInput}
                        placeholder="Add tags..."
                        value={formData.tags}
                        onChangeText={(text) => handleInputChange('tags', text)}
                        placeholderTextColor="#6B7280"
                      />
                      <TouchableOpacity
                        style={styles.addTagButton}
                        onPress={handleAddTag}
                      >
                        <Text style={styles.addTagText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  {/* 网站URL */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Website URL</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="https://..."
                      value={formData.url}
                      onChangeText={(text) => handleInputChange('url', text)}
                      placeholderTextColor="#6B7280"
                      keyboardType="web-search"
                    />
                  </View>
                  
                  {/* 按钮区域 */}
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={onCloseRec}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.saveButton, { backgroundColor: isSubmitting ? '#93C5FD' : '#5E6AD2' }]}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator fontSize="small" color="white" />
                      ) : (
                        <Text style={styles.saveButtonText}>Save Recommendation</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  modalContent: {
    position: 'relative',
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    animation: 'modalAnimation',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5E6AD2',
    opacity: 0.7,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  scrollView: {
    height: height * 0.7,
    maxHeight: height * 0.8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    gap: 16,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  textArea: {
    height: 80,
    paddingVertical: 10,
  },
  gridTwoColumns: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1F2937',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 100,
  },
  dropdownMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownMenuItemText: {
    fontSize: 14,
    color: '#1F2937',
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  uploadIcon: {
    marginRight: 4,
  },
  uploadText: {
    fontSize: 14,
    color: '#1F2937',
  },
  previewImage: {
    width: 60,
    height: 40,
    borderRadius: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  tagsInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  addTagButton: {
    backgroundColor: '#5E6AD2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 8,
  },
  cancelButton: {
    flex: 1,
    maxWidth: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    maxWidth: 180,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#5E6AD2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default AddRecommendationModal;