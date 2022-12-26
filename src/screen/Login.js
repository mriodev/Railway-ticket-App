import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import * as Animatabe from 'react-native-animatable'
import { GlobalBackgroundColors, GlobalBackgroundTextColors, primaryButton, globalShadowBox, FontFamily, } from '../component/Container/global';
import { Icon, SocialIcon } from 'react-native-vector-icons/FontAwesome'
import { Button } from '@rneui/themed';
import { colors, parameters, title } from '../global/style'

export default function Login() {
  const [data, setData = []] = useState('');
  const [textInput2Fossued, setText2Fossued] = useState(false)
  const TextInput1 = useRef(1)
  const TextInput2 = useRef(2)

  return (
    <View style={[FontFamily.NormalFont, { flex: 1, backgroundColor: GlobalBackgroundColors.primaryColor }]}>
      <View style={{ flex: 25 }}>
        <Text style={[styles.title, FontFamily.TitleFont]}>Login</Text>
      </View>
      <View style={styles.contentArea}>
        <View style={styles.contentArea}>
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text style={title}>Sign In</Text>

          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>

          </View>
          <View>

            <View style={styles.TextInput2} >
              <Icon
                name="email"
                iconStyle={{ color: colors.grey3 }}
              ></Icon>
              <TextInput
                style={{ width: "90%", color: '#fff' }}
                placeholder='Email'
                placeholderTextColor="#fff"
                ref={TextInput1}

              />

            </View>
            <View style={styles.TextInput2}>
              <Animatabe.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400}>

                <Icon
                  name="lock"
                  iconStyle={{ color: colors.grey3 }}
                ></Icon>
              </Animatabe.View>
              <TextInput

                style={{ width: "80%" }}
                placeholder='Password'
                placeholderTextColor="#ccc"
                ref={TextInput2}
                onFocus={() => {
                  setText2Fossued(false)
                }}
                onBlur={() => {
                  setText2Fossued(true)
                }}
              />
              <Animatabe.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400}>

                <Icon
                  name="visibility-off"
                  iconStyle={{ color: colors.grey3 }}
                  type="material"
                  style={{ marginRight: 10 }}></Icon>

              </Animatabe.View>

            </View>

          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
            <Button title="Sign In"
              buttonStyle={parameters.styleButton}
              titleStyle={parameters.buttonTitle}
              onPress={() => (navigation.navigate('RootClient'))}>

            </Button>
          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>

            <Text style={{ ...styles.text1, textDecorationLine: "underline" }}> Forgo Password?</Text>

          </View>


        </View>
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: GlobalBackgroundTextColors.primaryColor,
  },
  linkBottom: {
    color: GlobalBackgroundColors.secondaryColor,
    fontWeight: 'bold',
  },
  stretch: {
    minWidth: 90,
    minHeight: 80,
    marginBottom: 10,
  },
  contentArea: {
    backgroundColor: GlobalBackgroundColors.ternaryColor,
    flex: 65,
    borderTopEndRadius: 100,
    paddingTop: 30,
  },

  text1: {
    color: colors.grey4,
    fontSize: 16
  },

  TextInput1: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 15,

  },
  TextInput2: {
    placeholderTextColor: "#ccc",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 15,

  },
  SocialIcon: {
    borderRadius: 12,
    height: 50
  },
  createButton: {
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#E32828",

  },
  createButtonTitle: {
    color: "#E32828",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1
  }

});
