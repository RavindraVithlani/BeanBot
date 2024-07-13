// app/class/details.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

const pulseDetails = {
  'Mung Bean': {
    description:
      'The Mung Bean (Vigna Radiata), alternatively known as the green gram, mungo bean, or mongo bean, is a plant species in the legume family.',
  },
  'Bengal Gram': {
    description:
      'Bengal Gram is also known as Chana or Chickpea and is a major pulse crop in India.',
  },
  'Black Gram': {
    description:
      'Black Gram, also known as Urad, is a type of pulse cultivated in the Indian subcontinent.',
  },
  // Add more details here
};

const Details = () => {
  const { name } = useGlobalSearchParams();
  const details = pulseDetails.name;
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{details?.description}</Text>
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
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Details;
