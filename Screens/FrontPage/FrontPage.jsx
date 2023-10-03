import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const FrontPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <View style={{ paddingTop: wp(40) }}>
        <Text style={styles.heading}>Spark Sync</Text>
      </View>
      <View
        style={{
          marginTop: 32,
          marginHorizontal: 24,
        }}
      >
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Roboto-Regular",
            fontSize: 18,
            fontWeight: "400",
            textAlign: "center",
            lineHeight: 30,
            marginBottom: 200,
          }}
        >
          Wholesale electric price is yours with Spark Sync. See how our
          advanced algorithm can help you save by uploading your bill now!
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("LoginRegister")}>
        <View style={styles.startbutton}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Get Started
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FrontPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    resizeMode: "contain",
    width: wp("40%"),
    height: wp("50%"),
    top: 120,
  },
  heading: {
    fontSize: 60,
    fontWeight: "900",
    fontWeight: "400",
    fontFamily: "Montserrat-ExtraBold",
    color: "#0D3559",
  },
  startbutton: {
    width: wp("80%"),
    height: hp("7%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#346AFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#346AFE",
    alignSelf: "center",
  },
});
