import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { firebase } from '@react-native-firebase/firestore';
import { View } from 'react-native-animatable';
import Header from '../component/Header'
import { height, width } from 'react-native-dimension';
import urid from 'urid'
import QRCode from 'react-native-qrcode-svg';

export const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
};

export default function ConfirmBook(props) {
    const navigation = useNavigation();
    const usersRef = firebase.firestore().collection("customers");

    //get home selected train details
    var data;
    try {
        data = props.route.params.data
    } catch (error) {
        // go home
        navigation.navigate('SeatPage');
    }

    useEffect(() => {
        getUserData(data.id)
    }, [])

    const [name, setName] = useState("")
    const [telephone, setTelephone] = useState("")
    const [email, setEmail] = useState("")
    const [dataURL, setURL] = useState()
    //get user data from database
    function getUserData(id) {
        usersRef.doc(id)
            .get()
            .then(doc => {
                setName(doc.data().firstname + " " + doc.data().lastname)
                setTelephone(doc.data().phone)
                setEmail(doc.data().email)
            });
    }
    const ticketno = urid(6, '0123456789ABCDEFGH');
    /*
        RNQRGenerator.generate({
            value: JSON.stringify({ no: 'ticketno' }),
            height: 100,
            width: 100,
            base64: false,            // default 'false'
            backgroundColor: 'black', // default 'white'
            color: 'white',
        })
            .then(response => {
                const { uri, width, height, base64 } = response;
                this.setState({ imageUri: uri });
            })
            .catch(error => console.log('Cannot create QR code', error));
    
        RNQRGenerator.detect({
    
        })
            .then(response => {
                const { values } = response; // Array of detected QR code values. Empty if nothing found.
            })
            .catch(error => console.log('Cannot detect QR code in image', error));
    
    */
    function pay() {
        navigation.navigate('Payment', { data, ticket: { ticketno: ticketno, qrurl: dataURL }, user: { name: name, email: email, telephone: telephone, id: data.id } });
    }

    function getDataURL() {
        this.svg.toDataURL(this.callback);
    }

    function callback(dataURL) {
        console.log(dataURL);
    }
    const Line = () => {
        return (
            <View style={{ position: 'relative' }}>
                <View
                    style={{
                        alignItems: 'center',
                        position: 'absolute',
                        left: -10,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={[
                            styles.dot,
                            {
                                borderWidth: 0,
                                backgroundColor: 'gray',
                                shadowColor: '#000',
                                shadowRadius: 3,
                                shadowOffset: {
                                    width: 2,
                                    height: 1,
                                },
                                shadowOpacity: 0.0,
                            },
                        ]}
                    />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View style={styles.dashed_row} />
                    <View
                        style={[
                            styles.dot,
                            {
                                borderWidth: 0,
                                backgroundColor: 'gray',

                                shadowColor: '#000',
                                shadowRadius: 3,
                                shadowOffset: {
                                    width: 2,
                                    height: 1,
                                },
                                shadowOpacity: 0.0,
                            },
                        ]}
                    />
                </View>
            </View>
        );
    };

    return (
        <View>
            <Header title='Confirm Booking' type="arrowleft" navigation={navigation} ></Header>

            <ScrollView style={{ backgroundColor: 'gray', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.wrapper1}>
                        <View style={styles.wrapper}>
                            <View style={styles.block}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.heading}>{data.train.trainName}</Text>
                                    <Text style={styles.body}>{data.class} - class </Text>
                                </View>
                                <Image
                                    style={styles.imageLogo}
                                    source={require('../assest/TicketLogo.png')}
                                />
                            </View>


                        </View>
                        <Line></Line>
                        <View style={styles.block}>
                            <View style={styles.block1}>
                                <View>
                                    <Text style={styles.heading}>{data.train.sTime}</Text>
                                    <Text style={styles.body}>{data.date}</Text>
                                </View>
                                <View>
                                    <Text style={styles.body}>1h 40m</Text>
                                </View>
                                <View>
                                    <Text style={styles.heading}>{data.train.eTime}</Text>
                                    <Text style={styles.body}>{data.date}</Text>
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
                                    <Text style={styles.heading}>{data.train.start}</Text>
                                    <Text style={styles.body}>Arrival </Text>
                                </View>
                                <View>
                                    <Image
                                        style={styles.imageLogo}
                                        source={require('../assest/TicketLogo.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.heading}>{data.train.end}</Text>
                                    <Text style={styles.body}>Departure</Text>
                                </View>
                            </View>
                        </View>
                        <Line />
                        <View style={[styles.block]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.body}>Railway Booking Code (PNR) </Text>
                                <Text
                                    style={[
                                        styles.heading,
                                        {
                                            color: '#313DB4',
                                            textAlign: 'center',
                                        },
                                    ]}>
                                    {ticketno}
                                    {this.state}


                                </Text>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>

                                    <QRCode
                                        value={ticketno}
                                        getRef={(c) => (this.svg = c)}
                                    ></QRCode>
                                </View>

                            </View>
                        </View>
                        <Line />
                        <View style={[styles.block]}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.heading}>Passenger  </Text>
                                <View
                                    style={{
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Text>1</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.heading}>{name}</Text>
                                        <Text style={styles.body}>{telephone} </Text>
                                    </View>
                                    <View>
                                        <Text style={{ backgroundColor: '#ededed', color: '#071330', fontWeight: 'bold', padding: 6 }}>
                                            Rs. {data.pay}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            marginBottom: 20,
                            paddingBottom: 30,
                            paddingLeft: 30,
                            paddingRight: 30,
                            backgroundColor: '#9172EC',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{ paddingTop: 50 }}>
                                <View style={{ marginBottom: 10, marginTop: 30, alignItems: 'center', }}>
                                    <TouchableOpacity style={styles.defaultButton} onPress={pay} >
                                        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Confirm </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView>

        </View >

        /*<ScrollView>
             <View style={{ flex: 1 }}>
                 <View
                     style={{
                         alignSelf: 'center',
                         height: height(70),
                         width: width(100),
                     }}>
                     <View
                         style={{
                             flex: 1,
                             backgroundColor: 'white',
                         }}>
                         <View
                             style={{
                                 alignSelf: 'center',
                                 height: height(60),
                                 width: width(80),
                                 borderRadius: width(4),
                                 marginTop: width(10),
                                 backgroundColor: '#9172EC',
                             }}>
     
     
                             <View
                                 style={{
                                     flexDirection: 'row',
                                     justifyContent: 'space-between',
                                     padding: 10,
                                 }}>
                                 <View>
                                     <Text style={{ textAlign: 'right', paddingLeft: 80, fontSize: 15, color: '#FFFFFF', fontWeight: 'bold' }}>Customer Details</Text>
                                     <Text style={{ textAlign: 'left', color: '#FFFFFF' }}>Name : {name}</Text>
                                     <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>telephone: {telephone}</Text>
                                 </View>
                                 <View style={{ alignSelf: 'flex-end' }}>
                                     <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>Rs: 200/-</Text>
                                 </View>
                             </View>
     
     
                             <View
                                 style={{
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     flexDirection: 'row',
                                 }}>
                                 <View
                                     style={{
                                         height: height(4),
                                         width: width(8),
                                         borderRadius: width(10),
                                         backgroundColor: 'white',
                                     }}
                                 />
                                 <Text style={{ color: 'white' }}>
                                     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                     - - - - - -
                                 </Text>
                                 <View
                                     style={{
                                         height: height(4),
                                         width: width(8),
                                         borderRadius: width(10),
                                         backgroundColor: 'white',
                                     }}
                                 />
                             </View>
                             <View style={{
                                 justifyContent: 'space-between', flexDirection: 'row'
                             }}>
                                 <View>
                                     <Text style={{ fontWeight: 'bold', padding: 10 }}>CODE200</Text>
                                     <View style={{ padding: 10 }}>
                                         <Text style={{ textAlign: 'left', color: '#FFFFFF' }}>Train No : {data.train.trainno}</Text>
                                         <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>From : {data.train.startPoint}</Text>
     
                                         <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>To : {data.train.endPoint}</Text>
                                     </View>
     
     
                                 </View>
     
     
                                 <View
                                     style={{
                                         alignSelf: 'flex-end',
                                         padding: 10,
                                     }}>
                                     <View style={{}}>
                                         <Text style={{ textAlign: 'left', color: '#FFFFFF' }}>Train Name : {data.train.title}</Text>
                                         <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>Departure : {data.train.startTime}</Text>
                                         <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>Arraivel : {data.train.endTime}</Text>
                                     </View>
                                 </View>
                             </View>
                             <View
                                 style={{
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     flexDirection: 'row',
                                 }}>
                                 <View
                                     style={{
                                         height: height(4),
                                         width: width(8),
                                         borderRadius: width(10),
                                         backgroundColor: 'white',
                                     }}
                                 />
                                 <Text style={{ color: 'white' }}>
                                     - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                     - - - - - -
                                 </Text>
                                 <View
                                     style={{
                                         height: height(4),
                                         width: width(8),
                                         borderRadius: width(10),
                                         backgroundColor: 'white',
                                     }}
                                 />
                             </View>
     
                             <View
                                 style={{
                                     flexDirection: 'row',
                                     justifyContent: 'space-between',
                                     padding: 10,
                                 }}>
                                 <View>
                                     <Text style={{ textAlign: 'left' }}>RESERVE ON</Text>
                                     <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>Class : {data.class == 500 ? "1st" : "2nd"} </Text>
                                     <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>Seats Count : {data.seats} </Text>
                                     <Text style={{ textAlign: 'left', color: '#FFFFFF', marginTop: 10 }}>Seat Price : {data.class} </Text>
                                 </View>
                                 <View style={{ alignSelf: 'flex-end' }}>
                                     <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>Rs: {data.pay}/-</Text>
                                 </View>
                             </View>
     
                         </View>
                     </View>
                 </View>
     
     
                 <View style={{
                     marginBottom: 20,
                     paddingBottom: 20,
                     paddingLeft: 30,
                     paddingRight: 30,
                     backgroundColor: '#9172EC',
                     width: '100%',
                     height: '100%',
                     justifyContent: 'space-between',
                 }}>
                     <View style={{ paddingTop: 30, paddingBottom: 30 }}>
                         <View style={{ marginBottom: 10, marginTop: 10, alignItems: 'center', }}>
                             <TouchableOpacity style={styles.defaultButton} onPress={pay} >
                                 <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Confirm </Text>
                             </TouchableOpacity>
                         </View>
                     </View>
                 </View>
             </View>
             */

    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        padding: 10,
    },
    block: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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

})