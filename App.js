import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import StackNavigation from "./Navigation/StackNavigation";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";
import { UserDataProvider } from "./UserDataContext";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded) {
      hideSplash();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <UserDataProvider>
        <StatusBar />
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </UserDataProvider>
    </>
  );
};

export default App;
