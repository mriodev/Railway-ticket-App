import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react'
import WelcomeScreen from '../screen/authScreen/WelcomeScreen';
import SignInScreen from '../screen/authScreen/SignInScreen';
import HomeScreen from '../screen/Home';
import LoginPage from '../screen/authScreen/LoginScreen';
import RegisterPage from '../screen/SignUpPage';
import BottomNavigation from './BottomNavigation';
import ConfirmBook from '../screen/ConfirmBook';
import Payment from '../screen/Payment';
import MyCard from '../screen/Card/MyCard';
import SeatPage from '../screen/SeatPage';
import Schedule from '../screen/Schedule';
import OrderPage from '../screen/OrderPage';
const Auth = createStackNavigator();
export default function AuthStack() {
    return (
        <Auth.Navigator>
            <Auth.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />

            <Auth.Screen
                name="LoginPage"
                component={LoginPage}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />
            <Auth.Screen
                name="RegisterPage"
                component={RegisterPage}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />

            <Auth.Screen
                name="Index"
                component={BottomNavigation}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />

            <Auth.Screen
                name="BookOrder"
                component={ConfirmBook}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />

            <Auth.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />
            <Auth.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />
            <Auth.Screen
                name="SeatPage"
                component={SeatPage}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />
            <Auth.Screen
                name="MyCard"
                component={MyCard}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />


            <Auth.Screen
                name="OrderPage"
                component={OrderPage}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }} />
        </Auth.Navigator>
    )
}