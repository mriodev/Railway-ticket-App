import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screen/Home';
import Login from '../screen/Login';
import Settings from '../screen/Settings';
import MyAccount from '../screen/MyAccount';
import ConfirmBook from '../screen/ConfirmBook';
import Search from '../screen/Search';
import SeatPage from '../screen/SeatPage';
import { colors, parameters, title } from '../global/style'
import Icon from 'react-native-vector-icons/AntDesign';
import Location from 'react-native-vector-icons/Entypo';
import Train from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@rneui/themed';
const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.buttons,

      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon
              name="home"
              color="#3700B3"
              size={25}
            ></Icon>
          ),
        }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{
          tabBarLabel: 'Train',
          tabBarIcon: () => (
            <Train
              name="train"
              color="#3700B3"
              size={25}
            ></Train>
          ),
        }}
      />

      <Tab.Screen name="Settings" component={Settings}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon
              name="setting"
              color="#3700B3"
              size={25}
            ></Icon>
          ),
        }}
      />

      <Tab.Screen name="MyAccount" component={MyAccount}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user"
              color="#3700B3"
              size={25}
            ></Icon>
          ),
        }} />

    </Tab.Navigator>
  )
}