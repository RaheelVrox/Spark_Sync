import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const UpdateBackImage = ({ route, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const imageUri = route.params?.imageUri;
    console.log("update_image_uri", imageUri);
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
      Alert.alert("Please select an image before uploading.");
      return;
    }

    setLoading(true);

    try {
      const filename = selectedImage.uri.substring(
        selectedImage.uri.lastIndexOf("/") + 1
      );

      const formData = new FormData();
      formData.append("backimage", {
        uri: selectedImage.uri,
        type: "image/jpeg", // Adjust the type accordingly
        name: filename, // Adjust the name accordingly
      });

      const response = await axios.post(
        "http://192.168.18.140:5000/api/v1/backimage/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image upload response:", response);
      console.log("Image uploaded successfully:", response.data);
      navigation.navigate("UploadFrontpage");
    } catch (error) {
      console.error("Error uploading image", error);
      Alert.alert("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedImage ? (
        <Image
          style={{
            width: wp("100%"),
            height: wp("100%"),
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

      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "600",
            fontFamily: "Roboto-Regular",
            color: "#122359",
            marginHorizontal: 24,
            marginTop: 60,
          }}
        >
          Would you like to proceed with this image?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#002896" />
        ) : (
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
        )}
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 80,
    marginHorizontal: 35,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
