import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/style'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";

export default function Header({ title, type, navigation }) {

    return (
        <View style={styles.header}>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginTop: 10 }}>
                <Icon
                    type="material-community"
                    name={type}
                    color={colors.headertext}
                    size={28}

                    onPress={() => {
                        navigation.goBack()
                    }}
                ></Icon>

            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.headertext}>{title}</Text>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,

    },
    headertext: {
        color: colors.headertext,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10,
    }

})