// Posts.js
import AddRecommendationModal from '@/components/Posts/AddRecommendationModal ';
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

// 推荐卡片组件
const RecommendationCard = ({ recommendation }:any) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardImage}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>📷 {recommendation.title}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Text style={styles.actionBtnText}>{isLiked ? '🤍' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>📤</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{recommendation.category}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{recommendation.title}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>⭐ {recommendation.rating}</Text>
          </View>
        </View>
        <Text style={styles.location}>
          {recommendation.location} • {recommendation.type}
        </Text>
        <Text style={styles.description}>{recommendation.description}</Text>
        <View style={styles.tags}>
          {recommendation.tags.map((tag:any, index:any) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.timeInfo}>🕒 Added {recommendation.timeAgo}</Text>
      </View>
    </View>
  );
};

const Index = () => {
  const [isOpenRec, setIsOpenRec] = useState(false);


  const onCloseRec = () => {
    setIsOpenRec(false)
  }

  const onOpenRec = () => {
    setIsOpenRec(true)
  }

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
      timeAgo: "1 day ago"
    },
    {
      id: 2,
      title: "Thompson Home Cleaning",
      location: "Sydney, Australia",
      type: "Home Cleaning",
      category: "Business",
      rating: 4.9,
      description: "Professional home cleaning service using eco-friendly products.",
      tags: ["Cleaning", "Eco-Friendly"],
      timeAgo: "3 days ago"
    }
  ];

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
            placeholder="Search recommendations..."
            placeholderTextColor="#666666"
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>🔍 Filters</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {['All', 'Food', 'Travel', 'Business'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.tab,
                  category === 'All' && styles.tabActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    category === 'All' && styles.tabTextActive,
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
        <View style={styles.developerNote}>
          <Text style={styles.noteTitle}>Developer B - Posts & Business Module</Text>
          <Text style={styles.noteText}>
            Features: Create post, Google Maps autocomplete, Delete post, View by circle, 
            Post details, Edit post, Comments, Like posts, Search posts, Save businesses
          </Text>
        </View>

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
  card: {
    backgroundColor: '#111111',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardImage: {
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: 192,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#888888',
    fontSize: 16,
  },
  cardActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 16,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  rating: {
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#ffffff',
  },
  location: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    color: '#cccccc',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '500',
  },
  timeInfo: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
});

export default Index;