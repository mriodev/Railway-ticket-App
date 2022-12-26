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
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import Header from '../component/Header'
import { Button } from '@rneui/base';
import { firebase } from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SchedulePage from './SchedulePage';
var SharedPreferences = require('react-native-shared-preferences');

export default function OrderPage() {
    const navigation = useNavigation();
    SharedPreferences.setName("logindata");

    const [bookking, setBooking] = useState('')
    async function getUserData() {
        SharedPreferences.getItem("username", function (username) {

            getbook(username)
        })
    }

    async function getbook(username) {
        console.log(username)
        const colRef = firebase.firestore().collection('bookings').where('uid', "==", username);

        colRef.get().then((querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            console.log(tempDoc)
            setBooking(tempDoc)
        })
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <View>
            <Header title='My Reservations' type="arrowleft" navigation={navigation} ></Header>

            <View style={{ marginTop: 20 }}>

                <FlatList
                    data={bookking}
                    renderItem={({ item }) =>
                        <TouchableOpacity >

                            <View style={styles.cardBody}>
                                <View style={styles.cardBodyTop}>
                                    <View style={styles.cardLeftSide}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#4b3ca7", marginLeft: 10, marginBottom: 5 }}>
                                            Train Name: {item.trainName}
                                        </Text>
                                        <Text style={{ fontSize: 20, color: "#4b3ca7", fontWeight: 'bold', marginLeft: 10, marginBottom: 20 }}>
                                            Total Amount: {item.bill}
                                        </Text>
                                        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 20, color: "#4b3ca7", fontWeight: 'bold' }}>
                                                {item.sLocation}
                                            </Text>
                                            <Text style={{ fontSize: 15, color: "#4b3ca7", fontWeight: 'bold' }}>To</Text>
                                            <Text style={{ fontSize: 20, color: "#4b3ca7", fontWeight: 'bold' }}>
                                                {item.eLocation}
                                            </Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 18, color: "#21130d", fontWeight: 'bold' }}>
                                                {item.sTime}
                                            </Text>
                                            <Text style={{ fontSize: 18, color: "#21130d", fontWeight: 'bold' }}>
                                                {item.eTime}
                                            </Text>
                                        </View>
                                        <View style={{ height: 10 }} />
                                        <View style={{ borderBottomColor: '#DDAA00', borderBottomWidth: 1, }} />
                                        <View style={{ height: 10 }} />
                                        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{ fontSize: 15, color: "#4b3ca7", fontWeight: 'bold' }}>
                                                {item.class} Class
                                            </Text>
                                            <Text style={{ fontSize: 15, color: "#4b3ca7", fontWeight: 'bold' }}>
                                                {item.date}
                                            </Text>
                                        </View>

                                        <Button style={{
                                            alignItems: 'center',
                                            backgroundColor: '#4B63F7',
                                            borderRadius: 10,
                                            width: 100,
                                            marginBottom: 10,
                                            marginRight: 50
                                        }} >Cancel</Button>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View ></View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'black',
    },


    cardcontainer: {
        flex: 1,
    },
    cardBody: {
        padding: 15,
        backgroundColor: "#FFF",
        margin: 5,
        borderColor: '#4b3ca7',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 16,
    },
    cardHeaderContaner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7B6C95',
    },
    cardMore: {
        fontWeight: 'bold',
        color: '#7B6C95',
    },
    cardGroupIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBodyTop: {
        flexDirection: 'row',
    },
    cardLeftSide: {
        alignContent: 'space-between',
        marginLeft: 5,
        //  paddingLeft: 20,
        //  paddingRight: 20,
        flex: 1,
    },


});