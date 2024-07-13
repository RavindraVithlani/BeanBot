import React from 'react';
import Camera from '../../components/Camera';
import { StyleSheet, View } from 'react-native';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Camera/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
