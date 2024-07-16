import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const BlogEditor = ({ onSave, onCancel }) => {
  const [content, setContent] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Write your blog here in markdown..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={() => onSave(content)} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default BlogEditor;
