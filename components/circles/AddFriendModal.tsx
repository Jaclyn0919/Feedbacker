import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  inviteEmail: string;
  setInviteEmail: (text: string) => void;
  onSubmit: () => void;
}

const AddFriendModal = ({
  isVisible,
  onClose,
  inviteEmail,
  setInviteEmail,
  onSubmit,
}: Props) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={0.7}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Friend</Text>
        <Text style={styles.modalSubtitle}>Enter email address to send a friend request</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. friend@email.com"
          placeholderTextColor="#666"
          value={inviteEmail}
          onChangeText={setInviteEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.modalButton} onPress={onSubmit}>
          <Text style={styles.modalButtonText}>Send Request</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalSubtitle: {
    color: '#aaa',
    fontSize: 14,
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
  modalButton: {
    backgroundColor: '#333',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddFriendModal;
