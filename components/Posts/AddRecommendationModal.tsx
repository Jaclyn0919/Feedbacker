import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useState } from 'react';
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

// 明确表单数据类型定义
type formDataType = {
  name: string;
  type: string;
  location: string;
  score: string;
  priceLevel: string;
  content: string;
  tags: string;
  url: string;
};

// 明确组件 props 类型
type Props = {
  isOpenRec: boolean;
  onCloseRec: () => void;
  type: 'add' | 'edit';
  item?: any; // 编辑时传入的项目数据
  circleList?:any
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

const AddRecommendationModal = ({ isOpenRec, onCloseRec, type, item,circleList }: Props) => {
  const [formData, setFormData] = useState<formDataType>({
    name: '',
    type: 'food',
    location: '',
    score: '4',
    priceLevel: '2',
    content: '',
    tags: '',
    url: '',
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [merchantId, setMerchantId] = useState<any>(null);
  const [merchantList, setMerchantList] = useState<any>([]);
  const [circleId, setCircleId] = useState<any>(null);
  const [pickedImages, setPickedImages] = useState<any>([]);

  // 处理表单初始化 - 根据type和item填充数据
  useEffect(() => {
    if (type === 'edit' && item) {
      console.log('item is',item,'is edit ')
      // 编辑模式下填充表单数据
      setFormData({
        name: item.name || '',
        type: item.type || 'food',
        location: item.address || '',
        score: item.score?.toString() || '4',
        priceLevel: item.priceLevel?.toString() || '2',
        content: item.content || '',
        tags: item.tags?.join(',') || '',
        url: item.url || '',
      });
      
      // 设置商家ID和圈子ID
      setMerchantId(item.merchantId);
      setCircleId(item.circleId);
      
      // 设置标签
      if (item.tags && Array.isArray(item.tags)) {
        setSelectedTags(item.tags);
      }
      
      // 设置图片（如果有）
      if (item.images && Array.isArray(item.images)) {
        setPickedImages(item.images.map(img => ({ uri: img })));
      }
    } else if (type === 'add') {
      // 新增模式下重置表单
      setFormData({
        name: '',
        type: 'food',
        location: '',
        score: '4',
        priceLevel: '2',
        content: '',
        tags: '',
        url: '',
      });
      setSelectedTags([]);
      setPickedImages([]);
      setMerchantId(null);
      setCircleId(null);
    }
  }, [type, item]);

  let merchantItem: any = null;
  const getMechantsList = () => {
    console.log('getMechantsList exe', formData.name);
    // get('/api/merchants').then(res => {
    //   setMerchantList(res.data)
    // })
  };


  // 处理表单输入变化
  const handleInputChange = (field: keyof formDataType, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // 处理类型选择
  const handleSelectMechant = (value: any) => {
    merchantItem = getMechantById(value);
    setFormData({ ...formData, location: merchantItem?.address });
    setMerchantId(value);
  };

  const getMechantById = (id: any = null) => {
    if (id !== null) {
      return merchantList.find(v => v.id === id);
    } else {
      return merchantList.find(v => v.id === merchantId);
    }
  };

  const handleSelectCircle = (value: any) => {
    setCircleId(value);
  };

  const getCircleById = () => {
    return circleList.find(v => v.id === circleId);
  };

  const handleTypeSelect = (value: any) => {
    setFormData({ ...formData, type: value });
  };

  // 处理评分选择
  const handleRatingChange = (value: any) => {
    setFormData({ ...formData, score: value });
  };

  // 处理价格水平选择
  const handlePriceChange = (value: any) => {
    setFormData({ ...formData, priceLevel: value });
  };

  // 处理图片上传
  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true, // 启用多选
      quality: 0.8,
    });
    console.log('result is', result);
    if (!result.canceled) {
      // 将新选择的图片添加到现有图片数组中
      setPickedImages(prev => [...prev, ...result.assets.map(asset => ({ uri: asset.uri }))]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPickedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 处理标签添加
  const handleAddTag = () => {
    if (selectedTags.includes(formData.tags)) {
      Alert.alert('Error', 'Tag already exists');
      return;
    }
    if (formData.tags.trim() !== '') {
      // 在实际应用中，这里会将标签添加到数组中
      setFormData({ ...formData, tags: '' });
      setSelectedTags([...selectedTags, formData.tags]);
    }
  };

  // 处理标签删除
  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // 验证表单
  const validateForm = () => {
    merchantItem = getMechantById();
    if (!Object.values(merchantItem).length) {
      Alert.alert('Form Error', 'Please choose a merchant');
      return false;
    }
    if (!formData.name || !formData.location || !formData.content) {
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
      // 构建提交参数
      const params = {
        name: merchantItem?.name,
        address: merchantItem?.address,
        latitude: merchantItem?.latitude,
        longitude: merchantItem?.longitude,
        externalId: merchantItem?.externalId,
        circleId: getCircleById()?.id,
        content: formData.content,
        score: formData.score,
        tags: selectedTags,
        type: formData.type,
        priceLevel: formData.priceLevel,
        url: formData.url,
        // 编辑模式下需要ID
        id: type === 'edit' ? item?.id : undefined,
      };
      
      console.log('params is', params);
      
      // 这里应该调用API进行保存
      // 新增或编辑的API调用可能不同，需要根据type处理
      if (type === 'add') {
        // 调用新增API
        // await addRecommendation(params);
      } else if (type === 'edit') {
        // 调用编辑API
        // await updateRecommendation(params);
      }
      
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
        Alert.alert('Media library permission is required to select images');
      }
    })();
  }, []);

  // 优化：使用useCallback缓存函数，避免重复创建
  const memoizedGetMechantById = useCallback((id: any = null) => {
    if (id !== null) {
      return merchantList.find(v => v.id === id);
    } else {
      return merchantList.find(v => v.id === merchantId);
    }
  }, [merchantList, merchantId]);

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
            {/* 头部区域 - 显示新增或编辑标题 */}
            <View style={styles.header}>
              <Text style={styles.title}>{type === 'add' ? 'Add New Recommendation' : 'Edit Recommendation'}</Text>
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
                    <Text style={styles.label}>Merchant Name *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Merchant Name"
                      value={formData.name}
                      onChangeText={(text) => handleInputChange('name', text)}
                      onBlur={() => getMechantsList()}
                      placeholderTextColor="#6B7280"
                    />
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Choose Merchant*</Text>
                      <Picker
                        selectedValue={merchantId}
                        style={styles.picker}
                        onValueChange={(itemValue) => handleSelectMechant(itemValue)}
                    >
                      <Picker.Item 
                            label='Enter the merchant name to select the merchant'
                          />
                        {merchantList.map(type => (
                          <Picker.Item 
                            label={type.label} 
                            value={type.value} 
                            key={type.value} 
                          />
                        ))}
                      </Picker>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Circle*</Text>
                      <Picker
                        selectedValue={circleId}
                        style={styles.picker}
                        onValueChange={(itemValue) => handleSelectCircle(itemValue)}
                    >
                       <Picker.Item 
                            label='Select Circle'
                          />
                        {circleList.map(type => (
                          <Picker.Item 
                            label={type.label} 
                            value={type.value} 
                            key={type.value} 
                          />
                        ))}
                      </Picker>
                  </View>
                  
                  {/* 类型选择 */}
                  <View style={[styles.formGroup,{width: '100%'}]}>
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
                  
                  {/* 位置输入 */}
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Location *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Auto fill,do not edit"
                      value={formData.location}
                      onChangeText={(text) => handleInputChange('location', text)}
                      multiline={true} // 启用多行输入
                      disabled={true}
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
                        selectedValue={formData.score}
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
                      style={[styles.textArea, styles.input,{height:60}]}
                      placeholder="Share your thoughts..."
                      value={formData.content}
                      onChangeText={(text) => handleInputChange('content', text)}
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
                          <Text style={styles.uploadText}>Upload Images</Text>
                        </TouchableOpacity>
                        
                        {/* 多张图片预览区域 */}
                        {pickedImages.length > 0 && (
                          <View style={styles.imagesPreviewContainer}>
                            {pickedImages.map((image, index) => (
                              <View key={index} style={styles.imagePreviewWrapper}>
                                <Image 
                                  source={image} 
                                  style={styles.previewImage} 
                                  resizeMode="cover"
                                />
                                <TouchableOpacity
                                  style={styles.removeImageButton}
                                  onPress={() => handleRemoveImage(index)}
                                >
                                  <Text style={styles.removeImageText}>X</Text>
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
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
                        <Text style={styles.saveButtonText}>{type === 'add' ? 'Save Recommendation' : 'Update Recommendation'}</Text>
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
    height: 40,
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
    paddingHorizontal: 8,
  },
  imageUploadContainer: {
    width: '100%',
    marginVertical: 10,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadText: {
    color: '#333',
    fontWeight: 'bold',
  },
  imagesPreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imagePreviewWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  removeImageText: {
    color: 'white',
    fontWeight: 'bold',
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