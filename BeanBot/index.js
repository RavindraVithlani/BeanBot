/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import 'expo-router/entry'
import {registerRootComponent} from 'expo';
import App from './app';
registerRootComponent(App);

