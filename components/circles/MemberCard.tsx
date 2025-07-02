import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const MemberCard = ({
  member,
  isAdmin = false,
  onDelete
}: {
  member: { name: string; role: string; level: number; avatar: string };
  isAdmin?: boolean;
  onDelete?: () => void; // TODO: 替换为 API 调用
}) => {
  const renderRightActions = () => (
    <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const content = (
    <View style={styles.card}>
      <Text style={styles.avatar}>{member.avatar}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>🏅 {member.role} ({member.level})</Text>
      </View>
      <View style={styles.actions}>
        {/* TODO: 替换为功能按钮 */}
        <TouchableOpacity><Text style={styles.action}>💬</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.action}>🔗</Text></TouchableOpacity>
      </View>
    </View>
  );

  return isAdmin ? (
    <Swipeable renderRightActions={renderRightActions}>
      {content}
    </Swipeable>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#333',
    borderWidth: 1,
  },
  avatar: { fontSize: 24, marginRight: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  role: { color: '#aaa', fontSize: 13 },
  actions: { flexDirection: 'row', gap: 12 },
  action: { color: '#00bcd4', fontSize: 18, marginLeft: 12 },
  deleteBtn: {
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 6,
    marginVertical: 5,
  },
  deleteText: { color: 'white', fontWeight: 'bold' },
});

export default MemberCard;
