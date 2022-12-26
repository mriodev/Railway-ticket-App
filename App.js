/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SignInScreen from './src/screen/authScreen/SignInScreen';
import { colors, parameters, title } from './src/global/style';
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator';
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusbar}>

      </StatusBar>
      <RootNavigator></RootNavigator>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});