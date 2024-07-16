import React from 'react';
import { View, Text } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

export default function Home() {
  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
    <BottomNavBar/>
    </>
  );
}
