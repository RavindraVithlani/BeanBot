import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BlogCard = ({ blog, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {blog ? (
        <Text style={styles.blogText}>{blog.content}</Text>
      ) : (
        <Text style={styles.plusSign}>+</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusSign: {
    fontSize: 50,
    color: '#ddd',
  },
  blogText: {
    fontSize: 16,
  },
});

export default BlogCard;
