import React, { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const EditProfileModal = ({ visible, onClose, currentName, currentEmail }: any) => {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  const handleSave = () => {
    // 在这里处理保存逻辑（比如发请求或修改全局 state）
    onClose(); // 关闭弹窗
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Edit Profile</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.85,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cancel: {
    color: '#aaa',
    marginTop: 16,
    textAlign: 'center',
  },
});
