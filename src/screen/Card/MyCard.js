
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native'
import Header from '../../component/Header'
export default function MyCard(navigation) {
    return (
        <View>
            <Header title='My Card' type="arrowleft" navigation={navigation} ></Header>

            <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 10, paddingHorizontal: 10, paddingBottom: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', height: 100, alignItems: 'center', marginTop: 10, paddingHorizontal: 10, borderWidth: 2, borderRadius: 5, borderColor: 'black' }}>


                    <View style={{ width: 60, height: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 5, borderColor: 'gray' }}>
                        <Image resizeMode='center' style={{ width: 35, height: 35 }}></Image>
                    </View>
                    <Text style={{ flex: 1, marginLeft: 10, color: 'black' }}> Master Card</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}