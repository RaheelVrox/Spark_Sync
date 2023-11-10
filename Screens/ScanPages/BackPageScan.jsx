import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import callGoogleVisionAsync from "../../GoogleVision.js";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
export default function BackPageScan() {
  const goBack = () => {
    navigation.goBack();
  };
  const navigation = useNavigation();
  const [language, setLanguage] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [loading, setLoading] = useState(false);

  async function SelectPhoto() {
    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.uri;
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        callGoogleVisionAsync(base64)
          .then((data) => {
            console.log("data", data?.responses);
            console.log("HERE");
            console.log("data", data?.responses.textAnnotations);
            var text = "";
            var locale = null;
            data.responses.forEach((response) => {
              response.textAnnotations.forEach((textAnnotation) => {
                text = text + " " + textAnnotation.description;
                if (locale === null) {
                  locale = textAnnotation.locale;
                }
              });
            });

            setLanguage(locale);
            setSubtitle(text);
            setLoading(false);
          })
          .catch((error) => {
            ToastAndroid.showWithGravity(
              "Error",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setLoading(false);
          });
      } else {
        // User cancelled taking a photo
        ToastAndroid.showWithGravity(
          "Photo capture cancelled",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Camera capture error:", error);
      ToastAndroid.showWithGravity(
        "Could not capture or process the photo",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setLoading(false);
    }
  }

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
              <Ionicons name="ios-chevron-back-sharp" size={28} color="#670097" />
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
              Scan Front Page
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#122359",
              }}
            >
              Hold your phone still near front part of your electricity bill.
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View>
        <Image style={{
          width: wp("100%"), height: wp("100%"),
          resizeMode: "contain", alignSelf: "center", marginBottom: 25, marginTop: 15
        }}
          source={require("../../assets/backpage.png")} />
      </View>
      <View>
        <TouchableOpacity style={styles.camerabut} onPress={SelectPhoto}>
          <Image style={{
            width: wp("10%"),
            height: wp("10%"),
            resizeMode: "contain", alignSelf: "center"
          }}
            source={require("../../assets/iroundcamera.png")} />
        </TouchableOpacity>
        {loading === false ? (
          subtitle !== null ? (
            <View>
              {/* <Text style={styles.languagetitle}>{language}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text> */}
            </View>
          ) : (
            <></>
          )
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <TouchableOpacity style={styles.startbutton} onPress={() => navigation.navigate("HomepageOne")}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            fontFamily: "Roboto-Regular",
            color: "#fff",
          }}
        >
          Send to analyze
        </Text>
      </TouchableOpacity>
    </View>

  );
}
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
  camerabut: {
    height: hp("6%"),
    width: wp("17%"),
    borderRadius: 10,
    backgroundColor: '#EEF7FE',
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
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
    marginTop: 85
  },
});
