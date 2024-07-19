import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

// Assume data loaded from memory
const appDetails = {
  description: "BeanBot is an AI-powered mobile application for identifying various types of pulses.",
  classes: [
    "Bengal Gram",
    "Brown Lentils",
    "Black Eyed Pea",
    "Black Gram",
    "Chick Pea",
    "Green Gram",
    "Pigeon Pea",
    "White Pea"
  ],
  instructions: "To use BeanBot, simply click on the camera button below. You can either select an image from the gallery or take a picture of the pulses you want to identify.",
};

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.description}>{appDetails.description}</Text>
        
        <View style={styles.classesContainer}>
          <Text style={styles.subheading}>Classes Identified:</Text>
          {appDetails.classes.map((className, index) => (
            <View key={index} style={styles.classItem}>
              <Text style={styles.classBullet}>•</Text>
              <Text style={styles.classText}>{className}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.instructions}>{appDetails.instructions}</Text>
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  classesContainer: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    marginTop: 50
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  classItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  classBullet: {
    fontSize: 16,
    marginRight: 5,
    color: '#555',
  },
  classText: {
    fontSize: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default Home;
