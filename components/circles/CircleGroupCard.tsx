import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

type Member = {
  name: string;
  role: string;
  level: number;
  avatar: string;
};

type Props = {
  groupName: string;
  owner: string;
  currentUserName: string;
  members: Member[];
  onAddFriend: () => void;
};

const CircleGroupCard: React.FC<Props> = ({
  groupName,
  owner,
  currentUserName,
  members,
  onAddFriend,
}) => {
  const [isExpanded, setExpanded] = useState(true);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(groupName);
  const [editedOwner, setEditedOwner] = useState(owner);
  const [memberSearchKeyword, setMemberSearchKeyword] = useState('');

  const toggleModal = () => setEditModalVisible(!isEditModalVisible);
  const toggleExpand = () => setExpanded(!isExpanded);
  const isAdmin = owner === currentUserName;

  const handleSave = () => {
    console.log('Saving group:', editedName, editedOwner);
    toggleModal();
  };

  const handleDeleteMember = (name: string) => {
    console.log('Deleting member:', name);
  };

  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.groupName}>{groupName}</Text>
          <View style={styles.ownerRow}>
            <Feather name="shield" size={14} color="#aaa" style={{ marginRight: 4 }} />
            <Text style={styles.ownerText}>{owner}</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={toggleModal} style={styles.iconBtn}>
            <Feather name="edit-2" size={16} color="#00BFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleExpand} style={styles.iconBtn}>
            <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.memberList}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.memberSearchInput}
              placeholder="Search members..."
              placeholderTextColor="#888"
              value={memberSearchKeyword}
              onChangeText={setMemberSearchKeyword}
            />
            {memberSearchKeyword.length > 0 && (
              <TouchableOpacity onPress={() => setMemberSearchKeyword('')}>
                <Feather name="x-circle" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.memberScrollArea}>
            {members
              .filter(m =>
                m.name.toLowerCase().includes(memberSearchKeyword.toLowerCase())
              )
              .map((m, idx) => {
                const memberContent = (
                  <View key={idx} style={styles.memberCard}>
                    <Text style={styles.avatar}>{m.avatar}</Text>
                    <View style={styles.memberInfo}>
                      <TouchableOpacity
                        onPress={() => {
                          // TODO: Navigate to profile
                        }}
                      >
                        <Text style={styles.memberName}>{m.name}</Text>
                      </TouchableOpacity>
                      <Text style={styles.memberDetail}>
                        {m.role} (level: {m.level})
                      </Text>
                    </View>
                    <View style={styles.actions}>
                      <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="message-square" size={16} color="#ccc" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBtn}>
                        <Feather name="share-2" size={16} color="#ccc" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );

                if (isAdmin && m.name !== currentUserName) {
                  return (
                    <Swipeable
                      key={idx}
                      renderRightActions={() => (
                        <TouchableOpacity
                          style={styles.deleteBtn}
                          onPress={() => handleDeleteMember(m.name)}
                        >
                          <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                      )}
                    >
                      {memberContent}
                    </Swipeable>
                  );
                }

                return memberContent;
              })}
          </ScrollView>

          {isAdmin && (
            <TouchableOpacity style={styles.addFriendBtn} onPress={onAddFriend}>
              <Text style={styles.addFriendText}>＋ Add Friend</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.6}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Group</Text>
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Group Name"
            style={styles.input}
            placeholderTextColor="#666"
          />
          <TextInput
            value={editedOwner}
            onChangeText={setEditedOwner}
            placeholder="Owner"
            style={styles.input}
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ownerText: {
    color: '#aaa',
    fontSize: 13,
  },
  iconBtn: {
    padding: 4,
  },
  memberList: {
    marginTop: 12,
    gap: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  memberSearchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: '#fff',
    outlineWidth: 0,
  },
  memberScrollArea: {
    maxHeight: 150,
    marginBottom: 12,
  },
  memberCard: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 6,
  },
  avatar: {
    fontSize: 20,
    marginRight: 10,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: '#00BFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  memberDetail: {
    color: '#aaa',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  deleteBtn: {
    backgroundColor: '#c62828',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addFriendBtn: {
    backgroundColor: '#222',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addFriendText: {
    color: '#00BFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CircleGroupCard;
