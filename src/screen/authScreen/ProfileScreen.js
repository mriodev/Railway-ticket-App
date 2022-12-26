import { View, Button, Text, StyleSheet, ScrollView, TouchableOpacity, Image, } from 'react-native';
import React from 'react';
import { Icon, withBadge } from '@rneui/themed'
import { GlobalBackgroundColors, GlobalBackgroundTextColors, globalShadowBox, } from '../../component/Container/global';
// Importing Container
import SimpleContainer from '../../component/Container/SimpleContainer';

function Slider() {
    return (
        <View
            style={{ height: '80%', marginTop: 'auto', marginBottom: 'auto' }}></View>
    );
}

export default function Home(navigation) {
    return (
        <View style={{ flex: 1 }}>
            <SimpleContainer
                isBottomVisible={true}
                headerContent={<Slider></Slider>}
                BottomRightText="Logout">
                {/* Profile */}
                <View style={[globalShadowBox, styles.userInfoContainer]}>
                    {/* Profile Person Detail */}
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexDirection: 'row',
                        }}>
                        <View style={{ marginRight: 10 }}></View>
                        <View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: GlobalBackgroundTextColors.textBoxColor,
                                }}></Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: GlobalBackgroundTextColors.textBoxColor,
                                }}>
                                01748
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Options */}
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.menueContinerStyle}>
                        <Button iconName="ios-lock" title="Book Seat">
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}> </View>
                        </Button>
                        <Button iconName="ios-lock" title="My Booking">
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}></View>
                        </Button>
                    </View>
                    <View style={styles.menueContinerStyle}>
                        <Button iconName="ios-lock" title="My Ticket">
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}></View>
                        </Button>
                    </View>
                    <View style={styles.menueContinerStyle}>
                        <Button iconName="ios-lock" title="Refund">
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}></View>
                        </Button>
                        <Button iconName="ios-lock" title="Complain">
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}></View>
                        </Button>
                    </View>
                </ScrollView>
            </SimpleContainer>
        </View>
    );
}
const styles = StyleSheet.create({
    userInfoContainer: {
        backgroundColor: GlobalBackgroundColors.ternaryColor,
        width: '90%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: -30,
        paddingLeft: 10,
        borderBottomColor: GlobalBackgroundColors.primaryColor,
        borderBottomWidth: 5,
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
    },
    menueContinerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    bottomLink: {
        color: GlobalBackgroundColors.secondaryColor,
        fontWeight: 'bold',
    },

    item: {
        borderWidth: 2,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 3,
    },
    imageBackground: {
        flex: 2,
        backgroundColor: '#EBEBEB',
        borderWidth: 5,
        borderColor: 'white',
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        backgroundColor: 'rgba(49, 49, 51,0.5)',
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    rightText: { color: 'white' },
    lowerContainer: {
        flex: 1,
        margin: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    contentText: {
        fontSize: 12,
    },
});
