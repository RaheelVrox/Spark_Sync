import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
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

export default function FrontPageScan() {
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
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.subtitle}>
        Get the text from a document's image after capturing it
      </Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={SelectPhoto}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        {loading === false ? (
          subtitle !== null ? (
            <View>
              <Text style={styles.languagetitle}>{language}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          ) : (
            <></>
          )
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("HomepageOne")}>
      <View style={styles.startbutton}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            fontFamily: "Roboto-Regular",
            color: "#fff",
          }}
        >
          Next
        </Text>
      </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    padding: 80,
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  subtitle: {
    fontSize: 15,
    marginVertical: 10,
    // textAlign: "center",
  },
  languagetitle: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
  },
  button: {
    backgroundColor: "#47477b",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
    marginBottom:80
  },
  buttonText: {
    color: "#fff",
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
