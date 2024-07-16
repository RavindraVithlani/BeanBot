import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { pulseDataFiles } from '../../../components/data';

const PulseDetailScreen = () => {
  const { name } = useGlobalSearchParams();
  const pulseData = pulseDataFiles[name];

  if (!pulseData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No data available for {name}</Text>
      </View>
    );
  }
  const renderSection = (section, key) => {
    return (
      <View key={key} style={styles.section}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={styles.sectionDescription}>{section.Description}</Text>
        <Text style={styles.source}>(source: {section.source})</Text>
      </View>
    );
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(pulseData).map(([key, section]) => {
        if (key === 'name') return null; // Skip the name field
        return renderSection(section, key);
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 25,
  },
  source: {
    fontSize: 14,
    color: 'grey',
    lineHeight:20,
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default PulseDetailScreen;
