import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../../apiconfig.js";

const VerifyLogin = () => {
  const navigation = useNavigation();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [useremail, setUseremail] = useState("");
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const goBack = () => {
    navigation.goBack();
  };

  const handleVerificationError = (errorMessage) => {
    Alert.alert("Error", errorMessage);
  };
  console.log("user_email", useremail);
  useEffect(() => {
    const getUserID = async () => {
      const value = await AsyncStorage.getItem("email");
      console.log("value", value);
      if (value !== null) {
        setUseremail(value);
      }
    };
    getUserID();
  }, []);
  /////API INTEGRATE
  const handleVerifyCode = async () => {
    try {
      if (!otp1 || !otp2 || !otp3 || !otp4) {
        handleVerificationError("Please enter a valid OTP");
        return;
      }
      const apiUrl = `${ApiData.url}/api/v1/user/verify/`;
      const requestData = {
        otp: otp1 + otp2 + otp3 + otp4,
      };
      await axios
        .post(apiUrl, requestData)
        .then(async (response) => {
          console.log(response);
          navigation.navigate("BottomTabsNavigator");
          // navigation.navigate("UploadFrontpage");
        })
        .catch((error) => {
          console.log(error);
          handleVerificationError("Invalid OTP: Please try again");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      const apiUrl = `${ApiData.url}/api/v1/user/resend-otp/`;
      const resendRequestData = {
        email: useremail,
      };
      await axios
        .post(apiUrl, resendRequestData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const focusNextInput = (index) => {
    if (index < otpInputRefs.length - 1 && otpInputRefs[index].current) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleInputChange = (text, index) => {
    if (/^[0-9]*$/.test(text)) {
      switch (index) {
        case 0:
          setOtp1(text);
          break;
        case 1:
          setOtp2(text);
          break;
        case 2:
          setOtp3(text);
          break;
        case 3:
          setOtp4(text);
          break;
        default:
          break;
      }

      if (text !== "") {
        focusNextInput(index);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#EEF7FE", "#FCEEFE"]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0.6, y: 0.6 }}
          style={{
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        >
          <View style={styles.headerContainer}>
            <View style={{ marginHorizontal: 24, paddingTop: wp(15) }}>
              <TouchableOpacity style={styles.backbut} onPress={goBack}>
                <Ionicons
                  name="ios-chevron-back-sharp"
                  size={28}
                  color="#670097"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#122359",
                  marginBottom: 5,
                }}
              >
                Verify Login
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#3D3D3D",
                }}
              >
                Enter OTP Code sent to your email.
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#3D3D3D",
                }}
              >
                The code will expire in 01:30
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingTop: wp(9),
          }}
        >
          {Array.from({ length: 4 }, (_, index) => (
            <KeyboardAvoidingView
              key={index}
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  ref={otpInputRefs[index]}
                  style={{
                    ...styles.inputField,
                    fontSize: 24,
                    fontFamily: "Roboto-Regular",
                    fontWeight: "600",
                    color: "#122359",
                  }}
                  onChangeText={(text) => handleInputChange(text, index)}
                  value={
                    index === 0
                      ? otp1
                      : index === 1
                      ? otp2
                      : index === 2
                      ? otp3
                      : otp4
                  }
                  placeholderTextColor="#3D3D3D"
                  keyboardType="phone-pad"
                  maxLength={1}
                />
              </View>
            </KeyboardAvoidingView>
          ))}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 30,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#3D3D3D",
            }}
          >
            Didn’t receive the code?
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "400",
                color: "#346AFE",
              }}
            >
              {" "}
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: hp("25%"),
    width: wp("100%"),
  },
  backbut: {
    height: hp("5.5%"),
    width: wp("11%"),
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  inputField: {
    height: hp("8%"),
    width: wp("15%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#F3F4FF",
    marginBottom: wp("5%"),
    backgroundColor: "#F3F4FF",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
  button: {
    width: wp("88%"),
    height: hp("7%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#346AFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#346AFE",
    alignSelf: "center",
    marginTop: hp("48%"),
  },
});

//  {"email": "raheelkhn96@gmail.com ",
//  "name": "Sparksync", "password": "1234",
//  "phone_number": "03034040912"}
