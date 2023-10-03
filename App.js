import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FrontPage from "./Screens/FrontPage/FrontPage";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import LoginRegister from "./Screens/LoginRegister/LoginRegister";
import SignUP from "./Screens/SignUp/SignUP";
import WelcomeBack from "./Screens/LogIn/WelcomeBack";
import VerifyLogin from "./Screens/OTAthentication/VerifyLogin";
import EmailRecovery from "./Screens/Password Recovery/EmailRecovery";
import PhoneRecovery from "./Screens/Password Recovery/PhoneRecovery";
import NewPassword from "./Screens/Password Recovery/NewPassword";
import ForgotPassword from "./Screens/Password Recovery/ForgotPassword";
import LodingPage from "./Screens/LodingPage/LodingPage";
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
    "Montserrat-ExtraBold": require("./assets/font/Montserrat-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <NavigationContainer onLayout={onLayoutRootView} >
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="FrontPage"
          component={FrontPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginRegister"
          component={LoginRegister}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="SignUP"
          component={SignUP}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="WelcomeBack"
          component={WelcomeBack}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="VerifyLogin"
          component={VerifyLogin}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="EmailRecovery"
          component={EmailRecovery}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PhoneRecovery"
          component={PhoneRecovery}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="NewPassword"
          component={NewPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LodingPage"
          component={LodingPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
