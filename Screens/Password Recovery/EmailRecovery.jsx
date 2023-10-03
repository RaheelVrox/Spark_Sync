import { StyleSheet, Text, View, TouchableOpacity, Image,KeyboardAvoidingView,TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const EmailRecovery = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ marginHorizontal: 24, paddingTop: wp(20) }}>
          <TouchableOpacity>
            <Image
              style={{ resizeMode: "contain", marginBottom: 10 }}
              source={require("../../assets/back.png")}
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
            Enter your email and we will send you a code to reset your password.
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: wp(15),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#3D3D3D"
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("PhoneRecovery")}>
        <View style={styles.button}>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EmailRecovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#EEF7FE",
    height: hp("26%"),
    width: wp("100%"),
  },
  inputField: {
    height: hp("7%"),
    width: wp("85%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEF7FE",
    marginBottom: wp("5%"),
    paddingLeft: wp(4),
    backgroundColor: "#EEF7FE",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  button: {
    width: wp("85%"),
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
