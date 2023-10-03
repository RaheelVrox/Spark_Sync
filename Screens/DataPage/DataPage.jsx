import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DataPage = () => {
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
            Please check your data before go forward
          </Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.rowContainer}>
          <Text>
            Order Number:
          </Text>
          <Text >
            252
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DataPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
  },
  headerContainer: {
    backgroundColor: "#EEF7FE",
    height: hp("26%"),
    width: wp("100%"),
  },
  detailContainer: {
    width: "90%",
    borderWidth:1,
    padding: 20,
    borderRadius: 8,
    marginTop: 50,
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf:"center"
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // justifyContent: "center",
    // alignItems: "center",
  },
});
