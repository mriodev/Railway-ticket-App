import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput, Dimensions,
    ScrollView,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Header from '../component/Header'
import { Button } from '@rneui/base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


export default function SchedulePage(props) {
    const navigation = useNavigation();
    var train;
    var isItem = false;
    try {
        train = props.route.params.item
        isItem = true
    } catch (error) {
        isItem = false
    }

    const withData = () => {
        return (
            <View style={[styles.globalShadowBox, { marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: '#9172EC' }]}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 25, fontWeight: 'bold' }}>{train.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 20 }}>{train.startPoint}</Text>
                    <Image style={{ width: 50, height: 40 }} source={require('../assest/TicketLogo.png')} />
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 20 }}>{train.endPoint}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 15 }}>{train.startTime}</Text>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 15 }}>{train.endTime}</Text>
                </View>
            </View>
        )
    }

    const withOut = () => {
        return (
            <View style={[styles.globalShadowBox, { marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: '#9172EC' }]}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>SELECT YOUR TRAIN IN HOME PAGE</Text>
            </View>
        )
    }


    return (
        <View>
            <View style={styles.container}>
                <ScrollView style={[styles.bodyContainer]}>

                    <View style={styles.container1}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>Available Schedule</Text>
                        </View>
                        <View style={styles.containerBody}>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('SeatPage');
                            }}>
                                <View style={styles.itemContainer} >
                                    <Text style={[styles.itemFooter], { marginBottom: 10 }}>

                                        <Text style={[styles.itemName]}>
                                            ad {' '}
                                        </Text>
                                        <Text style={styles.itemName}>
                                            ad {' '}
                                        </Text>
                                    </Text>
                                    <View style={styles.itemhooter}>
                                        <Text style={styles.itemText}>
                                            <Ionicons name="ios-calendar" style={styles.icon} />
                                            {'  '}
                                            12AM
                                        </Text>
                                        <Text style={styles.itemText}>
                                            <Ionicons name="ios-calendar" style={styles.icon} />
                                            {'  '}
                                            12AM
                                        </Text>

                                        <Text style={styles.itemText}>
                                            {'  '}
                                            150
                                        </Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        // shadow
        shadowColor: '#222',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 12,

    }
    , bodyContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#828595',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginEnd: 30,
    },



    container1: {
        marginTop: 50,
        padding: 10,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5F646A',
    },

    itemText: {
        color: '#24333A',
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemhooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemContainer: {
        borderWidth: 1.5,
        borderColor: '#1E3067',
        marginBottom: 12,
        padding: 20,
        borderRadius: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0D1820',
        marginBottom: 10,
    },
    itemPrice: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#0D1820',
        marginBottom: 10,
    },
    itemPriceOri: {
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#828595',
    },
    containerBody: {
        marginTop: 15,
    },
    icon: {
        marginRight: 10,
    },



});