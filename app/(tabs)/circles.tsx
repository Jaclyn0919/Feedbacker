// Circles.js
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Circles = () => {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
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
});

export default Circles;