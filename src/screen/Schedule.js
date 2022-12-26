import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '@react-native-firebase/firestore';
import Header from '../component/Header'
import { err } from 'react-native-svg/lib/typescript/xml';

export default function Schedule(props) {
    const navigation = useNavigation();

    var train;
    var isItem = false;
    try {
        train = props.route.params.item
        isItem = true
    } catch (error) {
        isItem = false
    }

    const trainRef = firebase.firestore().collection("trains");

    const [schedule, setSchedule] = useState([]);
    var mylist = []

    async function loadData() {
        var list = []
        trainRef
            .get()
            .then(async querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    //set all trains with previous trains
                    list.push({ id: documentSnapshot.id });
                });
                for (const item of list) {
                    await getSchedule(item.id)
                }


            }).catch((error) => {
                console.log(error)
            });
    }

    async function getSchedule(train) {
        await firebase.firestore().collection("trains/" + train + "/schedule").get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                try {

                    if (doc.data().id != undefined) {
                        mylist.push({
                            trainId: doc.data().trainId,
                            id: doc.id,
                            trainName: doc.data().trainName,
                            end: doc.data().end,
                            start: doc.data().start,
                            sTime: doc.data().startTime,
                            eTime: doc.data().endTime,
                            fPrice: doc.data().firstPrice,
                            sPrice: doc.data().secPrice,
                        });

                        setSchedule(mylist)
                    }
                    else {
                        console.log("error")
                        return 0;
                    }
                } catch (error) {
                    console.log(error)
                }
            });
        })
    }

    useEffect(() => {
        loadData()
        getSchedule()
    }, [])

    return (



        <View style={{ flex: 1, width: '100%' }}>
            <Header title='Schedule' type="arrowleft" navigation={navigation} ></Header>
            <FlatList

                data={schedule}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => { navigation.navigate('SeatPage', { item }) }}>

                        <View style={styles.cardBody}>
                            <View style={styles.cardBodyTop}>
                                <View style={styles.cardLeftSide}>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#4b3ca7", textAlign: "center" }}>
                                        {item.trainName}
                                    </Text>
                                    <View style={{ height: 10 }} />
                                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 20, color: "#4b3ca7", fontWeight: 'bold' }}>
                                            {item.start}
                                        </Text>
                                        <Text style={{ fontSize: 20, color: "#4b3ca7", fontWeight: 'bold' }}>
                                            {item.end}
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
                                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, color: "#4b3ca7", fontWeight: 'bold' }}>
                                            First Class
                                        </Text>
                                        <Text style={{ fontSize: 15, color: "#4b3ca7", fontWeight: 'bold' }}>
                                            Second Class
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, color: "#21130d", fontWeight: 'bold' }}>
                                            Rs.{item.fPrice}/=
                                        </Text>
                                        <Text style={{ fontSize: 14, color: "#21130d", fontWeight: 'bold' }}>
                                            Rs.{item.sPrice}/=
                                        </Text>
                                    </View>
                                    {/* <View style={styles.block}>
                                        <View style={styles.block1}>
                                            <View>
                                                <Text style={styles.heading}>fdgff</Text>
                                                <Text style={styles.body}>fdfd</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.body}>1h 40m</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.heading}>fdf</Text>
                                                <Text style={styles.body}>fdf</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', paddingHorizontal: 25 }}>
                                            <View style={styles.dot} />
                                            <View style={styles.dashed} />
                                            <View style={styles.dashed} />
                                            <View style={styles.dashed} />
                                            <View style={styles.dashed} />
                                            <View style={styles.dashed} />
                                            <View style={styles.dashed} />
                                            <View style={[styles.dot, { backgroundColor: '#f14d68' }]} />
                                        </View>
                                        <View style={styles.block1}>
                                            <View>
                                                <Text style={styles.heading}>fdfd</Text>
                                                <Text style={styles.body}>Arrival </Text>
                                            </View>

                                            <View>
                                                <Text style={styles.heading}>dffd</Text>
                                                <Text style={styles.body}>Departure</Text>
                                            </View>
                                        </View>
                                    </View>
                                                */}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />



        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'black',
    },
    itemText: {
        color: '#24333A',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 5

    },
    icon: {
        color: '#fff'

    },
    headerGroupIndicatorText: {
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 5,
    },
    inputSearchContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 10,
        borderRadius: 25,
    },
    inputSearch: {
        padding: 12,
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
        flex: 1,
    },
    buttonSearch: {
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        backgroundColor: '#fff',
        padding: 13,
        borderRadius: 30,
        aspectRatio: 1,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#FFC107',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff',
        marginLeft: 10,
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
        paddingTop: 20,
        flex: 1,
    },
    iconMore: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    defaultButton: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#F9B90D',
        borderRadius: 10,
        width: 155,
    },



    block: {

        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },

    block1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        alignSelf: 'stretch',
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#071330'
    },
    body: {
        fontSize: 14,
        color: '#071330'
    },
    wrapper1: {
        backgroundColor: 'white',
        borderRadius: 10
    },
    wrapper: {
        backgroundColor: '#F9B90D',
        shadowColor: '#000',
        shadowRadius: 3,
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        zIndex: 9999,
        shadowOpacity: 0.2,
        margin: 10,
    },

    lineCenter: {
        width: 10,
        height: '100%',
        borderWidth: 1,
        // borderLeftColor: 'gray',
        borderStyle: 'dashed',
    },
    dot: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: '#f14d68',
        borderRadius: 10,
    },
    dashed: {
        height: 10,
        width: 1,
        marginBottom: 10,
        backgroundColor: 'gray',
    },
    dashed_row: {
        height: 1,
        width: 11,
        marginRight: 11,
        backgroundColor: 'gray',
    },

    imageLogo: {
        width: 60,
        height: 60,
    },

    defaultButton: {

        padding: 15,
        backgroundColor: '#FFC107',
        borderRadius: 20,
        width: 155,
        height: 55,
    },







});