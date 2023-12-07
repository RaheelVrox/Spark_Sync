import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../../apiconfig";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserdata] = useState("");
  const navigation = useNavigation();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const goBack = () => {
    navigation.goBack();
  };
  const handleVerificationError = (errorMessage) => {
    // Display an error message to the user
    Alert.alert("Error", errorMessage);
  };
  console.log("user_id", userdata);
  useEffect(() => {
    const getUserID = async () => {
      const value = await AsyncStorage.getItem("email");
      console.log("value", value);
      if (value !== null) {
        setUserdata(value);
      }
    };
    getUserID();
  }, []);

  const handlePasswordUpdate = async () => {
    try {
      // Basic validation to check if each part is not empty
      if (!newPassword) {
        handleVerificationError("Please enter your newpassword.");
        return;
      }
      if (!confirmPassword) {
        handleVerificationError("Please enter your confirmpassword.");
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match. Please try again.");
        return;
      }
      if (newPassword.length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters long");
        return;
      }
      const apiUrl = `${ApiData.url}/api/v1/user/reset-password/`;
      const requestData = {
        email: userdata,
        newPassword,
        confirmPassword,
      };
      console.log("requestData", requestData);
      await axios
        .post(apiUrl, requestData)
        .then((response) => {
          console.log(response.data);
          // await AsyncStorage.setItem("userData", JSON.stringify(response.data));
          navigation.navigate("WelcomeBack");
        })
        .catch((error) => {
          console.log(error);
          // Handle other errors if needed
          handleVerificationError(" Please try again");
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
                Enter your new password
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
              New Password
            </Text>
            <View>
              <TextInput
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text.replace(/\s/g, ""))}
                style={styles.inputField}
                placeholder="Your Password"
                placeholderTextColor="#3D3D3D"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
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
              Enter Again
            </Text>
            <View>
              <TextInput
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={(text) =>
                  setConfirmPassword(text.replace(/\s/g, ""))
                }
                style={styles.inputField}
                placeholder="Your Password"
                placeholderTextColor="#3D3D3D"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
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
        <TouchableOpacity style={styles.button} onPress={handlePasswordUpdate}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewPassword;

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
    flexDirection: "row",
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
    marginTop: wp(77),
  },
});
