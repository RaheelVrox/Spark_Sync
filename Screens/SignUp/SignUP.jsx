import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../../apiconfig";

const SignUP = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    navigation.goBack();
  };
  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim();
    // Update the state with the trimmed email
    setEmail(trimmedEmail.toLowerCase());
  };
  const handleSignUp = async () => {
    try {
      if (!name || !email || !phone_number || !password) {
        Alert.alert("Error", "Please enter all required details");
        return;
      }

      if (password.length < 8) {
        Alert.alert("Error", "Password must be at least 8 characters long");
        return;
      }

      const apiUrl = `${ApiData.url}/api/v1/user/register/`;
      const requestData = {
        name,
        email,
        phone_number,
        password,
      };
      await axios
        .post(apiUrl, requestData)
        .then(async (response) => {
          console.log("signup_data::", response.data);

          if (response.data.message === "User with this email already exist!") {
            Alert.alert("Error", response.data.message);
          } else {
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(response.data.newUser)
            );
            console.log("response", response);
            navigation.navigate("RegistrationVerify");
          }
        })
        .catch((error) => {
          console.log(error);

          console.log("error", error);

          const errorMessage =
            error.response?.data?.message ||
            "Account already exists use a different email.";
          Alert.alert("Error", errorMessage);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
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
              <View
                style={{
                  flex: 1,
                  flexDirection: "coloum",
                  marginLeft: 24,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
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
              paddingTop: wp(5),
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
                Name
              </Text>
              <TextInput
                placeholder="Your name"
                style={{
                  ...styles.inputField,
                  fontSize: 16,
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  color: "#122359",
                }}
                value={name}
                onChangeText={(text) => setName(text)}
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
                Email
              </Text>
              <TextInput
                placeholder="Your email address"
                style={{
                  ...styles.inputField,
                  fontSize: 16,
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  color: "#122359",
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
                Phone
              </Text>
              <TextInput
                placeholder="Your phone number"
                style={{
                  ...styles.inputField,
                  fontSize: 16,
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  color: "#122359",
                }}
                value={phone_number}
                onChangeText={(text) => setPhoneNumber(text)}
                maxLength={11}
                placeholderTextColor="#858585"
                keyboardType="phone-pad"
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
              <View
                style={{
                  ...styles.inputField,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Your password"
                  style={{
                    // ...styles.inputField,
                    width: wp(73),
                    fontSize: 16,
                    fontFamily: "Roboto-Regular",
                    fontWeight: "400",
                    color: "#122359",
                  }}
                  value={password}
                  onChangeText={(text) => setPassword(text.replace(/\s/g, ""))}
                  placeholderTextColor="#858585"
                />
                <MaterialCommunityIcons
                  name={showPassword ? "eye" : "eye-off"}
                  size={26}
                  color="#346AFE"
                  style={
                    {
                      // position: "absolute",
                      // alignSelf: "flex-end",
                      // padding: 18,
                    }
                  }
                  onPress={toggleShowPassword}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "Roboto-Regular",
                color: "#fff",
              }}
            >
              Create Account
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
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomeBack")}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#346AFE",
                }}
              >
                {" "}
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    height: hp("7%"),
    width: wp("88%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEF7FE",
    marginBottom: wp(4),
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

export default SignUP;
