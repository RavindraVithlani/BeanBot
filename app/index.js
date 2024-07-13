import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from 'expo-router';
import BottomNavBar from '../components/BottomNavBar';

export default function Home() {
  const navigation = useNavigation();

  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
    <BottomNavBar/>
    </>
  );
}
