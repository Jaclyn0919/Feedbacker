// Posts.js
import AddRecommendationModal from '@/components/Posts/AddRecommendationModal';
import RecommendationCard from '@/components/Posts/RecommendationCard';
import { get, post } from '@/utils/http';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Index = () => {
  const [isOpenRec, setIsOpenRec] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [circleId, setCircleId] = useState('');
  const [circleList, setCircleList] = useState<any>([]);
  const [curBtnIndex, setCurBtnIndex] = useState(0);

  const recommendations = [
    {
      name: "Porcine",
      type: "food", // 与组件中的类型定义匹配
      address: "Sydney, Australia", // 使用address字段而非location
      score: "4", // 评分应与表单中的字符串类型一致
      priceLevel: "3", // 价格水平（1-4）
      content: "Cozy, pork-focused French bistro with old-world charm.", // 描述内容
      tags: ["French", "Bistro", "Pork"], // 标签数组
      url: "https://porcine-restaurant.com", // 网站URL
      merchantId: 101, // 商家ID
      circleId: 5, // 圈子ID
      images: [
        "https://example.com/porcine1.jpg",
        "https://example.com/porcine2.jpg"
      ], // 图片URL数组
      latitude: -33.8688, // 纬度
      longitude: 151.2093, // 经度
      externalId: "porcine-123", // 外部ID
      createdAt: "2025-06-26T10:30:00Z", // 创建时间
      updatedAt: "2025-06-26T10:45:00Z", // 更新时间
    }];

  const getList = () => {
    post('/api/posts/list').then(res => {
      console.log(res)
    })
  }  
  const getCircleList = () => {
    get('/api/circles').then(res => {
      setCircleList(res.data);
    });
  };
  // getCircleList()
  // getList()

  const onCloseRec = () => {
    setIsOpenRec(false)
  }

  const onOpenRec = () => {
    setIsOpenRec(true)
  }

  const onSearch = () => {
  }

  const onSetBtnIndex = (index: number) => {
    setCurBtnIndex(index)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>Feedbacker</Text>
          <TouchableOpacity style={styles.addBtn} onPress={onOpenRec}>
            <Text style={styles.addBtnText}>+ Add Recommendation</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Your curated collection of places and services worth remembering
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
         <View style={styles.pickerContainer}>
          <Picker
              selectedValue={circleId}
              style={styles.picker}
              onValueChange={(itemValue) => setCircleId(itemValue)}
          >
            <Picker.Item 
              label='Select circle to filter merchants'
                />
              {/* {merchantList.map(type => (
                <Picker.Item 
                  label={type.label} 
                  value={type.value} 
                  key={type.value} 
                />
              ))} */}
            </Picker>
         </View>
          <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchKeyword}
            onChangeText={(text) => setSearchKeyword(text)}
            placeholder="Search recommendations..."
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.filterBtn} onPress={onSearch}>
          <Text style={styles.filterBtnText}>🔍 Serach</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {['All', 'Food', 'Travel', 'Business'].map((category,index) => (
              <TouchableOpacity
                key={category}
                onPress={() => onSetBtnIndex(index)}
                style={[
                  styles.tab,
                  index === curBtnIndex && styles.tabActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    index === curBtnIndex && styles.tabTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      
      <View style={styles.viewingInfo}>
        <Text style={styles.viewingText}>📍 Viewing: All Merchant Recommendations</Text>
      </View>

      <ScrollView style={styles.content}>
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.name} recommendation={rec} />
        ))}
      </ScrollView>

      {isOpenRec  && <AddRecommendationModal isOpenRec={isOpenRec} onCloseRec={onCloseRec} type='add' item={null} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#111111',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems:'center',
    gap: 12,
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  searchInputContainer: {
    flex: 1,
    maxWidth:'50%'
  },
  searchInput: {
    backgroundColor: '#222222',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 14,
    height:50
  },
  pickerContainer: {
    flex: 1, 
    maxWidth: '50%',
    marginVertical: 10, 
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
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#333333',
    borderRadius: 8,
    justifyContent: 'center',
    width:'100%'
  },
  filterBtnText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign:'center'
  },
  categoryTabs: {
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingVertical: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888888',
  },
  tabTextActive: {
    color: '#000000',
  },
  viewingInfo: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  viewingText: {
    fontSize: 14,
    color: '#888888',
  },
  content: {
    padding: 20,
  },
  developerNote: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  noteTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  noteText: {
    color: '#888888',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Index;