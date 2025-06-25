// Posts.js
import AddRecommendationModal from '@/components/Posts/AddRecommendationModal';
import RecommendationCard from '@/components/Posts/RecommendationCard';
import { post } from '@/utils/http';
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
  const [curBtnIndex, setCurBtnIndex] = useState(0);

  const recommendations = [
    {
      id: 1,
      title: "Porcine",
      location: "Sydney, Australia",
      type: "French Bistro",
      category: "Food",
      rating: 4.7,
      description: "Cozy, pork-focused French bistro with old-world charm.",
      tags: ["French", "Bistro", "Pork"],
      timeAgo: "1 day ago",
      userRating: 0,
      userComent:'This place is amazing!',
    }];

  const getList = () => {
    console.log('getList exe')
    post('/api/posts/list').then(res => {
      console.log(res)
    })
  }  

  // getList()

  const onCloseRec = () => {
    setIsOpenRec(false)
  }

  const onOpenRec = () => {
    setIsOpenRec(true)
  }

  const onSearch = () => {
    console.log('Searching...',searchKeyword);
  }

  const onSetBtnIndex = (index: number) => {
    console.log('onSetBtnIndex exe',index)
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
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchKeyword}
            onChangeText={(text) => setSearchKeyword(text)}
            placeholder="Search recommendations..."
            placeholderTextColor="#666666"
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={onSearch}>
          <Text style={styles.filterBtnText}>🔍 Filters</Text>
        </TouchableOpacity>
      </View>

        {/* <View >
          <FilterBtnGroup />
        </View> */}
      
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
        <Text style={styles.viewingText}>📍 Viewing: All Recommendations</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* <View style={styles.developerNote}>
          <Text style={styles.noteTitle}>Developer B - Posts & Business Module</Text>
          <Text style={styles.noteText}>
            Features: Create post, Google Maps autocomplete, Delete post, View by circle, 
            Post details, Edit post, Comments, Like posts, Search posts, Save businesses
          </Text>
        </View> */}
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </ScrollView>

      {isOpenRec  && <AddRecommendationModal isOpenRec={isOpenRec} onCloseRec={onCloseRec} />}
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
    gap: 12,
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#222222',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 14,
  },
  filterBtn: {
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  filterBtnText: {
    color: '#ffffff',
    fontSize: 14,
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