import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SettingsModal = ({
  visible,
  onClose,
  onLogout,
}: {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // 完全滑出后才执行关闭逻辑
        onClose();
      });
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.divider} />
          <Pressable style={styles.item} onPress={() => {}}>
            <Feather name="shield" size={18} color="#fff" style={styles.icon} />
            <Text style={styles.itemText}>Privacy</Text>
          </Pressable>

          <View style={styles.divider} />
          <Pressable style={styles.item} onPress={() => {}}>
            <Feather name="user" size={18} color="#fff" style={styles.icon} />
            <Text style={styles.itemText}>Account</Text>
          </Pressable>

          <View style={styles.divider} />
          <Pressable style={styles.item} onPress={() => {}}>
            <Feather name="lock" size={18} color="#fff" style={styles.icon} />
            <Text style={styles.itemText}>Security</Text>
          </Pressable>

          <View style={styles.divider} />
          <Pressable style={styles.item} onPress={onLogout}>
            <Feather name="log-out" size={18} color="red" style={styles.icon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>

          <View style={styles.divider} />
          <Pressable style={styles.closeWrapper} onPress={() => {
            Animated.timing(slideAnim, {
              toValue: width,
              duration: 300,
              useNativeDriver: true,
            }).start(() => onClose());
          }}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  panel: {
    width: width * 0.65,
    height: '100%',
    backgroundColor: '#1c1c1e',
    padding: 24,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  icon: {
    marginRight: 12,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
  closeWrapper: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  closeText: {
    color: '#888',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 4,
    marginHorizontal: -8,
  },
});

export default SettingsModal;
