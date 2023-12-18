import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FrontPage from "../Screens/FrontPage/FrontPage";
import LoginRegister from "../Screens/LoginRegister/LoginRegister";
import SignUP from "../Screens/SignUp/SignUP";
import WelcomeBack from "../Screens/LogIn/WelcomeBack";
import VerifyLogin from "../Screens/OTAthentication/VerifyLogin";
import EmailRecovery from "../Screens/Password Recovery/EmailRecovery";
import PhoneRecovery from "../Screens/Password Recovery/PhoneRecovery";
import NewPassword from "../Screens/Password Recovery/NewPassword";
import ForgotPassword from "../Screens/Password Recovery/ForgotPassword";
import UploadFrontpage from "../Screens/ScanPages/UploadFrontpage";
import UploadBackpage from "../Screens/ScanPages/UploadBackpage";
import PasswordVerify from "../Screens/OTAthentication/PasswordVerify";
import RegistrationVerify from "../Screens/OTAthentication/RegistrationVerify";
import UpdateFrontImage from "../Screens/ScanPages/UpdateFrontImage";
import UpdateBackImage from "../Screens/ScanPages/UpdateBackImage";
import BottomTabsNavigator from "./BottomTabsNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmationPage from "../Screens/ConfirmationPage/ConfirmationPage";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");

        setUserData(data);
      } catch (error) {
        // console.log(error);
      }
    };
    getUserData();
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="FrontPage"
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      {userData === null ? (
        <>
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
            name="RegistrationVerify"
            component={RegistrationVerify}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PasswordVerify"
            component={PasswordVerify}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UploadFrontpage"
            component={UploadFrontpage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UpdateFrontImage"
            component={UpdateFrontImage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UploadBackpage"
            component={UploadBackpage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UpdateBackImage"
            component={UpdateBackImage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ConfirmationPage"
            component={ConfirmationPage}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginRegister"
            component={LoginRegister}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
export default StackNavigation;
