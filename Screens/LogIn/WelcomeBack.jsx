import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../../apiconfig";

const WelcomeBack = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
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

  const handleLogin = async () => {
    console.log("dsadsadsadsadsadssad");

    try {
      // Basic validation to check if each part is not empty
      if (!email) {
        handleVerificationError("Please enter your email.");
        return;
      }

      if (!password) {
        handleVerificationError("Please enter your password.");
        return;
      }

      const apiUrl = `${ApiData.url}/api/v1/user/login/`;
      const requestData = {
        email,
        password,
      };
      console.log("requestData", requestData);

      await axios
        .post(apiUrl, requestData)
        .then((res) => {
          console.log("logindata__:", res.data.user);
          AsyncStorage.setItem("userData", JSON.stringify(res.data.user));
          navigation.navigate("VerifyLogin");
        })
        .catch((error) => {
          console.log(error);
          // Handle other errors if needed
          handleVerificationError(
            "Invalid email or password. Please try again"
          );
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
              {/* <TouchableOpacity style={styles.backbut} onPress={goBack}>
                <Ionicons
                  name="ios-chevron-back-sharp"
                  size={28}
                  color="#670097"
                />
              </TouchableOpacity> */}
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 24,
                  fontWeight: "600",
                  color: "#122359",
                  marginBottom: 5,
                }}
              >
                Welcome Back
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#3D3D3D",
                }}
              >
                Enter your email address and password
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
                color: "#122359",
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Roboto-Regular",
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="Your email address"
              style={{
                ...styles.inputField,
                fontSize: 16,
                fontFamily: "Roboto-Regular",
                fontWeight: "400",
                color:"#122359"
              }}
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              placeholderTextColor="#858585"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text
              style={{
                marginBottom: 10,
                color: "#122359",
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Roboto-Regular",
              }}
            >
              Password
            </Text>
            <View>
              <TextInput
                secureTextEntry={!showPassword}
                style={{
                  ...styles.inputField,
                  fontSize: 16,
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  color:"#122359"
                }}
                value={password}
                onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                placeholder="Your password"
                placeholderTextColor="#858585"
              />
              <MaterialCommunityIcons
               name={showPassword ? "eye" : "eye-off"}
                size={26}
                color="#346AFE"
                style={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  padding: 18,
                }}
                onPress={toggleShowPassword}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginHorizontal: 27,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                marginBottom: 10,
                color: "#346AFE",
                fontWeight: "600",
                fontSize: 14,
                fontFamily: "Roboto-Regular",
              }}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: wp(5),
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "600",
              color: "#3D3D3D",
            }}
          >
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUP")}>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "600",
                color: "#346AFE",
              }}
            >
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    flexDirection: "row",
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
    marginTop: wp(55),
  },
});

export default WelcomeBack;
