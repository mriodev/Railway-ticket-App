import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
import { colors, parameters, title } from '../global/style'
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SectionList, FlatList } from 'react-native'
let selectedSeats = [];
export default function SeatList(props) {

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
    }
    const getAllSeats = () => {
        selectedSeats = [];
        row.map(item => {
            if (item.selected == true) {
                selectedSeats.push(1);
            }
        });
        return selectedSeats.length;
    }

    return (
        <View>
            <FlatList horizontal={false} data={row} numColumns={2} renderItem={({ item, index }) => {
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
                                    style={{ width: 20, height: 20, borderRadius: 1000, tintColor: '#FFC107' }} />
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
        padding: 5,
    },

    textInput: {
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "a7a7a7a",
        borderRadius: 10,
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