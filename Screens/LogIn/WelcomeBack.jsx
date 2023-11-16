import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeBack = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigation = useNavigation();
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
                color: "#0D3559",
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
                color: "#0D3559",
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
              value={password}
              onChangeText={(text) => setPassword(text)}
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginHorizontal: 27,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VerifyLogin")}
      >
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
