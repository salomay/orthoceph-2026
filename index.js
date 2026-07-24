/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';


import configureStore from './component/store';
import { enableScreens } from 'react-native-screens';
enableScreens(); // Panggil sebelum NavigationContainer

const store = configureStore();
LogBox.ignoreAllLogs(); //Ignore all log notifications

const MakeRedux = () => (
  <Provider store={store}>
  <PaperProvider>
    <App />
  </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => MakeRedux);
