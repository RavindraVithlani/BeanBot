import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Names = ({ name }) => {
  const pulseNames = {
    // Example data
    moong: ['Mung Bean', 'Green Gram', 'Vigna Radiata'],
    // Add more pulses as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Names for {name}</Text>
      <FlatList
        data={pulseNames[name]}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
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
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Names;
