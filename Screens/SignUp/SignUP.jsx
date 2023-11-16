import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUP = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const apiUrl = "http://192.168.18.140:4000/api/v1/user/register/";
      const requestData = {
        name,
        email,
        phone_number,
        password,
      };
      // const response = await axios.post(apiUrl, requestData, { timeout: 1000000 });
      console.log("requestData", requestData);

      await axios
        .post(apiUrl, requestData)
        .then(async (response) => {
          console.log(response.data);
          await AsyncStorage.setItem("userData", JSON.stringify(response.data));
          navigation.navigate("VerifyLogin");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
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
              Sign Up
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#122359",
              }}
            >
              It only takes a minute to create your account
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          paddingTop: wp(11),
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
            placeholder="Your Name"
            style={styles.inputField}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor="#3D3D3D"
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity>
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
              placeholder="Your Email Address"
              style={styles.inputField}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#3D3D3D"
            />
          </TouchableOpacity>
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
            placeholder="Your Phone Number"
            style={styles.inputField}
            value={phone_number}
            onChangeText={(text) => setPhoneNumber(text)}
            maxLength={11}
            placeholderTextColor="#3D3D3D"
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
          <TextInput
            placeholder="Your Password"
            style={styles.inputField}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
          />
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
        <TouchableOpacity onPress={() => navigation.navigate("WelcomeBack")}>
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
  );
};

export default SignUP;

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
