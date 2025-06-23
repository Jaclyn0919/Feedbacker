import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState('posts');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Header Component
  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>Feedbacker</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Add Recommendation</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Your curated collection of places and services worth remembering
        </Text>
      </View>
    );
  };

  // Search Bar Component
  const SearchBar = () => {
    return (
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
    );
  };

  // Category Tabs Component
  const CategoryTabs = () => {
    const categories = ['All', 'Food', 'Travel', 'Business'];
    
    return (
      <View style={styles.categoryTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.tab,
                  activeCategory === category && styles.tabActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeCategory === category && styles.tabTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Recommendation Card Component
  const RecommendationCard = ({ recommendation }: any) => {
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
            {recommendation.tags.map((tag: string, index: number) => (
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

  // =============================================
  // POSTS PAGE - DEVELOPER B
  // =============================================
  const PostsPage = () => {
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
      <View style={styles.pageContainer}>
        <SearchBar />
        <CategoryTabs />
        
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
      </View>
    );
  };

  // =============================================
  // CIRCLES PAGE - DEVELOPER C
  // =============================================
  const CirclesPage = () => {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Circles</Text>
          <Text style={styles.pageSubtitle}>Social Groups & Communities</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.developerNote}>
            <Text style={styles.noteTitle}>Developer C - Circles Module</Text>
            <Text style={styles.noteText}>
              Features: Create circles, Invite users, Handle invitations, Join requests, 
              Admin functions, Member management, View circle posts
            </Text>
          </View>

          {/* Sample Circle */}
          <View style={styles.circleCard}>
            <View style={styles.circleHeader}>
              <View style={styles.circleAvatar}>
                <Text style={styles.circleAvatarText}>🍕</Text>
              </View>
              <View style={styles.circleInfo}>
                <Text style={styles.circleName}>Food Lovers Sydney</Text>
                <Text style={styles.circleMemberCount}>124 members</Text>
              </View>
            </View>
            <Text style={styles.circleDescription}>
              A community for food enthusiasts in Sydney. Share your favorite restaurants, 
              hidden gems, and food experiences.
            </Text>
            <View style={styles.circleActions}>
              <TouchableOpacity style={styles.circleActionBtn}>
                <Text style={styles.circleActionText}>👥 Join</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleActionBtn}>
                <Text style={styles.circleActionText}>📋 View Posts</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Another Sample Circle */}
          <View style={styles.circleCard}>
            <View style={styles.circleHeader}>
              <View style={styles.circleAvatar}>
                <Text style={styles.circleAvatarText}>✈️</Text>
              </View>
              <View style={styles.circleInfo}>
                <Text style={styles.circleName}>Travel Explorers</Text>
                <Text style={styles.circleMemberCount}>89 members</Text>
              </View>
            </View>
            <Text style={styles.circleDescription}>
              Discover amazing travel destinations and share your adventures with 
              fellow travel enthusiasts.
            </Text>
            <View style={styles.circleActions}>
              <TouchableOpacity style={styles.circleActionBtn}>
                <Text style={styles.circleActionText}>👥 Join</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleActionBtn}>
                <Text style={styles.circleActionText}>📋 View Posts</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  // =============================================
  // PROFILE PAGE - DEVELOPER A
  // =============================================
  const ProfilePage = () => {
    if (!isLoggedIn) {
      return (
        <View style={styles.pageContainer}>
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Profile</Text>
            <Text style={styles.pageSubtitle}>Sign in to access your account</Text>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.developerNote}>
              <Text style={styles.noteTitle}>Developer A - User Module</Text>
              <Text style={styles.noteText}>
                Features: Registration, Login, Profile info, Edit profile, 
                Personal posts, Liked posts, Saved businesses
              </Text>
            </View>

            <View style={styles.authCard}>
              <Text style={styles.authTitle}>Sign In</Text>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Password</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#666666"
                  secureTextEntry
                />
              </View>
              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => setIsLoggedIn(true)}
              >
                <Text style={styles.signInBtnText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.authSwitch}>
                <Text style={styles.authSwitchText}>
                  Don't have an account?{' '}
                  <Text style={styles.authLink}>Sign up</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.pageContainer}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Profile</Text>
          <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.developerNote}>
            <Text style={styles.noteTitle}>Developer A - User Module</Text>
            <Text style={styles.noteText}>
              Logged in state: Profile management and user activity
            </Text>
          </View>

          {/* Profile Info */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>👤</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileBtn}>
              <Text style={styles.editProfileBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Menu */}
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>My Activity</Text>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityItemText}>📝 My Posts</Text>
              <Text style={styles.activityArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityItemText}>❤️ Liked Posts</Text>
              <Text style={styles.activityArrow}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityItem}>
              <Text style={styles.activityItemText}>🔖 Saved Businesses</Text>
              <Text style={styles.activityArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  // Bottom Navigation
  const BottomNavigation = () => {
    const navItems = [
      { key: 'posts', icon: '📍', label: 'Posts' },
      { key: 'circles', icon: '👥', label: 'Circles' },
      { key: 'profile', icon: '👤', label: 'Profile' },
    ];

    return (
      <View style={styles.bottomNav}>
        <View style={styles.navContainer}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => setCurrentPage(item.key)}
            >
              <Text style={styles.navIcon}>{item.icon}</Text>
              <Text
                style={[
                  styles.navLabel,
                  currentPage === item.key && styles.navLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Page Renderer
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'posts':
        return <PostsPage />;
      case 'circles':
        return <CirclesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <PostsPage />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Header />
      <View style={styles.mainContent}>
        {renderCurrentPage()}
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  
  // Header
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
  
  // Main Content
  mainContent: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  
  // Page Header
  pageHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  pageSubtitle: {
    color: '#888888',
    fontSize: 14,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  
  // Search
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
  
  // Category Tabs
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
  
  // Viewing Info
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
  
  // Content
  content: {
    padding: 20,
  },
  
  // Developer Note
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
  
  // Recommendation Card
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
  
  // Circle Card
  circleCard: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  circleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleAvatarText: {
    fontSize: 20,
  },
  circleInfo: {
    flex: 1,
  },
  circleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  circleMemberCount: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  circleDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  circleActions: {
    flexDirection: 'row',
    gap: 12,
  },
  circleActionBtn: {
    backgroundColor: '#222222',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  circleActionText: {
    color: '#ffffff',
    fontSize: 14,
  },
  
  // Auth Card
  authCard: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 6,
  },
  formInput: {
    backgroundColor: '#222222',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  signInBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signInBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  authSwitch: {
    alignItems: 'center',
    marginTop: 16,
  },
  authSwitchText: {
    fontSize: 14,
    color: '#888888',
  },
  authLink: {
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  editProfileBtn: {
    backgroundColor: '#222222',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  editProfileBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Activity Card
  activityCard: {
    backgroundColor: '#111111',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  activityItemText: {
    fontSize: 14,
    color: '#ffffff',
  },
  activityArrow: {
    fontSize: 14,
    color: '#888888',
  },
  
  // Bottom Navigation
  bottomNav: {
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingVertical: 8,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 80,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 12,
    color: '#888888',
  },
  navLabelActive: {
    color: '#ffffff',
  },
});