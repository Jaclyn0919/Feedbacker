import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const FilterBtnGroup = () => {
  return (
    <View style={styles.container}>
      {/* 第一个按钮 - Filters */}
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.8}
      >
        <AntDesign name="filter" size={16} color={Platform.OS === 'android' ? '#000' : undefined} />
        <Text style={styles.buttonText}>Filters</Text>
      </TouchableOpacity>
      
      {/* 第二个按钮 - Rating */}
      <TouchableOpacity 
        style={[styles.button, styles.slimButton]}
        activeOpacity={0.8}
          >
        <AntDesign name="staro" size={16} color="black" />
        <Text style={styles.buttonText}>Rating</Text>
      </TouchableOpacity>
      
      {/* 第三个按钮 - Loop 带下拉箭头 */}
      <TouchableOpacity 
        style={[styles.button, styles.slimButton]}
        activeOpacity={0.8}
      >
        <MaterialIcons name="group" size={16} color="black" />
        <Text style={styles.buttonText}>Loop</Text>
        <Entypo name="chevron-down" size={12} color={Platform.OS === 'android' ? '#707070' : undefined} style={styles.chevronIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB', 
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    height: 36, 
    gap: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  slimButton: {
    paddingHorizontal: 8,
    height: 32, 
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500', 
    color: '#1F2937',
  },
  chevronIcon: {
    opacity: 0.7, 
  },
  // 交互状态样式可以在组件中通过状态管理动态应用
  buttonHover: {
    backgroundColor: '#EBF4FF', 
  },
  buttonTextHover: {
    color: '#3B82F6', 
  },
});

export default FilterBtnGroup;