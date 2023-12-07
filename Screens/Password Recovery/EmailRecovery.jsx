import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ApiData from "../../apiconfig";

const EmailRecovery = () => {
  const [identifier, setEmail] = useState("");
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const handleEmailChange = (text) => {
    // Remove leading and trailing spaces from the entered email
    const trimmedEmail = text.trim();
    // Update the state with the trimmed email
    setEmail(trimmedEmail.toLowerCase());
  };
  const handleVerificationError = (errorMessage) => {
    // Display an error message to the user
    Alert.alert("Error", errorMessage);
  };
  const handleResetPasword = async () => {
    try {
      // Basic validation to check if each part is not empty
      if (!identifier) {
        handleVerificationError("Please enter your email.");
        return;
      }
      const apiUrl = `${ApiData.url}/api/v1/user/forgot-password/`;
      const requestData = {
        identifier,
      };
      console.log("requestData", requestData);
      await axios
        .post(apiUrl, requestData)
        .then(async (response) => {
          console.log(response.data);
          await AsyncStorage.setItem("email", identifier);
          navigation.navigate("PasswordVerify");
        })
        .catch((error) => {
          console.log(error);
          // Handle other errors if needed
          handleVerificationError("Invalid email. Please try again");
        });
    } catch (error) {
      console.error("Error:", error);
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
                  color: "#0D3559",
                  marginBottom: 5,
                }}
              >
                Reset Password
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#0D3559",
                }}
              >
                Enter your email and we will send you a code to reset your
                password.
              </Text>
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            paddingTop: wp(9),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text
              style={{
                marginBottom: 10,
                color: "#0D3559",
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Roboto-Regular",
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="Your Email Address"
              style={styles.inputField}
              value={identifier}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              placeholderTextColor="#3D3D3D"
            />
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleResetPasword}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Send OPT
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailRecovery;

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
    height: hp("7%"),
    width: wp("88%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#F3F4FF",
    marginBottom: wp("5%"),
    paddingLeft: wp(4),
    backgroundColor: "#F3F4FF",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
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
    marginTop: 20,
  },
});
