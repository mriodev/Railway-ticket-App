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




export default function MyAccount() {
    const navigation = useNavigation();
    SharedPreferences.setName("logindata");

    const [name, setName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')

    const [booking, setBookiing] = useState('')
    const [pay, setPay] = useState('')
    const [recentTrain, setRTrain] = useState('')

    const [bookking, setBooking] = useState('')
    async function getUserData() {
        SharedPreferences.getItem("username", function (username) {
            loadData(username)
            getbook(username)
        })
    }

    async function loadData(username) {
        const usersRef = firebase.firestore().collection("customers");
        usersRef.doc(username)

            .get()
            .then(doc => {
                setName(doc.data().firstname + " " + doc.data().lastname)
                setTelephone(doc.data().phone)
                setEmail(doc.data().email)

                setBookiing(doc.data().totalBookings)
                setPay(doc.data().totalPayments)
                setRTrain(doc.data().recentTrain)
            });
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

        <View style={{ flex: 1, width: '100%' }}>
            <Header title='My Account' type="arrowleft" navigation={navigation} ></Header>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#e3e1e1' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 22, marginBottom: 30 }}>
                        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 360, borderWidth: 2 }}>
                            <Image style={{ width: 100, height: 100, borderRadius: 360, }} source={require('../assest/user3.jpg')} />
                        </View>
                        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center', marginTop: '-10%', marginBottom: '-10%' }}>
                            <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#181D31', marginTop: 10 }}>{name}</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#adadad', marginTop: 10 }}>{email}</Text>
                        </View>

                    </View>

                    <View style={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>

                        <View style={{ width: '90%', height: 60, borderColor: '#4B63F7', borderWidth: 2, borderRadius: 26, shadowColor: '#adaaaa', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>

                            <View style={{ width: 25, height: 25, marginLeft: 20 }}><Icon name='account' color="#4B63F7" size={30}></Icon></View>
                            <View style={{ width: '70%', height: 30, marginLeft: 20 }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B63F7' }}> {name}</Text></View>
                            <View style={{ justifyContent: 'flex-end', }}><TouchableOpacity><Icon name='pencil-plus' color="#4B63F7" size={30}></Icon></TouchableOpacity></View>
                        </View>

                        <View style={{ width: '90%', height: 60, borderColor: '#4B63F7', borderWidth: 2, borderRadius: 26, shadowColor: '#adaaaa', marginTop: 40, marginBottom: 30, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 25, height: 25, marginLeft: 20 }}><Icon name='phone' color="#4B63F7" size={30}></Icon></View>
                            <View style={{ width: '70%', height: 30, marginLeft: 20 }}><Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B63F7' }}>{telephone}</Text></View>
                            <View style={{ justifyContent: 'flex-end', }}><TouchableOpacity><Icon name='pencil-plus' color="#4B63F7" size={30}></Icon></TouchableOpacity></View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.buttonP2} onPress={() => {
                                navigation.navigate('OrderPage');
                            }}  >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>View Ticket</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                {/*<TouchableOpacity style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <View style={styles.row}>
                        <View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt}>dfgf</Text>
                            </View>
                            <View style={styles.end}>
                                <Image style={[styles.icon, { marginLeft: 15, marginRight: 5, width: 14, height: 14 }]} source={{ uri: "https://img.icons8.com/small/14/000000/double-tick.png" }} />
                                <Text style={styles.time}>dfgf</Text>
                            </View>
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
                    </TouchableOpacity>*/}

            </ScrollView>

        </View >

    )
} const styles = StyleSheet.create({
    container: { flex: 1 },
    docImg: {
        width: 100,
        height: 100,
        marginTop: 50,
        alignSelf: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
        color: '#7B6C95',
    },
    buttonP2: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#4B63F7',
        borderRadius: 10,
        width: 150,
        marginBottom: 10,
        marginLeft: 10
    },
    spcl: {
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#f2f2f2',
        color: '#7B6C95',
        padding: 5,
        borderRadius: 10,
    },
    heading: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginLeft: 15,
    },
    timeSlot: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameInput: {
        borderRadius: 10,
        marginTop: 10,
        width: '94%',
        height: 45,
        borderWidth: 0.5,
        alignSelf: 'center',
        paddingLeft: 20,
    },
    genderView: {
        marginTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    gender: {
        borderRadius: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnView: { marginTop: 20, marginBottom: 20 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#dcdcdc',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,

    },
    pic: {
        borderRadius: 25,
        width: 50,
        height: 50,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 270,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 15,

    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    end: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,

    },
    icon: {
        height: 28,
        width: 28,
    }
});