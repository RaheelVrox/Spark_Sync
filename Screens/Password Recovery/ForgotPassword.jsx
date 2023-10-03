import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ForgotPassword = () => {
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
            Select verification method and we will send verification code
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
        <View style={styles.inputField}>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              // alignContent:"center",
              // alignSelf:"center",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ paddingRight: wp(70) }}>
              <Image
                source={require("../../assets/back.png")}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  //   alignItems:"center",
                  //   alignSelf:"center",
                  marginTop: 12,
                  justifyContent: "space-between",
                }}
              />
            </View>
            <Text
              style={{
                position: "absolute",
                marginHorizontal: 80,
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "600",
                color: "#0D3559",
                paddingTop: 18,
              }}
            >
              Mail
            </Text>
            <Text
              style={{
                position: "absolute",
                alignItems: "center",
                alignSelf: "center",
                marginHorizontal: 80,
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "600",
                color: "#0D3559",
                paddingTop: 30,
              }}
            >
              Your send to your email
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingTop: wp(5),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.inputField}>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              // alignContent:"center",
              // alignSelf:"center",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ paddingRight: wp(70) }}>
              <Image
                source={require("../../assets/back.png")}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  //   alignItems:"center",
                  //   alignSelf:"center",
                  marginTop: 12,
                  justifyContent: "space-between",
                }}
              />
            </View>
            <Text
              style={{
                position: "absolute",
                marginHorizontal: 80,
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "600",
                color: "#0D3559",
                paddingTop: 18,
              }}
            >
              Phone number
            </Text>
            <Text
              style={{
                position: "absolute",
                alignItems: "center",
                alignSelf: "center",
                marginHorizontal: 80,
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "600",
                color: "#0D3559",
                paddingTop: 30,
              }}
            >
              Send to your phone number
            </Text>
          </View>
        </View>
      </View>
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
    backgroundColor: "#EEF7FE",
    height: hp("26%"),
    width: wp("100%"),
  },
  inputField: {
    height: hp("10%"),
    width: wp("90%"),
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
});
