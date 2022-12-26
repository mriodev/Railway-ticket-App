import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, ScrollView, TouchableOpacity, Alert, CameraRoll, ToastAndroid } from 'react-native'
import { firebase } from "@react-native-firebase/firestore";
import { View } from 'react-native-animatable';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../component/Header'
import { Button } from '@rneui/themed';
import { CardField, CardFieldInput } from '@stripe/stripe-react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import PaymentStripe from './Card/PaymentStripe';

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
export default function Payment(props) {
    const { presentPaymentSheet } = useStripe();
    const navigation = useNavigation();
    const bookinfRef = firebase.firestore().collection("bookings");
    //get home selected train details
    var data;
    var user;
    try {
        ticketno = props.route.params.ticket
        data = props.route.params.data
        user = props.route.params.user
        //console.log(ticketno)
        //console.log(props.route.params.user.telephone)
    } catch (error) {
        // go home
        navigation.navigate('SeatPage');
    }

    function confirmPay() {
        Alert.alert(
            "Info",
            "Are You Confirm the Payment?",
            [
                { text: "YES", onPress: () => pay() }
            ]
        );
    }

    function pay() {
        //add data to database
        console.log(data.date)
        bookinfRef
            .add({
                name: user.name,
                telephone: user.telephone,
                email: user.email,
                uid: user.id,
                date: data.date,

                trainNo: data.train.trainId,
                trainName: data.train.trainName,
                sLocation: data.train.start,
                sTime: data.train.sTime,
                eLocation: data.train.end,
                eTime: data.train.eTime,
                tickno: ticketno.ticketno,
                class: data.class,
                seatsCount: data.seats,
                seatPrice: data.classPrice,
                bill: data.pay
            })
            .then(() => {
                firebase.firestore().doc('customers/' + user.id).update({
                    totalBookings: firebase.firestore.FieldValue.increment(1),
                    totalPayments: firebase.firestore.FieldValue.increment(data.pay),
                    recentTrain: data.train.trainName,
                }).then(() => {
                    firebase.firestore().doc('trains/' + data.train.trainId).update({
                        totalBookings: firebase.firestore.FieldValue.increment(1),
                        totalIncome: firebase.firestore.FieldValue.increment(data.pay),
                    }).then(() => {
                        Alert.alert(
                            "Successfull",
                            "Your Payment Completed. Thank You!",
                            [
                                { text: "CLOSE", onPress: () => navigation.navigate('Index') }
                            ]
                        );
                    })

                });
            });
    }

    return (
        <View style={{ marginBottom: 30 }}>
            <Header title='Payment' type="arrowleft" navigation={navigation} ></Header>

            <View style={{
                width: '100%',
                height: '92%',
                backgroundColor: COLOURS.white,
                position: 'relative',
            }}>

                <ScrollView >
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>

                        <View
                            style={{
                                marginVertical: 20,
                            }}>
                            <View
                                style={{
                                    paddingHorizontal: 16,
                                    marginVertical: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLOURS.black,
                                        fontWeight: '500',
                                        letterSpacing: 1,
                                        marginBottom: 20,
                                    }}>
                                    Payment Method
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: '80%',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                color: COLOURS.blue,
                                                backgroundColor: COLOURS.backgroundLight,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 12,
                                                borderRadius: 10,
                                                marginRight: 18,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '900',
                                                    color: COLOURS.blue,
                                                    letterSpacing: 1,
                                                }}>
                                                VISA
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: COLOURS.black,
                                                    fontWeight: '500',
                                                }}>
                                                Visa Classic
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: COLOURS.black,
                                                    fontWeight: '400',
                                                    lineHeight: 20,
                                                    opacity: 0.5,
                                                }}>
                                                ****-9092
                                            </Text>
                                        </View>
                                    </View>
                                    <MaterialCommunityIcons
                                        name="chevron-right"
                                        style={{ fontSize: 22, color: COLOURS.black }}
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    paddingHorizontal: 16,
                                    marginVertical: 10,
                                }}>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: '80%',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                color: COLOURS.blue,
                                                backgroundColor: COLOURS.backgroundLight,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 10,
                                                borderRadius: 10,
                                                marginRight: 18,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '900',
                                                    color: COLOURS.blue,
                                                    letterSpacing: 1,
                                                }}>
                                                PAYPAL
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: COLOURS.black,
                                                    fontWeight: '500',
                                                }}>
                                                Paypal Online
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    color: COLOURS.black,
                                                    fontWeight: '400',
                                                    lineHeight: 20,
                                                    opacity: 0.5,
                                                }}>
                                                ****-9092
                                            </Text>
                                        </View>
                                    </View>
                                    <MaterialCommunityIcons
                                        name="chevron-right"
                                        style={{ fontSize: 22, color: COLOURS.black }}
                                    />
                                </View>
                            </View>
                            <View
                                style={{

                                    paddingHorizontal: 16,
                                    marginVertical: 10,
                                }}>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLOURS.black,
                                        fontWeight: '500',
                                        letterSpacing: 1,
                                        marginBottom: 20,
                                    }}>
                                    Reservation Code:
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: '#313DB4',
                                        fontWeight: '500',
                                        letterSpacing: 1,
                                        marginBottom: 20,
                                    }}> {ticketno.ticketno}</Text>
                                </Text>


                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: COLOURS.black,
                                        fontWeight: '500',
                                        letterSpacing: 1,
                                        marginBottom: 20,
                                    }}>
                                    Payment
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 8,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            maxWidth: '80%',
                                            color: COLOURS.black,
                                            opacity: 0.5,
                                        }}>
                                        Subtotal
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: COLOURS.black,
                                            opacity: 0.8,
                                        }}>
                                        {data.train.title}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 22,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            maxWidth: '80%',
                                            color: COLOURS.black,
                                            opacity: 0.5,
                                        }}>
                                        Passengers
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            color: COLOURS.black,
                                            opacity: 0.8,
                                        }}>
                                        {data.seats}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: '400',
                                            maxWidth: '80%',
                                            color: COLOURS.black,
                                            opacity: 0.5,
                                        }}>
                                        Total
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '500',
                                            color: COLOURS.black,
                                        }}>
                                        {data.pay}
                                    </Text>
                                </View>
                            </View>
                        </View>


                    </View>

                    <View style={styles.container}  >
                        <View style={styles.navi}>
                            <View style={{ display: 'flex', height: 60, justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: COLOURS.black, marginTop: 20 }}>Make Payment</Text>
                            </View>
                        </View>

                        <View style={styles.body}>
                            <View style={styles.creditCard}>



                                <StripeProvider
                                    publishableKey={'pk_test_51M1pclD3uxL97LN2uOfthG4VuHXYmIgWMRTdS0tzDCiPn1nriltBzghEE7tAV3OcL2ATut1Lrmk4Ruvi0TxiZPrw00lfaKv91m'}
                                    urlScheme="www.google.com" // required for 3D Secure and bank redirects
                                    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
                                >
                                    <PaymentStripe ></PaymentStripe>
                                </StripeProvider>



                                { /*
                                <TextInput
                                    autoCapitalize='none'
                                    placeholder='Name on Card'
                                    keyboardType='name-phone-pad'
                                    style={styles.input}>

                                </TextInput>

                               <CardField
                                    postalCodeEnabled={true}
                                    placeholder={{
                                        number: '0000 0000 0000 0000',
                                    }}
                                    cardStyle={{
                                        backgroundColor: '#FFFFFF',
                                        textColor: '#000000',
                                        /*
                                        borderWidth: 1,
                                        backgroundColor: '#FFF',
                                        borderColor: COLOURS.blue,
                                        borderRadius: 8,
                                        fontSize: 16,
                                        borderColor: '#FFC107',

                                       
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 50,
                                        marginVertical: 30,// styles.cardFields
                                    }}
                                    onCardChange={(cardDetails) => {
                                        console.log('cardDetails', cardDetails);
                                    }}
                                    onFocus={(focusedField) => {
                                        console.log('focusField', focusedField);
                                    }}
                                />*/}
                            </View>
                        </View>




                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            height: '8%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={confirmPay}

                            style={{
                                width: '86%',
                                height: '90%',
                                backgroundColor: COLOURS.blue,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    color: COLOURS.white,
                                    textTransform: 'uppercase',
                                }}>
                                CHECKOUT (Rs.{data.pay})
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View >
        </View >
    )
}
const styles = StyleSheet.create({
    defaultButton: {
        padding: 15,
        backgroundColor: '#FFC107',
        borderRadius: 10,
        width: 155,
        height: 55,
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        marginTop: 20,
        paddingHorizontal: 10,
        marginBottom: 100
    },
    body: {
        flex: 9.5,
    },
    footer: {
        flex: 1.5,
        padding: 10
    },
    creditCard: {
        borderWidth: 5,
        backgroundColor: '#FFF',
        marginRight: 10,
        height: 250,
        width: '100%',
        borderRadius: 8,
        fontSize: 16,
        placeholderColor: '#999',
        borderColor: '#D3D3D3'

    },
    input: {
        height: 44,
        fontSize: 17,
        borderColor: '#DEDEDE',
        borderBottomWidth: 1,
        marginBottom: 20,

    }



})
