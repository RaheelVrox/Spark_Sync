import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";

const HomepageOne = () => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <>
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
              Explore the offers available in your area
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 24,
            paddingTop: wp(10),
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 18,
              fontWeight: "600",
              color: "#0D3559",
            }}
          >
            Texas Electricity Areas
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: hp("40%"),
              width: wp("100%"),
            }}
            source={require("../../assets/map.png")}
          />
        </View>
        <View
          style={{
            marginHorizontal: 24,
            paddingTop: wp(10),
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 18,
              fontWeight: "600",
              color: "#0D3559",
            }}
          >
            Our recommended deals for you
          </Text>
        </View>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <View style={styles.containerbox}>
            <View style={styles.leftBox}>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#670097",
                }}
              >
                16.2¢
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
                  color: "#122359",
                }}
              >
                Smart Basic 12 from Cirro Energy
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#346AFE",
                }}
              >
                Will save 20%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <Modal
        isVisible={isBottomSheetVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.bottomSheetTitle}>Custom Bottom Sheet</Text>
          <Text>This is your customized bottom sheet content.</Text>
          <Button title="Close" onPress={toggleBottomSheet} />
        </View>
      </Modal>
    </>
  );
};

export default HomepageOne;

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
    height: hp("13%"),
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
    marginLeft: 25,
    justifyContent: "center",
    alignSelf: "center",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: hp("59%"),
  },
  bottomSheetTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    fontWeight: "600",
    color: "#0D3559",
    marginBottom: 25,
  },
});
