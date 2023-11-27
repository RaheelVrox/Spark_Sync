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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
const HomepageOne = () => {
  const goBack = () => {
    navigation.goBack();
  };
  const navigation = useNavigation();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <>
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
        </LinearGradient>
        <View
          style={{
            marginHorizontal: 24,
            paddingTop: wp(10),
            marginBottom: 30,
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
              // height: hp("40%"),
              width: wp("100%"),
            }}
            source={require("../../assets/Blank_map.png")}
          />
        </View>
        <View
          style={{
            marginHorizontal: 24,
            paddingTop: wp(6),
            marginBottom: 20,
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
            Your properties
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.containerbox}>
            <View
              style={{
                paddingRight: 15,
                paddingLeft: 15,
                justifyContent: "center",
              }}
            >
              <AntDesign name="minuscircle" size={24} color="#858585" />
            </View>
            <View style={styles.rightText}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="location-pin" size={20} color="#670097" />
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 14,
                    fontWeight: "700",
                    color: "#122359",
                    marginBottom: 5,
                  }}
                >
                  1234 Street Dallas, TX
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#346AFE",
                }}
              >
                Congratulations! You saved 20%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      {/* <Modal
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
      </Modal> */}
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
    height: hp("25%"),
    width: wp("100%"),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
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
    height: hp("8%"),
  },
  rightText: {
    marginLeft: 25,
    justifyContent: "center",
    alignSelf: "center",
    gap: 4,
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
