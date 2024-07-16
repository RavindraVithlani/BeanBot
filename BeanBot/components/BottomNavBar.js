import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
export default function BottomNavBar() {

  return (
    <View style={styles.navBar}>
      {<TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push('/camera')}
      >
        <Ionicons name="camera" size={45} color="white" elevation={6}/>
     </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    height: 60,
    // backgroundColor: '#6200EE',
    // borderRadius: 10,
    // elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: '#6200EE',
    color:'black',
    justifyContent: 'center',
    alignItems: 'center',
    elevation:7,
  },
});
