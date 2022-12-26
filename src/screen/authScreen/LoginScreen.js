import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button } from '@rneui/themed';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, ImageBackground, TextInput, Alert, TouchableOpacity, Image, Dimensions } from 'react-native'
import { parameters } from '../../global/style'
import auth from '@react-native-firebase/auth';

var SharedPreferences = require('react-native-shared-preferences');

const LoginPage = () => {
    SharedPreferences.setName("logindata");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    userLogin = () => {
        if (!email.trim()) {
            Alert.alert(
                "Error",
                'Please Enter Email');
            return;
        }
        else if (!this.validateEmail(email)) {
            Alert.alert(
                "Format Error",
                'Email Address is not in a valid format');
            return;
        }
        else if (!password.trim()) {
            Alert.alert('Please Enter password');
            return;
        }
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user
                // set login user
                SharedPreferences.setItem("username", user.uid);
                // go home
                navigation.navigate('Index');
            })
            .catch(error => {
                Alert.alert(
                    "WRONG",
                    "Please Enter Valied Details",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );

            })

    }

    return (
        <SafeAreaView>
            <ImageBackground
                source={require("../../assest/back.png")}
                style={{ height: Dimensions.get('window').height / 1, width: Dimensions.get('screen').width / 1, }}
            >

                <ScrollView>
                    <View style={{ paddingTop: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                        <Image source={require('../../assest/Logo.png')} style={{ width: 160, height: 160, borderRadius: 1000, }} />

                    </View>
                    <View >
                        <Text style={{ color: '#4632A1', fontSize: 26, padding: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 }}>Book Your Ticket Here!</Text>
                    </View>
                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} placeholder="Your Email Address" value={email} onChangeText={text => setEmail(text)} />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} />
                    </View>
                    <View style={styles.formInput}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Forgot") }}>
                            <Text style={{ color: "#db2218", textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formInput}>

                        <Button title="Sign In"
                            buttonStyle={parameters.styleButton}
                            titleStyle={parameters.buttonTitle}
                            onPress={userLogin}>

                        </Button>


                    </View>
                    <View style={styles.formInput}>
                        <Text style={{ color: "#fff", textAlign: 'center' }}>Or</Text>
                    </View>

                    <View style={styles.formInput}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: 10 }} >
                                <Image source={require('../../assest/google.png')} style={{ width: 30, height: 30, borderRadius: 1000, }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <Image source={require('../../assest/facebook.png')} style={{ width: 32, height: 32, borderRadius: 1000, }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formInput}>
                        <View style={{ height: 1, backgroundColor: '#ddd', width: '100%' }}></View>
                    </View>
                    <View style={styles.formInput}>
                        <TouchableOpacity onPress={() => { navigation.navigate("RegisterPage") }}>
                            <Text style={{ color: "#fff", textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>New to here? Register</Text>


                        </TouchableOpacity>
                    </View>


                </ScrollView>


            </ImageBackground>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
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
        borderRadius: 10,
        color: '#fff',
    },
    defaultButton: {
        padding: 15,
        backgroundColor: '#a2a2db',
        borderRadius: 20,
    },


});

export default LoginPage;