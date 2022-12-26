import { useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, ScrollView, Alert, ImageBackground, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import Header from '../component/Header'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, parameters, title } from '../global/style'
import { Button } from '@rneui/themed';
import firestore, { doc, setDoc, usersRef } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const RegisterPage = () => {
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredemail] = useState('');
    const [enteredPhoneNumber, setEnteredphonenumber] = useState('');
    const [enteredPassword, setEnteredpassword] = useState('');
    const usersRef = firestore().collection('customers');
    const navigation = useNavigation();
    UserRegister = () => {

        if (!enteredFirstName.trim() && !enteredLastName.trim() && !enteredEmail.trim() && !enteredPhoneNumber.trim() && !enteredPassword.trim()) {
            Alert.alert(
                "Error",
                'Please fill all details');
            return;
        }
        //create new user with google auth
        auth()
            .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
            .then((userCredential) => {
                //set firestore data
                var user = userCredential.user
                usersRef.doc(user.uid)
                    .set({
                        id: user.uid,
                        firstname: enteredFirstName,
                        lastname: enteredLastName,
                        email: enteredEmail,
                        phone: enteredPhoneNumber
                    })
                    .then(() => {
                        Alert.alert(
                            "Successfull",
                            "Your Account is Created. Please Login Your Account",
                            [
                                { text: "OK", onPress: () => navigation.navigate('LoginPage') }
                            ]
                        );
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        "used!!",
                        "That email address is already in use!",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );

                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Invalid!",
                        "That email address is invalid!",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            });
    };

    return (
        <SafeAreaView>
            <Header title='Register' type="arrowleft" navigation={navigation} ></Header>
            <ImageBackground
                source={require("../assest/back.png")}
                style={{ height: Dimensions.get('window').height / 1, width: Dimensions.get('screen').width / 1, }}
            >

                <ScrollView>
                    <View style={{ paddingTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                        <Image source={require('../assest/add.png')} style={{ width: 130, height: 130, borderRadius: 1000, }} />

                    </View>

                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} value={enteredFirstName} onChangeText={text => setEnteredFirstName(text)} placeholderTextColor="#1C1C1C" placeholder="Your First Name" />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} value={enteredLastName} onChangeText={text => setEnteredLastName(text)} placeholderTextColor="#1C1C1C" placeholder="Your Last Name" />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} value={enteredEmail}
                            onChangeText={text => setEnteredemail(text)} placeholder="Your Email Address" />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} value={enteredPhoneNumber}
                            onChangeText={text => setEnteredphonenumber(text)} placeholder="Your Phone No" />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} value={enteredPassword} onChangeText={text => setEnteredpassword(text)} placeholder="Password" secureTextEntry={true} />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput style={styles.textInput} placeholder="Confirm Password" secureTextEntry={true} />
                    </View>


                    <View style={styles.formInput}>
                        <Button title="Sign In"
                            buttonStyle={parameters.styleButton}
                            titleStyle={parameters.buttonTitle}
                            onPress={UserRegister}>

                        </Button>
                    </View>
                    <View style={styles.formInput}>
                        <View style={{ height: 1, backgroundColor: '#ddd', width: '100%' }}></View>
                    </View>
                    <View style={styles.formInput}>
                        <TouchableOpacity onPress={() => { navigation.navigate('LoginPage') }}>
                            <Text style={{ color: "#ffffff", textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Already Have Account? Login</Text>
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
        color: "#000",
        placeholderTextColor: "#000"

    },
    defaultButton: {
        padding: 15,
        backgroundColor: '#a2a2db',
        borderRadius: 20,
    },


});

export default RegisterPage;