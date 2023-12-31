import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../../apiconfig";

const UpdateBackImage = ({ route, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user_id, setuser_id] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    const fetchuserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = await getuserDataFromStorage();

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setuser_id(userData.id);
          await AsyncStorage.setItem("user_id:", userData.id.toString());
        }
      } catch (error) {
        console.error("Error fetching login data", error);
      }
    };

    fetchuserData();
  }, []);

  const getuserDataFromStorage = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
      console.error("Error retrieving login data from storage", error);
      throw error;
    }
  };

  useEffect(() => {
    const imageUri = route.params?.imageUri;
    if (imageUri) {
      setSelectedImage({ uri: imageUri.uri });
    }
  }, [route.params]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      setUploadMessage("Please select an image before uploading.");
      return;
    }

    setLoading(true);

    try {
      setUploadMessage("Uploading image. Please wait...");
      const formData = new FormData();
      const filename = selectedImage.uri.substring(
        selectedImage.uri.lastIndexOf("/") + 1
      );

      formData.append("backimage", {
        uri: selectedImage.uri,
        type: "image/jpeg",
        name: filename,
      });

      formData.append("user_id", user_id);

      await axios.post(`${ApiData.url}/api/v1/backimage/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadMessage("");

      // Navigation logic after successful upload
      navigation.navigate("HomeStack", {
        screen: "HomepageOne",
        params: {
          showAlert: true,
        },
      });
    } catch (error) {
      console.error("Error uploading image", error);
      setUploadMessage("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedImage ? (
        <Image
          style={{
            width: wp(80),
            height: wp(80),
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={{ uri: selectedImage.uri }}
        />
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={{
              width: wp("100%"),
              height: wp("100%"),
              resizeMode: "contain",
              alignSelf: "center",
            }}
            source={require("../../assets/frontpage.png")}
          />
        </TouchableOpacity>
      )}

      <View style={styles.buttonContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#122359",
              marginHorizontal: 24,
              marginTop: 100,
            }}
          >
            {uploadMessage
              ? uploadMessage
              : "Would you like to proceed with this image?"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: wp(100),
            marginBottom: 30,
          }}
        >
          {!loading ? (
            <>
              <TouchableOpacity
                onPress={uploadImage}
                style={{
                  width: wp("27%"),
                  height: hp("6.5%"),
                  backgroundColor: "#002896",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: wp("27%"),
                  height: hp("6.5%"),
                  backgroundColor: "#858585",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate("UploadFrontpage")}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </>
          ) : (
            <ActivityIndicator size="large" color="#346AFE" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateBackImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: wp("25%"),
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: wp(100),
    position: "absolute",
    bottom: 25,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
