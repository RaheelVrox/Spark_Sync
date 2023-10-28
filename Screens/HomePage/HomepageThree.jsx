import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";

const HomepageThree = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ marginHorizontal: 24, paddingTop: wp(15) }}>
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
            Welcome Faris
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "400",
              color: "#0D3559",
            }}
          >
            Review all your properties.
          </Text>
        </View>
      </View>
      <View style={styles.containerbox}>
        <View style={styles.leftBox}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#122359",
            }}
          >
            Monthly rate
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 32,
              fontWeight: "700",
              color: "#670097",
            }}
          >
            16.6¢
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#122359",
            }}
          >
            Per KWh
          </Text>
        </View>
        <View style={styles.rightText}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="location-pin" size={20} color="#670097" />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "400",
                color: "#122359",
              }}
            >
              1234 Street Dallas, TX
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "700",
              color: "#346AFE",
            }}
          >
            Congratulations! You saved {"\n"} 20%
          </Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Energy From</Text>
          <Text style={styles.textMedium}>Cirro Energy</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Plan:</Text>
          <Text style={styles.textMedium}>12 month</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Taxes:</Text>
          <Text style={styles.textMedium}>$ 3.56</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Adjustment</Text>
          <Text style={styles.textMedium}>$ 0.00</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Market Charges</Text>
          <Text style={styles.textMedium}>$ 0.00</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>UDC Charges</Text>
          <Text style={styles.textMedium}>$ 22.50</Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 24,
          paddingTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 18,
            fontWeight: "600",
            color: "#0D3559",
            marginBottom: 25,
          }}
        >
          Your other properties
        </Text>
      </View>
      <View style={styles.boxcontainer}>
        <View style={styles.boxleft}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 24,
              fontWeight: "600",
              color: "#670097",
            }}
          >
            16.2¢
          </Text>
        </View>
        <View style={styles.textright}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="location-pin" size={20} color="#670097" />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "400",
                color: "#122359",
              }}
            >
              1234 Street Dallas, TX
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#346AFE",
            }}
          >
            Pending
          </Text>
        </View>
      </View>
      <View style={styles.boxcontainer}>
        <View style={styles.boxleft}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 24,
              fontWeight: "600",
              color: "#670097",
            }}
          >
            15.8¢
          </Text>
        </View>
        <View style={styles.textright}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="location-pin" size={20} color="#670097" />
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 14,
                fontWeight: "400",
                color: "#122359",
              }}
            >
              1234 Street Dallas, TX
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#346AFE",
            }}
          >
            Pending
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HomepageThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#EEF7FE",
    height: hp("23%"),
    width: wp("100%"),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 30,
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
    height: hp("16%"),
  },
  leftBox: {
    backgroundColor: "#fff",
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 10,
    justifyContent: "center",
  },
  rightText: {
    marginLeft: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  detailContainer: {
    height: hp("24%"),
    backgroundColor: "#F3F4FF",
    padding: 20,
    borderRadius: 10,
    // marginTop: 10,
    marginHorizontal: 24,
    margin: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
  },
  textBold: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    fontWeight: "700",
    color: "#122359",
  },
  textMedium: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    fontWeight: "500",
    color: "#3D3D3D",
  },
  boxcontainer: {
    backgroundColor: "#F3F4FF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    marginHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
  boxleft: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  textright: {
    marginLeft: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
});
