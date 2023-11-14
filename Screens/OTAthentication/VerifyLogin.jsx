import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const VerifyLogin = () => {
  const goBack = () => {
    navigation.goBack();
  };

  const navigation = useNavigation();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
              <Ionicons name="ios-chevron-back-sharp" size={28} color="#670097" />
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
              Verify Login
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#0D3559",
              }}
            >
              Enter OTP Code sent to your email.
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#0D3559",
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
          paddingTop: wp(15),
        }}
      >
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp1(text)}
            value={otp1}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp2(text)}
            value={otp2}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp3(text)}
            value={otp3}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp4(text)}
            value={otp4}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
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
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#346AFE",
            }}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EmailRecovery")}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            fontFamily: "Roboto-Regular",
            color: "#fff",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
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
    marginTop: 40,
  },
});
