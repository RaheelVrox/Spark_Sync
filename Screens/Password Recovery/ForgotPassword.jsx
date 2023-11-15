import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const goBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (selectedOption === "email") {
      navigation.navigate("EmailRecovery");
      // console.log("Email Recovery");
    } else if (selectedOption === "phone") {
      navigation.navigate("PhoneRecovery");
      // console.log("Phone Recovery");
    } else {
      console.log("Please select a verification method");
    }
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
              Reset Password
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#122359",
              }}
            >
              Select verification method, and we will send a verification code
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, paddingTop: wp(9) }}>
        <TouchableOpacity
          onPress={() => setSelectedOption("email")}
          style={styles.containerbox}
        >
          <View style={styles.leftBox}>
            <Feather
              name="mail"
              size={20}
              color={selectedOption === "email" ? "#346AFE" : "#fff"}
            />
          </View>
          <View style={styles.rightText}>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "700",
                color: "#122359",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "600",
                color: "#3D3D3D",
              }}
            >
              Sent to your email
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedOption("phone")}
          style={styles.containerbox}
        >
          <View style={styles.leftBox}>
            <Feather
              name="phone-call"
              size={20}
              color={selectedOption === "phone" ? "#346AFE" : "#fff"}
            />
          </View>
          <View style={styles.rightText}>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "700",
                color: "#122359",
              }}
            >
              Phone number
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "600",
                color: "#3D3D3D",
              }}
            >
              Sent to your phone number
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
  );
};

export default ForgotPassword;

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
  containerbox: {
    backgroundColor: "#F3F4FF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    marginHorizontal: 24,
    borderRadius: 10,
    marginBottom: 24,
  },
  leftBox: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#122359",
  },
  rightText: {
    marginLeft: 20,
    justifyContent: "center",
    alignSelf: "center",
    gap: 4,
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
    margin: 20,
  },
});
