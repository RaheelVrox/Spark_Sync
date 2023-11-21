import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const UploadBackpage = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
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
                color: "#0D3559",
                marginBottom: 5,
              }}
            >
              Upload Back Page
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#0D3559",
              }}
            >
              Please upload the front part of your bill
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View>
        <View
          style={{
            alignSelf: "center",
            paddingTop: wp(15),
          }}
        />
      </View>
      <View style={styles.Gallerybox}>
        <Image
          style={{
            width: wp("15%"),
            height: wp("15%"),
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={require("../../assets/Gallery.png")}
        />
      </View>
      <View
        style={{
          marginTop: wp(15),
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 16,
            fontWeight: "400",
            color: "#3D3D3D",
            marginHorizontal: 24,
            textAlign: "center",
            lineHeight: 30,
          }}
        >
          Please upload a high-quality image in either JPG or PNG format. The
          maximum file size allowed is 10MB.
        </Text>
      </View>
      <TouchableOpacity>
        <View
          style={{
            width: wp("88%"),
            height: hp("7%"),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#EEF7FE",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EEF7FE",
            alignSelf: "center",
            marginTop: wp(20),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#002896",
            }}
          >
            Retake the picture
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Browse Files
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadBackpage;

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
  Gallerybox: {
    width: wp("32%"),
    borderRadius: 10,
    backgroundColor: "#EEF7FE",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
    marginTop: wp(5),
  },
});
