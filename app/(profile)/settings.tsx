import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Settings = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logged out');
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon')}>
        <Text style={styles.itemText}>Notification Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon')}>
        <Text style={styles.itemText}>Privacy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Coming soon')}>
        <Text style={styles.itemText}>Account Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Text style={[styles.itemText, { color: '#FF5C5C' }]}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    paddingVertical: 16,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Settings;
