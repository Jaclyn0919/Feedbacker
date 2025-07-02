import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Profile = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCode, setRegCode] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [activeTab, setActiveTab] = useState<'my' | 'try' | 'liked'>('my');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [nickname, setNickname] = useState('Pelin');
  const [bio, setBio] = useState('No Content yet');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (email === 'test@demo.com' && password === '123456') {
        setIsLoggedIn(true);
      } else {
        Alert.alert('Login failed', 'Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = () => {
    if (!regName || !regEmail || !regPassword || !regCode) {
      return Alert.alert('Please fill all fields');
    }
    setRegLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setShowRegister(false);
      setRegLoading(false);
    }, 1000);
  };
const [codeSending, setCodeSending] = useState(false);

const handleSendCode = async () => {
  if (!regEmail.includes('@')) {
    Alert.alert('Invalid email');
    return;
  }

  try {
    setCodeSending(true);
    // TODO: 替换为你真实后端接口
    await fetch('https://your-api/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail })
    });

    Alert.alert('Verification code sent');
  } catch (err) {
    Alert.alert('Failed to send code');
  } finally {
    setCodeSending(false);
  }
};

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>Sign In</Text>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#666" secureTextEntry value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
          </TouchableOpacity>
          <Text style={styles.authSwitchText}>
            Don’t have an account?{' '}
            <Text style={styles.authLink} onPress={() => setShowRegister(true)}>Sign up</Text>
          </Text>
        </View>

        {/* 注册弹窗 */}
        <Modal visible={showRegister} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.authTitle}>Register</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#888"
                  value={regName}
                  onChangeText={setRegName}
                />

                {/* 邮箱输入框 + 发送验证码按钮 */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    value={regEmail}
                    onChangeText={setRegEmail}
                  />
                  <TouchableOpacity
                    onPress={handleSendCode}
                    disabled={codeSending || !regEmail.includes('@')}
                    style={{
                      backgroundColor: codeSending ? '#888' : '#00BFA6',
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {codeSending ? 'Sending...' : 'Send'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Verification Code"
                  placeholderTextColor="#888"
                  value={regCode}
                  onChangeText={setRegCode}
                  keyboardType="numeric"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={regPassword}
                  onChangeText={setRegPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={regLoading}>
                  <Text style={styles.buttonText}>
                    {regLoading ? 'Registering...' : 'Register'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowRegister(false)}>
                  <Text style={styles.authLink}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setShowAvatarModal(true)}>
          <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.bio}>{bio}</Text>
          <TouchableOpacity onPress={() => router.push('/circles')}>
            <Text style={styles.circlesLabel}>Circles</Text>
            <Text style={styles.circlesCount}>7</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => setShowEditModal(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {['my', 'try', 'liked'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as 'my' | 'try' | 'liked')}
            style={styles.tab}
          >
            <Text style={styles.tabText}>
              {tab === 'my' ? 'Myposts' : tab === 'try' ? 'WantToTry' : 'Liked'}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.postArea}>
        <View style={styles.postGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.postCard}>
              <View style={styles.postImage} />
              <Text style={styles.postTitle}>Post Title</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={() => setShowAvatarModal(true)}>
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatarLarge} />
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="Nickname" placeholderTextColor="#888" value={nickname} onChangeText={setNickname} />
            <TextInput style={styles.input} placeholder="Bio" placeholderTextColor="#888" value={bio} onChangeText={setBio} />
            <TouchableOpacity style={styles.button} onPress={() => setShowEditModal(false)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={styles.authLink}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Avatar Modal */}
      <Modal visible={showAvatarModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.avatarLarge} />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Change Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAvatarModal(false)}>
              <Text style={styles.authLink}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  authCard: { backgroundColor: '#111', borderRadius: 10, padding: 20, margin: 16 },
  authTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 12, textAlign: 'center' },
  input: { backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  authLink: { color: '#00BFA6', fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  authSwitchText: { color: '#ccc', textAlign: 'center', marginTop: 10 },

  headerRow: { flexDirection: 'row', padding: 16 },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 16 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  userInfo: { justifyContent: 'center' },
  username: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  email: { color: '#aaa', fontSize: 14 },
  circlesLabel: { color: '#fff', marginTop: 6 },
  circlesCount: { color: '#888' },
  bio: {
  color: '#bbb',
  fontSize: 13,
  marginTop: 4,
},


  topButtons: { marginLeft: 'auto', justifyContent: 'space-between', alignItems: 'flex-end' },
  settingsIcon: { fontSize: 22, color: '#fff', marginBottom: 8 },
  editButton: { borderColor: '#fff', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  editButtonText: { color: '#fff', fontSize: 12 },

  tabContainer: { flexDirection: 'row', backgroundColor: '#6E6E6E', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  tabText: { color: '#fff' },
  tabIndicator: { height: 2, backgroundColor: '#00BFA6', width: 40, marginTop: 4, borderRadius: 1 },

  postArea: { flex: 1, backgroundColor: '#000', padding: 16 },
  postGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  postCard: { width: '48%', marginBottom: 16, backgroundColor: '#222', borderRadius: 10 },
  postImage: { height: 120, backgroundColor: '#444', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  postTitle: { color: '#fff', textAlign: 'center', padding: 8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#111', padding: 20, borderRadius: 12, width: '80%', alignItems: 'center' },
});

export default Profile;


