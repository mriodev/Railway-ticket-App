import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, Platform } from 'react-native'
import { colors, parameters, title } from '../../global/style'
import { Icon, Button, SocialIcon } from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import Header from '../../component/Header'

export default function SignInScreen(navigation) {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header title='Login' type="arrow-left" navigation={navigation}></Header>
            <ImageBackground
                source={require('../../assest/bgapp.jpg')} style={{
                    height: Dimensions.get('window').height / 2.1, width: Dimensions.get('screen').width / 1, backgroundColor: 'rgb(255,0,0)'
                }}>
                <View style={styles.overlayviews}>
                    <Text style={styles.logoviewText}>Train Reservation </Text>
                </View>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: 40, paddingBottom: 0 }}>
                    <Text style={{ color: '#4632A1', fontSize: 40, fontWeight: "700", textAlign: 'center' }}>Welcome Back</Text>
                    <Text style={{ color: '#18191A', fontSize: 16, textAlign: 'center' }}>Log in to your existant account</Text>
                </View>

                <View style={{ padding: 10 }}>
                    <TextInput style={styles.Textinput}
                        mode="outlined"
                        label="Email"

                    />
                    <TextInput style={styles.Textinput}
                        mode="outlined"
                        label="Password"
                    />
                </View>
                <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
                    <Text style={{ ...styles.text1, textDecorationLine: "underline" }}> Forgot Password?</Text>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                    <Button title="Sign In"
                        buttonStyle={parameters.styleButton}
                        titleStyle={parameters.buttonTitle}
                        onPress={() => (navigation.navigate('HomeScreen'))}>

                    </Button>

                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>

                    <Text style={{ ...styles.text1 }}> Or Connect using</Text>

                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                    <SocialIcon title=' Facebook' button type='facebook' style={{ ...styles.SocialIcon }}></SocialIcon>
                    <SocialIcon title=' Google' button type='google' style={{ ...styles.SocialIcon }}></SocialIcon>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 20, }}>
                    <Text style={{ ...styles.text1, fontSize: 20, fontWeight: "600" }}>Don't Have an account? </Text>
                    <Text style={{ ...styles.text1, fontSize: 20, fontWeight: "600", marginLeft: 5 }}>Sign Up</Text>
                </View>

            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    overlayviews: {
        backgroundColor: 'rgba(21, 84, 211, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',

        flex: 1,
    },
    text1: {
        color: '#18191A',
        fontSize: 16
    },

    logoviewText: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold',
        bottom: 80,
        textTransform: 'uppercase'
    },

    SocialIcon: {
        borderRadius: 12,
        height: 50,
    },
    createButton: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 20,
        borderColor: "#ffac52",

    },
    createButtonTitle: {
        color: "#ff8c52",
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 200,
        marginTop: 40,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    Textinput: {
        height: Math.max(55),
        marginTop: 5,
        marginHorizontal: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10
    },
    SocialIcon: {
        borderRadius: 12,
        height: 50
    },

})