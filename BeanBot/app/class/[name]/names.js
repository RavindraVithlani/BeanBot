import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { langNames } from '../../../components/data';

const PulseNameTable = ({ nameKey }) => {
  const { name } = useGlobalSearchParams();
  const pulseNames = langNames[name];

  if (!pulseNames) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available for the given name.</Text>
      </View>
    );
  }

  const data = Object.keys(pulseNames).map((language) => ({
    language,
    name: pulseNames[language]
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Names in Different Languages</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.cell, styles.headerCell]}>Language</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
      </View>
      {data.map((item) => (
        <View key={item.language} style={styles.row}>
          <Text style={styles.cell}>{item.language}</Text>
          <Text style={styles.cell}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default PulseNameTable;
