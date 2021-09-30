/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import Home from './Screens/Home';
import Insertar from './Screens/Insertar';
import Login from './Screens/Login';
import Api from './Screens/Api';

function App()  {
  return (
    //<View style={styles.containter}>
      <Insertar></Insertar>
      //<Api></Api>
      //<Login/>
      //<Login></Login>
   // </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    backgroundColor: 'white',
  }
});

export default App;
