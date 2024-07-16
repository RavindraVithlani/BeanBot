import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import Header from '../components/Header';
// import BottomNavBar from './components/BottomNavBar';

export default function Layout() {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header />
          <Slot name = "hellooooooooo."/>
          {/* <BottomNavBar /> */}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight // Handle Android padding
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
