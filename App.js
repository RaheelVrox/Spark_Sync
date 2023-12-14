import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import StackNavigation from "./Navigation/StackNavigation";
import { StatusBar } from "expo-status-bar";

// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();

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
    <>
      <StatusBar />
      <NavigationContainer onLayout={onLayoutRootView}>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;
