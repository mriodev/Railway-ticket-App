import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Drawer } from 'react-native-paper'
import RootNavigator from './RootNavigator'
import { colors, parameters, title } from '../global/style'
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="RootNavigator"
                component={RootNavigator}
                options={{
                    title: 'Client',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            name="home"
                            iconStyle={focussed ? '#2A81C2' : colors.grey2}
                        />
                    )
                }} />



        </Drawer.Navigator>
    )
}