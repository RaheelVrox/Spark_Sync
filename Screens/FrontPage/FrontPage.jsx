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
      <Image
        style={styles.image}
        source={require("../../assets/newlogo.png")}
      />
      <View style={{ paddingTop: wp(30) }}>
        <Text style={styles.heading}>SparkSync</Text>
      </View>
      <View
        style={{
          marginTop: 32,
          marginHorizontal: 24,
          flex: 1,
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
            color: "#4D4D4D",
          }}
        >
          Wholesale electric price is yours with Spark Sync. See how our
          advanced algorithm can help you save by uploading your bill now!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.startbutton}
        onPress={() => navigation.navigate("SignUP")}
      >
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
      </TouchableOpacity>
    </View>
  );
};

export default FrontPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: wp("50%"),
    height: wp("60%"),
    top: 80,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 60,
    fontWeight: "900",
    fontWeight: "400",
    fontFamily: "Roboto-Regular",
    color: "#122359",
  },
  startbutton: {
    width: wp("88%"),
    height: hp("7%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#346AFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#346AFE",
    alignSelf: "center",
    margin: 25,
  },
});
