// components/profile/ErrorModal.tsx
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  message: string;
};

const ErrorModal = ({ visible, onClose, message }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1c1c1e',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 6,
  },
  closeText: {
    color: '#ffffff',
    fontSize: 24,
  },
  message: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});