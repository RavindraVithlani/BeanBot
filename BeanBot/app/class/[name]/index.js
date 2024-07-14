// app/class/details.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useGlobalSearchParams } from 'expo-router';

const PulseDetailScreen = () => {
  const { name } = useGlobalSearchParams();
  const pulseName = name;
  const [pulseData, setPulseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPulseData = async () => {
      try {
        console.log(FileSystem.bundleDirectory);
        const filePath = `${FileSystem.bundleDirectory}assets/data/${pulseName}.json`;
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const jsonData = JSON.parse(fileContent);
        setPulseData(jsonData);
      } catch (err) {
        setError(`Failed to load data for ${pulseName}`);
      }
    };

    loadPulseData();
  }, [pulseName]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!pulseData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pulseData.name}</Text>
      <Text style={styles.description}>{pulseData.description}</Text>
      {/* Render other pulse details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  error: {
    color: 'red',
  },
});

export default PulseDetailScreen;