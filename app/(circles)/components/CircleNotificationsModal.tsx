import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

type Notification = { id: string; message: string };
type Props = {
  isVisible: boolean;
  onClose: () => void;
  notificationsByGroup: {
    groupName: string;
    notifications: Notification[];
  }[];
};

const CircleNotificationsModal: React.FC<Props> = ({ isVisible, onClose, notificationsByGroup }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleExpand = (groupName: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupName) ? prev.filter(g => g !== groupName) : [...prev, groupName]
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Group Notifications</Text>
        <ScrollView>
          {notificationsByGroup.map(group => (
            <View key={group.groupName} style={styles.groupBlock}>
              <TouchableOpacity onPress={() => toggleExpand(group.groupName)} style={styles.groupHeader}>
                <Text style={styles.groupName}>{group.groupName}</Text>
                <AntDesign
                  name={expandedGroups.includes(group.groupName) ? 'up' : 'down'}
                  size={16}
                  color="#aaa"
                />
              </TouchableOpacity>

              {expandedGroups.includes(group.groupName) && (
                <View style={styles.notificationList}>
                  {group.notifications.map(n => (
                    <Text key={n.id} style={styles.notificationItem}>• {n.message}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#111',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '85%',
  },  
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  groupBlock: {
    marginBottom: 12,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  groupName: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationList: {
    marginTop: 6,
    paddingLeft: 10,
    gap: 6,
  },
  notificationItem: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default CircleNotificationsModal;
