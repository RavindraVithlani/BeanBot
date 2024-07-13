import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';

const DetailsRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { name } = router.params;
  const Details = require(`./details.js`).default;
  return <Details name={name} />;
};

const NamesRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { name } = router.params;
  const Names = require(`./names.js`).default;
  return <Names name={name} />;
};

const BlogsRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { name } = router.params;
  const Blogs = require(`./blogs.js`).default;
  return <Blogs name={name} />;
};

const Layout = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'details', title: 'Details' },
    { key: 'blogs', title: 'Blogs' },
    { key: 'names', title: 'Other Names' },
  ]);

  const renderScene = SceneMap({
    details: DetailsRoute,
    blogs: BlogsRoute,
    names: NamesRoute,
  });

  const router = useRouter();
  const { name } = router.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>{'<-'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            renderLabel={({ route, focused, color }) => (
              <Text style={[styles.tabLabel, focused ? styles.focusedTabLabel : null]}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'purple',
  },
  backButton: {
    fontSize: 18,
    color: 'white',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  tabLabel: {
    fontSize: 16,
    color: 'gray',
  },
  focusedTabLabel: {
    color: 'purple',
  },
  indicator: {
    backgroundColor: 'purple',
  },
});

export default Layout;
