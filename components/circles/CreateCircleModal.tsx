import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  circleName: string;
  circleDescription: string;
  setCircleName: (text: string) => void;
  setCircleDescription: (text: string) => void;
  onSubmit: () => void;
}

const CreateCircleModal = ({
  isVisible,
  onClose,
  circleName,
  circleDescription,
  setCircleName,
  setCircleDescription,
  onSubmit,
}: Props) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={0.7}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create New Circle</Text>
        <Text style={styles.modalSubtitle}>Fill out the details below</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Hiking Club"
          placeholderTextColor="#666"
          value={circleName}
          onChangeText={setCircleName}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What is this circle about?"
          placeholderTextColor="#666"
          value={circleDescription}
          onChangeText={setCircleDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.modalButton} onPress={onSubmit}>
          <Text style={styles.modalButtonText}>Create Circle</Text>
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
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  modalSubtitle: { color: '#aaa', fontSize: 14, marginBottom: 16 },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  modalButton: {
    backgroundColor: '#333',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: { color: '#fff', fontSize: 16 },
});

export default CreateCircleModal;
