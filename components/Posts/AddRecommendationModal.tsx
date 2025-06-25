import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import TagList from './components/TagComponent';

type Props = {
  isOpenRec: boolean,
  onCloseRec: () => void
};

type formDataType = {
  name: string;
  type: string;
  category: string;
  location: string;
  rating: string;
  priceLevel: string;
  description: string;
  tags: string;
  url: string;
  image?: any;
};

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
  { label: '$Budget', value: '1' },
  { label: '$$Moderate', value: '2' },
  { label: '$$$Expensive', value: '3' },
  { label: '$$$$Very Expensive', value: '4' },
];

const AddRecommendationModal = ({ isOpenRec, onCloseRec }:Props) => {
  const [formData, setFormData] = useState<formDataType>({
    name: '',
    type: 'food',
    category: '',
    location: '',
    rating: '4',
    priceLevel: '2',
    description: '',
    tags: '',
    url: '',
    image: '',
  });

  const [selectedTags, setSelectedTags] =  useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickedImage, setPickedImage] = useState<any>(null);

  // 处理表单输入变化
  const handleInputChange = (field :any, value :any) => {
    setFormData({ ...formData, [field]: value });
  };

  // 处理类型选择
  const handleTypeSelect = (value :any) => {
    setFormData({ ...formData, type: value });
  };

  // 处理评分选择
  const handleRatingChange = (value:any) => {
    setFormData({ ...formData, rating: value });
  }

  // 处理价格水平选择
  const handlePriceChange =  (value : any) => {
    setFormData({ ...formData, priceLevel: value });
  }

  // 处理图片上传
  const handleImageUpload = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    console.log('result is',result)
    if (!result.canceled) {
      setPickedImage(result.assets[0] || '')
      setFormData({ ...formData, image: result.assets[0] || '' });
    }
  };

  // 处理标签添加
  const handleAddTag = () => {
    if (selectedTags.includes(formData.tags)) {
      Alert.alert('Error', 'Tag already exists');
      return
    }
    if (formData.tags.trim() !== '') {
      // 在实际应用中，这里会将标签添加到数组中
      setFormData({ ...formData, tags: '' });
      setSelectedTags([...selectedTags, formData.tags])
    }
  };
  // 处理标签删除
  const handleRemoveTag = (tagToRemove :any) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // 验证表单
  const validateForm = () => {
    if (!formData.name || !formData.category || !formData.location || !formData.description) {
      Alert.alert('Form Error', 'Please fill in all  fields');
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

  // 请求媒体库权限
useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      // Alert.alert('需要媒体库权限才能选择图片');
      Alert.alert('Media library permission is required to select images');
    }
  })();
}, []);


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpenRec}
      onRequestClose={onCloseRec}
      hardwareAccelerated={true}
    >
      <Pressable onPress={onCloseRec}>
        <View style={styles.modalOverlay} />
      </Pressable>
      
      <View style={styles.modalContainer}>
        <Pressable onPress={(e) => e.stopPropagation()}>
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
              <Text>X</Text>
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
                      
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                  
                  {/* 类型和分类 */}
                  <View style={styles.gridTwoColumns}>
                    {/* 类型选择 */}
                    <View style={[styles.formGroup, styles.halfWidth]}>
                      <Text style={styles.label}>Type *</Text>
                      <Picker
                        selectedValue={formData.type || 'food'}
                        style={styles.picker}
                        onValueChange={(itemValue) => handleTypeSelect(itemValue)}
                      >
                        {recommendationTypes.map(type => (
                          <Picker.Item 
                            label={type.label} 
                            value={type.value} 
                            key={type.value} 
                          />
                        ))}
                      </Picker>
                    </View>
                    
                    {/* 分类输入 */}
                    <View style={[styles.formGroup, styles.halfWidth]}>
                      <Text style={styles.label}>Category *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., Italian, Museum"
                        value={formData.category}
                        onChangeText={(text) => handleInputChange('category', text)}
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
                      multiline={true} // 启用多行输入
                      numberOfLines={4} // 默认显示的行数
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                  
                  {/* 评分和价格水平 */}
                  <View style={styles.gridTwoColumns}>
                    {/* 评分选择 */}
                    <View style={[styles.formGroup, styles.halfWidth]}>
                      <Text style={styles.label}>Rating</Text>
                      <Picker
                        selectedValue={formData.rating}
                        onValueChange={handleRatingChange}
                        style={styles.picker}
                      >
                        {ratingOptions.map(option => (
                          <Picker.Item 
                            key={option.value} 
                            label={option.label} 
                            value={option.value} 
                          />
                        ))}
                      </Picker>
                    </View>
                    
                    {/* 价格水平选择 */}
                    <View style={[styles.formGroup, styles.halfWidth]}>
                      <Text style={styles.label}>Price Level</Text>
                      <Picker
                        selectedValue={formData.priceLevel}
                        onValueChange={handlePriceChange}
                        style={styles.picker}
                      >
                        {priceLevels.map(option => (
                          <Picker.Item 
                            key={option.value} 
                            label={option.label} 
                            value={option.value} 
                          />
                        ))}
                      </Picker>
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
                        {/* <UploadOutline fontSize={20} style={styles.uploadIcon} /> */}
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
                      {/* 标签展示 */}
                    <View style={styles.formGroup}>
                        { selectedTags.length > 0 && <TagList selectedTags={selectedTags} handleRemoveTag={handleRemoveTag}  /> }
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
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.saveButtonText}>Save Recommendation</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  modalContent: {
    position: 'relative',
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 3,
    padding: 8,
    borderRadius: 6,
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
    height: 50,
    marginTop:10,
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
  halfWidth:{
    width:'49%'
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 15,
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
    height: 40,
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