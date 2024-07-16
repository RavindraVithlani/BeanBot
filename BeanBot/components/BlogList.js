import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Button, Modal } from 'react-native';
import BlogCard from './BlogCard';
import BlogEditor from './BlogEditor';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddBlog = (content) => {
    setBlogs([...blogs, { id: blogs.length + 1, content }]);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} onPress={() => {}} />
        ))}
        <BlogCard blog={null} onPress={() => setIsEditing(true)} />
      </ScrollView>

      <Modal visible={isEditing} animationType="slide">
        <BlogEditor onSave={handleAddBlog} onCancel={handleCancel} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default BlogList;
