import { ScrollView, Text, StyleSheet } from 'react-native';
import BlogList from '../../../components/BlogList';
import { View } from 'react-native';

export default function Tab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
      <BlogList/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});