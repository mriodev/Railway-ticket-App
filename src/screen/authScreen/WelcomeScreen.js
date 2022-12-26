import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed'
import { View, SafeAreaView, Text, ImageBackground, Image } from 'react-native'
import { colors, parameters, title } from '../../global/style'
import React, { useEffect, useState } from "react";
var SharedPreferences = require('react-native-shared-preferences');

export default function WelcomeScreen() {
    const [isGo, setIsGo] = useState(true);
    const Navigation = useNavigation();
    SharedPreferences.setName("logindata");
    useEffect(() => {
        if (isGo == true) {
            setTimeout(() => {
                // check login user
                SharedPreferences.getItem("username", function (value) {
                    console.log(value);
                    if (value != null) {
                        //go home
                        Navigation.navigate('Index');
                    } else {
                        //go login
                        Navigation.navigate('LoginPage');
                    }
                    setIsGo(false);
                });

            }, 2000)

        }
    });
    return (
        <SafeAreaView>
            <ImageBackground
                source={require("../../assest/back.png")}
                style={{ width: "100%", height: "110%", }}
            >


                <View style={{ paddingTop: 230, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <Image source={require('../../assest/Logo.png')} style={{ width: 200, height: 210, borderRadius: 1000, marginBottom: 30 }} />


                </View>
                <View>
                    <Text style={{ color: "#fff", fontSize: 60, fontFamily: 'times', textAlign: "center", fontWeight: 'bold' }}>Train Booking</Text>
                    <Button title="Get Started"
                        buttonStyle={parameters.styleButton}
                        titleStyle={parameters.buttonTitle}
                        onPress={() => (Navigation.navigate('LoginPage'))}>

                    </Button>
                </View>






            </ImageBackground>
        </SafeAreaView>
    )
}