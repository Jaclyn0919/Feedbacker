import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  selectedTags: string[];
  handleRemoveTag: (tagToRemove: string) => void; 
};

// 标签组件
const Tag = ({ text, onRemove } : any) => {
  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{text}</Text>
      <Pressable
        style={styles.removeButton}
        onPress={onRemove}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </Pressable>
    </View>
  );
};

// 标签列表组件
const TagList = ({selectedTags,handleRemoveTag}:Props) => {

  return (
    <View style={styles.container}>
      {selectedTags.map(tag => (
        <Tag
          key={tag}
          text={tag}
          onRemove={() => handleRemoveTag(tag)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // 相当于Tailwind的gap-2 (8px)
    marginTop: 8, // 相当于Tailwind的mt-2 (8px)
  },
  tagContainer: {
    backgroundColor: '#64748b', // 对应bg-secondary
    borderRadius: 9999, // 对应rounded-full
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 10, // 对应px-2.5 (10px)
    paddingVertical: 2, // 对应py-0.5 (2px)
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // 对应gap-1 (4px)
  },
  tagText: {
    fontSize: 10, // 对应text-xs
    fontWeight: '600', // 对应font-semibold
    color: '#ffffff', // 对应text-secondary-foreground
  },
  removeButton: {
    width: 16, // 对应h-4 (16px)
    height: 16, // 对应w-4 (16px)
    borderRadius: 9999, // 对应rounded-full
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 10, // 对应text-xs
    color: '#ffffff',
  },
});

export default TagList;    