// Profile.js
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Profile</Text>
        {isLoggedIn ? (
          <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.pageSubtitle}>Sign in to access your account</Text>
        )}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.developerNote}>
          <Text style={styles.noteTitle}>Developer A - User Module</Text>
          <Text style={styles.noteText}>
            Features: Registration, Login, Profile info, Edit profile, 
            Personal posts, Liked posts, Saved businesses
          </Text>
        </View>

        {!isLoggedIn ? (
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
        ) : (
          <>
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
          </>
        )}
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
  signOutText: {
    color: '#ffffff',
    fontSize: 14,
    textDecorationLine: 'underline',
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
});

export default Profile;