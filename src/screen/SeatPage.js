import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { colors } from '../global/style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header'
import { RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import DatePicker from 'react-native-date-picker'
var SharedPreferences = require('react-native-shared-preferences');
let selectedSeats = [];
export default function SeatPage(props) {
    const navigation = useNavigation();
    SharedPreferences.setName("logindata");

    //get home selected train details
    var train;
    var isItem = false;
    try {
        train = props.route.params.item
        isItem = true
    } catch (error) {
        isItem = false
    }


    const [total, setTotal] = useState();
    const [qty, setQty] = useState(0);
    // const [fist , setFist] = useState(true);
    // const [secound , setScound ] = useState(false);
    const [classes, setClasses] = useState(0);
    const [select, setSelect] = useState(0)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTotal(getAllSeats() * classes);
    }, [classes])

    useEffect(() => {
        setTotal(getAllSeats() * classes);
    }, [select])

    const [row, setRow] = useState([
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
    ]);


    const [row1, setRow1] = useState([
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: false, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
        { empty: true, selected: false },
    ]);

    const onSelectedRow1 = (index) => {
        let tempRow = [];
        tempRow = row;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true;
                } else {
                    item.selected = true;
                    item.empty = false;
                }
            }
        });


        let tempSeats = [];
        tempRow.map(item => {
            tempSeats.push(item);
        });
        setRow(tempSeats);
        setSelect(tempSeats)
    }

    const onSelectedRow2 = (index) => {
        let tempRow = [];
        tempRow = row1;
        tempRow.map((item, ind) => {
            if (index == ind) {
                if (item.selected == true) {
                    item.selected = false;
                    item.empty = true;
                } else {
                    item.selected = true;
                    item.empty = false;
                }
            }
        });


        let tempSeats = [];
        tempRow.map(item => {
            tempSeats.push(item);
        });
        setRow1(tempSeats);
        setSelect(tempSeats)
    }
    const getAllSeats = () => {
        selectedSeats = [];
        row.map(item => {
            if (item.selected == true) {
                selectedSeats.push(1);
            }
        });

        row1.map(item => {
            if (item.selected == true) {
                selectedSeats.push(1);
            }
        });

        return selectedSeats.length;
    }


    const book = () => {
        //get username
        SharedPreferences.getItem("username", function (username) {
            //set all data to variable and pass it to ConfirmBook screen
            var cls
            if (classes == train.fPrice) {
                cls = "1st"
            } else {
                cls = "2nd"
            }

            const data = { seats: getAllSeats(), class: cls, classPrice: classes, pay: total, id: username, train: train, date: date.toDateString() }
            navigation.navigate('BookOrder', { data });
        });
    }


    const withData = () => {
        return (
            <View style={[styles.globalShadowBox, { marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: '#9172EC' }]}>
                <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 25, fontWeight: 'bold' }}>{train.trainName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginLeft: 10, marginRight: 10 }}>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 20 }}>{train.startPoint}</Text>
                    <Image style={{ width: 50, height: 40 }} source={require('../assest/TicketLogo.png')} />
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 20 }}>{train.endPoint}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginLeft: 50, marginRight: 50 }}>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 20 }}>{train.sTime}</Text>
                    <Text style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 20 }}>{train.eTime}</Text>
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

            <Header title='Booking Page' type="arrowleft" navigation={navigation} ></Header>
            <ScrollView horizontal={false}>
                <View style={{ marginBottom: 50 }}>

                    {isItem ? withData() : withOut()}



                    <View style={[styles.globalShadowBox, { marginBottom: 10, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: '#9172EC' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.HeaderSeatContainer, { width: 30, height: 30 }]}>
                                    <Image source={require('../assest/TrainSeat1.png')} style={{ width: 20, height: 20, borderRadius: 1000 }} />
                                </View>
                                <Text style={{ marginLeft: 10, color: "#FFFFFF" }}>Available</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.HeaderSeatContainer, { width: 30, height: 30 }]}>
                                    <Icon name="lock" size={20} color="brown" />
                                </View>
                                <Text style={{ marginLeft: 10, color: "#FFFFFF" }}>Already Booked</Text>
                            </View>
                        </View>
                    </View>

                    <SafeAreaView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginBottom: 15 }}>

                            <View>

                                <FlatList data={row} numColumns={2} renderItem={({ item, index }) => {
                                    return (
                                        <View style={[styles.HeaderSeatContainer, { width: 30, height: 30, margin: 10 }]}>
                                            <TouchableOpacity onPress={() => {
                                                if (item.selected == false && item.empty == false) {
                                                    alert('already booked');
                                                } else {
                                                    onSelectedRow1(index);

                                                }
                                            }}>
                                                {item.empty == false && item.selected == true ?
                                                    (<Image
                                                        source={require('../assest/TrainSeat1.png')}
                                                        style={{ width: 20, height: 20, borderRadius: 1000, tintColor: 'red' }} />
                                                    ) : item.empty == true && item.selected == false ? (
                                                        <Image source={require('../assest/TrainSeat1.png')}
                                                            style={{ width: 20, height: 20, borderRadius: 1000, }} />
                                                    ) : item.empty == false && item.selected == false ? (
                                                        <Icon name="lock" size={20} color="brown"
                                                            style={{ width: 20, height: 20, borderRadius: 1000, tintColor: 'red' }} />
                                                    ) : null
                                                }
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }}>

                                </FlatList>

                            </View>

                            <View>
                                <FlatList data={row1} numColumns={2} renderItem={({ item, index }) => {
                                    return (

                                        <View style={[styles.HeaderSeatContainer, { width: 30, height: 30, margin: 10 }]}>
                                            <TouchableOpacity onPress={() => {
                                                if (item.selected == false && item.empty == false) {
                                                    alert('already booked');
                                                } else {
                                                    onSelectedRow2(index);
                                                }
                                            }}>
                                                {item.empty == false && item.selected == true ?
                                                    (<Image
                                                        source={require('../assest/TrainSeat1.png')}
                                                        style={{ width: 20, height: 20, borderRadius: 1000, tintColor: 'red' }} />
                                                    ) : item.empty == true && item.selected == false ? (
                                                        <Image source={require('../assest/TrainSeat1.png')}
                                                            style={{ width: 20, height: 20, borderRadius: 1000, }} />
                                                    ) : item.empty == false && item.selected == false ? (
                                                        <Icon name="lock" size={20} color="brown"
                                                            style={{ width: 20, height: 20, borderRadius: 1000, tintColor: 'red' }} />
                                                    ) : null
                                                }
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }}>

                                </FlatList>
                            </View>
                        </View>

                    </SafeAreaView>
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

                        <View style={{ paddingTop: 30 }}>
                            <View style={{ alignItems: 'center', }}>

                                <RadioButton.Group onValueChange={newValue => setClasses(newValue)} value={classes}  >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ marginRight: 20, paddingRight: 10, alignItems: "center" }}>
                                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>First Class ({train.fPrice})</Text>
                                            <RadioButton value={train.fPrice} />
                                        </View>
                                        <View style={{ alignItems: "center" }}>
                                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Second class ({train.sPrice})</Text>
                                            <RadioButton value={train.sPrice} />
                                        </View></View>
                                </RadioButton.Group>

                            </View>
                            <View style={[styles.globalShadowBox, { marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10 }]}>

                                <View style={styles.formInput}>
                                    <TextInput style={styles.textInput} editable={false} placeholder="Selected Ticket" >{'You have selected ' + getAllSeats() + ' Seat '}</TextInput>
                                </View>

                            </View>
                            <View style={[styles.globalShadowBox, { marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10 }]}>

                                <View style={styles.formInput}>
                                    <TextInput style={styles.textInput} placeholder="Selected Ticket" > {total} </TextInput>
                                </View>

                            </View>
                            <View style={[styles.globalShadowBox, { marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 10 }]}>
                                <View style={styles.formInput}>
                                    <Text onPress={() => setOpen(true)} style={styles.dateInput}>Select Date {date.toDateString()}</Text>
                                    <DatePicker style={{ padding: 10 }}
                                        modal
                                        mode="date"
                                        locale='en'
                                        open={open}
                                        date={date}
                                        onConfirm={(date) => {
                                            { console.log(date) }
                                            setOpen(false)
                                            setDate(date)
                                        }}
                                        onCancel={() => {
                                            setOpen(false)
                                        }}
                                    />
                                </View></View>


                            <View style={{ marginBottom: 10, marginTop: 10, alignItems: 'center', }}>
                                <TouchableOpacity style={styles.defaultButton} onPress={() => { book() }} >

                                    <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Book Now</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </View>
            </ScrollView>
        </View>



    )

}
const styles = StyleSheet.create({
    SeatContainer: {
        backgroundColor: colors.buttons,
        padding: 5,
        width: '100%',
        height: '100%',
        borderRadius: 10
    },

    HeaderSeatContainer: {
        backgroundColor: '#a2a2db',
        padding: 5,
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    globalShadowBox: {
        shadowColor: "#B4B4B4",
        shadowOffset: {
            width: 0,
            height: 6,
        },
    },

    container: {
        flex: 1,
    },
    defaultBg: {
        width: '100%',
        height: 130,
    },
    formInput: {
        marginTop: 10,
    },
    dateInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        paddingLeft: 15,
        color: '#FFFFFF',
        padding: 15

    },
    textInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        paddingLeft: 15,
        color: '#FFFFFF'
    },
    defaultButton: {

        padding: 15,
        backgroundColor: '#FFC107',
        borderRadius: 100,
        width: 155,
        height: 55,
    },
    menueContinerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    searchInputContainer: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,

    },

    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,

    },

}
);