import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Blogs = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blogs about {name}</Text>
      {/* Your blog content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Blogs;
