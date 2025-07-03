import AddFriendModal from '@/components/circles/AddFriendModal';
import CircleGroupCard from '@/components/circles/CircleGroupCard';
import CircleNotificationsModal from '@/components/circles/CircleNotificationsModal';
import CreateCircleModal from '@/components/circles/CreateCircleModal';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

const Circles = () => {
  const router = useRouter();

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isNotifModalVisible, setNotifModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [circleName, setCircleName] = useState('');
  const [circleDescription, setCircleDescription] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const toggleCreateModal = () => setCreateModalVisible(!isCreateModalVisible);
  const toggleInviteModal = () => setInviteModalVisible(!isInviteModalVisible);

  const handleCreate = () => {
    console.log('Creating circle:', circleName, circleDescription);
    setCreateModalVisible(false);
    setCircleName('');
    setCircleDescription('');
  };

  const handleInvite = () => {
    console.log('Inviting:', inviteEmail);
    setInviteModalVisible(false);
    setInviteEmail('');
  };

  const groups = [
    {
      id: '1',
      groupName: 'Close Friends',
      owner: 'Alex Johnson',
      currentUserName: 'Alex Johnson',
      members: [
        { name: 'Alex Johnson', role: 'The Legend', level: 15, avatar: '🧔🏻' },
        { name: 'Rowan Kim', role: 'The Legend', level: 14, avatar: '👩🏻' },
        { name: 'Jordan Lee', role: 'The Legend', level: 12, avatar: '👨🏼' },
        { name: 'Jamie Smith', role: 'The Oracle', level: 8, avatar: '👩🏽' },
      ],
    },
    {
      id: '2',
      groupName: 'Travel Explorers',
      owner: 'Jordan Lee',
      currentUserName: 'Alex Johnson',
      members: [
        { name: 'Jordan Lee', role: 'Explorer', level: 9, avatar: '🧳' },
        { name: 'Emily Tan', role: 'Navigator', level: 6, avatar: '🌏' },
      ],
    },
    {
      id: '3',
      groupName: 'Pizza Lovers',
      owner: 'Alex Johnson',
      currentUserName: 'Alex Johnson',
      members: [
        { name: 'Alex Johnson', role: 'The Legend', level: 15, avatar: '🧔🏻' },
        { name: 'Rowan Kim', role: 'The Legend', level: 14, avatar: '👩🏻' },
        { name: 'Jordan Lee', role: 'The Legend', level: 12, avatar: '👨🏼' },
        { name: 'Jamie Smith', role: 'The Oracle', level: 8, avatar: '👩🏽' },
      ],
    },
    {
      id: '4',
      groupName: 'Family',
      owner: 'Alex Johnson',
      currentUserName: 'Alex Johnson',
      members: [
        { name: 'Alex Johnson', role: 'The Legend', level: 15, avatar: '🧔🏻' },
        { name: 'Rowan Kim', role: 'The Legend', level: 14, avatar: '👩🏻' },
        { name: 'Jordan Lee', role: 'The Legend', level: 12, avatar: '👨🏼' },
        { name: 'Jamie Smith', role: 'The Oracle', level: 8, avatar: '👩🏽' },
      ],
    },
  ];

  const dummyNotifications = [
    {
      groupName: 'Close Friends',
      notifications: [
        { id: '1', message: 'Alex sent a new message.' },
        { id: '2', message: 'Rowan joined the group.' },
      ],
    },
    {
      groupName: 'Travel Explorers',
      notifications: [
        { id: '3', message: 'Emily shared a new location.' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeader}>
        <View>
          <Text style={styles.pageTitle}>Circles</Text>
          <Text style={styles.pageSubtitle}>Social Groups & Communities</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setNotifModalVisible(true)}>
            <Feather name="bell" size={20} color="#00BFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleCreateModal}>
            <Feather name="plus-circle" size={20} color="#00BFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search circles..."
            placeholderTextColor="#888"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
          {searchKeyword.length > 0 && (
            <TouchableOpacity onPress={() => setSearchKeyword('')}>
              <Feather name="x-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {groups
          .filter(g =>
            g.groupName.toLowerCase().includes(searchKeyword.toLowerCase())
          )
          .map(group => (
            <CircleGroupCard
              key={group.id}
              {...group}
              onAddFriend={toggleInviteModal}
            />
          ))}
      </ScrollView>

      {/* Modals */}
      <CreateCircleModal
        isVisible={isCreateModalVisible}
        onClose={toggleCreateModal}
        circleName={circleName}
        setCircleName={setCircleName}
        circleDescription={circleDescription}
        setCircleDescription={setCircleDescription}
        onSubmit={handleCreate}
      />
      <AddFriendModal
        isVisible={isInviteModalVisible}
        onClose={toggleInviteModal}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        onSubmit={handleInvite}
      />
      <CircleNotificationsModal
        isVisible={isNotifModalVisible}
        onClose={() => setNotifModalVisible(false)}
        notificationsByGroup={dummyNotifications}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  pageHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    flexShrink: 1,
  },
  iconBtn: {
    justifyContent: 'center',
  },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  pageSubtitle: { color: '#888888', fontSize: 14 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#ffffff',
    outlineWidth: 0,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});

export default Circles;
