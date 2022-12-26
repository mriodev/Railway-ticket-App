import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native'
import { CardField } from '@stripe/stripe-react-native';
export default function PaymentStripe() {
    const [success, setSuccess] = useState(false);
    return (
        <View>
            <TextInput
                autoCapitalize='none'
                placeholder='Name on Card'
                keyboardType='name-phone-pad'
                placeholderTextColor="#AFAFAF"
                style={{
                    height: 44,
                    fontSize: 17,
                    borderColor: '#DEDEDE',
                    borderBottomWidth: 1,
                    placeholderTextColor: '#000000'
                }}>

            </TextInput>
            <CardField
                postalCodeEnabled={false}
                placeholders={{
                    number: '0000 0000 0000 0000',
                    textColor: '#000000',
                }}
                cardStyle={{
                    textColor: '#000000',
                    placeholderColor: '#AFAFAF'
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    setSuccess(true);
                }}
                onFocus={(focusedField) => {
                    setSuccess(false);
                }}
            />
        </View>
    )
}