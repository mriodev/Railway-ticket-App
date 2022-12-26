import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/style'
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMenu from 'react-native-vector-icons/Ionicons';


export default function HomeHeader({ title, type }) {
    return (
        <View style={styles.header}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>

                <IconMenu

                    name={type}
                    color={colors.headertext}
                    size={28}


                ></IconMenu>
            </View >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.cardbackground, fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>

                <IconMenu

                    name="notifications"
                    color={colors.headertext}
                    size={28}

                    onPress={() => {
                        navigation.goBack()
                    }}
                ></IconMenu>
            </View >



        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: 'space-between'
    },

})