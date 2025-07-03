// app/(tabs)/Index.tsx

import AddRecommendationModal from '@/components/posts/AddRecommendationModal';
import RecommendationCard from '@/components/posts/RecommendationCard';
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
  const [circleId, setCircleId] = useState('5');
  const [curBtnIndex, setCurBtnIndex] = useState(1);
  const [filterExpanded, setFilterExpanded] = useState(false);

  const typeList = ['All', 'Food', 'Travel', 'Business'];
  const circleList = [
    { value: '1', label: 'Close Friends' },
    { value: '2', label: 'Work Buddies' },
    { value: '3', label: 'Family' },
    { value: '5', label: 'Foodies' }
  ];

  const recommendations = [
    {
      name: 'Porcine',
      type: 'food',
      address: 'Sydney, Australia',
      score: '4',
      priceLevel: '3',
      content: 'Cozy, pork-focused French bistro with old-world charm.',
      tags: ['French', 'Bistro', 'Pork'],
      url: 'https://porcine-restaurant.com',
      merchantId: 101,
      circleId: 5,
      images: [],
      latitude: -33.8688,
      longitude: 151.2093,
      externalId: 'porcine-123',
      createdAt: '2025-06-26T10:30:00Z',
      updatedAt: '2025-06-26T10:45:00Z',
    },
    {
      name: 'Porcine',
      type: 'food',
      address: 'Sydney, Australia',
      score: '4',
      priceLevel: '3',
      content: 'Cozy, pork-focused French bistro with old-world charm.',
      tags: ['French', 'Bistro', 'Pork'],
      url: 'https://porcine-restaurant.com',
      merchantId: 101,
      circleId: 5,
      images: [],
      latitude: -33.8688,
      longitude: 151.2093,
      externalId: 'porcine-123',
      createdAt: '2025-06-26T10:30:00Z',
      updatedAt: '2025-06-26T10:45:00Z',
    },
    {
      name: 'Porcine',
      type: 'food',
      address: 'Sydney, Australia',
      score: '4',
      priceLevel: '3',
      content: 'Cozy, pork-focused French bistro with old-world charm.',
      tags: ['French', 'Bistro', 'Pork'],
      url: 'https://porcine-restaurant.com',
      merchantId: 101,
      circleId: 5,
      images: [],
      latitude: -33.8688,
      longitude: 151.2093,
      externalId: 'porcine-123',
      createdAt: '2025-06-26T10:30:00Z',
      updatedAt: '2025-06-26T10:45:00Z',
    },
  ];

  const onCloseRec = () => setIsOpenRec(false);
  const onOpenRec = () => setIsOpenRec(true);
  const toggleFilter = () => setFilterExpanded(!filterExpanded);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <View style={styles.titleGroup}>
          <Text style={styles.pageTitle}>Feedbacker</Text>
          <Text style={styles.pageSubtitle}>Places & Services</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={onOpenRec}>
          <Text style={styles.createButtonText}>＋ New</Text>
        </TouchableOpacity>
      </View>


      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search recommendations..."
            placeholderTextColor="#888"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={toggleFilter} style={styles.filterToggle}>
          <Text style={styles.filterToggleText}>
            {filterExpanded ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </Text>
          {!filterExpanded && (
            <Text style={styles.filterSummary}>
              {`Category: ${typeList[curBtnIndex]}, Circle: ${
                circleList.find(c => c.value === circleId)?.label || 'All'
              }`}
            </Text>
          )}
        </TouchableOpacity>

        {filterExpanded && (
          <>
            <View style={styles.categoryTabs}>
              {typeList.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tab,
                    index === curBtnIndex && styles.activeTab
                  ]}
                  onPress={() => setCurBtnIndex(index)}
                >
                  <Text style={[
                    styles.tabText,
                    index === curBtnIndex && styles.activeTabText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={circleId}
                onValueChange={value => setCircleId(value)}
                style={styles.picker}
                dropdownIconColor="#fff"
              >
                {circleList.map(circle => (
                  <Picker.Item key={circle.value} label={circle.label} value={circle.value} />
                ))}
              </Picker>
            </View>
          </>
        )}

        {recommendations.map((rec) => (
          <RecommendationCard key={rec.name} recommendation={rec} />
        ))}

        {isOpenRec && (
          <AddRecommendationModal
            isOpenRec={isOpenRec}
            onCloseRec={onCloseRec}
            type="add"
            item={null}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
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
  createButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  createButtonText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
  
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#111',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  searchBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  filterToggle: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  filterToggleText: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  filterSummary: {
    color: '#888',
    marginTop: 4,
    fontSize: 14,
  },
  categoryTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#111',
    marginBottom: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#aaa',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
  },
  pickerWrapper: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: '#111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});

export default Index;
