import EditProfileModal from '@/components/profile/EditProfileModal';
import ErrorModal from '@/components/profile/ErrorModal';
import RegisterModal from '@/components/profile/RegisterModal';
import SettingsModal from '@/components/profile/SettingsModal';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const options = {
  headerShown: false,
};

const { width } = Dimensions.get('window');

const TABS = ['My Posts', 'Want to Try', 'Liked'];

const dummyPosts = [
  { id: 1, title: 'Cafe 1', image: 'https://via.placeholder.com/150', category: 'My Posts' },
  { id: 2, title: 'Sushi Place', image: 'https://via.placeholder.com/150', category: 'Liked' },
  { id: 3, title: 'Burger Spot', image: 'https://via.placeholder.com/150', category: 'Want to Try' },
  { id: 4, title: 'Pizza Time', image: 'https://via.placeholder.com/150', category: 'My Posts' },
  { id: 5, title: 'Ice Cream', image: 'https://via.placeholder.com/150', category: 'Liked' },
];

// Load local background image
const backgroundImage = require('@/assets/images/profile-bg.jpg');

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('My Posts');
  const [userName, setUserName] = useState('Demo User');

  const filteredPosts = dummyPosts.filter(p => p.category === selectedTab);

  const handleLogin = () => {
    if (email === 'demo' && password === '123456') {
      setIsLoggedIn(true);
    } else {
      setErrorVisible(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign In</Text>
          <TextInput placeholder="Email" placeholderTextColor="#888" style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder="Password" placeholderTextColor="#888" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>Don’t have an account? <Text style={styles.signUp} onPress={() => setRegisterVisible(true)}>Sign up</Text></Text>
        </View>
        <ErrorModal visible={errorVisible} onClose={() => setErrorVisible(false)} message="Invalid username or password." />
        <RegisterModal visible={registerVisible} onClose={() => setRegisterVisible(false)} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Header with background image */}
      <ImageBackground source={backgroundImage} style={styles.bgImage} resizeMode="cover">
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{userName}</Text>
            <TouchableOpacity onPress={() => setEditVisible(true)} style={styles.blueCircleButton}>
              <Feather name="edit-2" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.email}>demo@example.com</Text>
        </View>
      </ImageBackground>

      <View style={styles.divider} />

      {/* Tab buttons */}
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab} style={[styles.tabButton, selectedTab === tab && styles.activeTab]} onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Post cards */}
      <View style={styles.postGrid}>
        {filteredPosts.map(post => (
          <View key={post.id} style={styles.cardPost}>
            <Image source={{ uri: post.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{post.title}</Text>
          </View>
        ))}
      </View>

      <EditProfileModal visible={editVisible} onClose={() => setEditVisible(false)} userName={userName} setUserName={setUserName} />
      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} onLogout={() => { setIsLoggedIn(false); setSettingsVisible(false); }} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#1c1c1e',
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 16,
  },
  signUp: {
    color: '#30a9ff',
    fontWeight: '500',
  },
  topBar: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  bgImage: {
    width: '100%',
    height: 240,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    backgroundColor: 'transparent',
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#30a9ff',
    overflow: 'hidden',
    marginBottom: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
  },
  blueCircleButton: {
    backgroundColor: '#30a9ff',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#1a1a1a',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  postGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  cardPost: {
    width: (width - 36) / 2,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    padding: 8,
  },
});