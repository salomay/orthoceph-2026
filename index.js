/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';


import configureStore from './component/store';
import { enableScreens } from 'react-native-screens';
enableScreens(); // Panggil sebelum NavigationContainer

const store = configureStore();
LogBox.ignoreAllLogs(); //Ignore all log notifications

const MakeRedux = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>  
  <SafeAreaProvider>  
    <Provider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
    </Provider>
 </SafeAreaProvider>
 </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => MakeRedux);
