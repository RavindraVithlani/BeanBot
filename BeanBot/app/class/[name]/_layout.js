import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Slot, Link, useGlobalSearchParams, usePathname, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { names } from '../../../components/data';

const Layout = () => {
  const { name } = useGlobalSearchParams();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{names[name]}</Text>
      </View>
      <View style={styles.tabContainer}>
        <Link replace href={`/class/${name}`} style={[styles.tab, pathname === `/class/${name}` && styles.activeTab]}>
          <Text style={[styles.tabText, pathname === `/class/${name}` && styles.activeTabText]}>Details</Text>
        </Link>
        <Link replace href={`/class/${name}/names`} style={[styles.tab, pathname === `/class/${name}/names` && styles.activeTab]}>
          <Text style={[styles.tabText, pathname === `/class/${name}/names` && styles.activeTabText]}>Other Names</Text>
        </Link>
        <Link replace href={`/class/${name}/blogs`} style={[styles.tab, pathname === `/class/${name}/blogs` && styles.activeTab]}>
          <Text style={[styles.tabText, pathname === `/class/${name}/blogs` && styles.activeTabText]}>Blogs</Text>
        </Link>
      </View>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:20,
  },
  tabContainer: {
    flexDirection: 'row',
    padding:8,
  },
  tab: {
    padding: 8,
    margin: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#908E8E',
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200EE',
  },
  activeTabText: {
    color: '#6200EE',
  },
});

export default Layout;
