import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({ id: null });
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const updateUserProfile = async () => {
    try {
      const apiUrl = `http://192.168.18.140:5000/api/v1/user/update/${userData.id}`;

      const formData = new FormData();
      formData.append("email", email);
      formData.append("address", address);
      formData.append("name", name);
      formData.append("phone_number", phone_number);
      formData.append("profile_image", profileImage);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API response:", response.data);

      const updatedUserData = { ...userData, ...response.data };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));

      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const userDataFromStorage = JSON.parse(storedUserData) || { id: null };
        setUserData(userDataFromStorage);
        setName(userDataFromStorage.name || "");
        setAddress(userDataFromStorage.address || "");
        setPhone(userDataFromStorage.phone_number || "");
        setEmail(userDataFromStorage.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
            <TouchableOpacity onPress={pickImage}>
              {profileImage ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    resizeMode: 'cover',
                  }}
                  source={{ uri: profileImage }}
                />
              ) : (
                <Image
                  style={{
                    resizeMode: "contain",
                    marginBottom: 16,
                    alignSelf: "center",
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                  source={require("../../assets/profile.png")}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "700",
                color: "#122359",
                textAlign: "center",
              }}
            >
              Edit Picture
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.detailContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Name</Text>
          <View>
            <KeyboardAvoidingView
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                placeholder="Your Name"
                style={styles.inputField}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor="#3D3D3D"
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Address</Text>
          <View>
            <KeyboardAvoidingView
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                placeholder="Your Address"
                style={styles.inputField}
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholderTextColor="#3D3D3D"
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Phone Number</Text>
          <View>
            <KeyboardAvoidingView
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                placeholder="Phone Number"
                style={styles.inputField}
                value={phone_number}
                onChangeText={(text) => setPhone(text)}
                placeholderTextColor="#3D3D3D"
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textBold}>Email</Text>
          <View>
            <KeyboardAvoidingView
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                placeholder="Your Email"
                style={styles.inputField}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#3D3D3D"
              />
            </KeyboardAvoidingView>
          </View>
        </View>
        <TouchableOpacity
          style={styles.Editbutton}
          onPress={() => updateUserProfile()}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#fff",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  detailContainer: {
    backgroundColor: "#EEF7FE",
    marginHorizontal: 24,
    borderRadius: 10,
    marginTop: 40,
    height: hp("38%"),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 8,
    marginTop: 15,
  },
  inputField: {
    height: hp("5%"),
    width: wp("50%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
    paddingLeft: wp(4),
    backgroundColor: "#fff",
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    justifyContent: "center",
  },
  textBold: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "700",
    color: "#122359",
  },
  Editbutton: {
    width: wp("23%"),
    height: hp("5.5%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#346AFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#346AFE",
    alignSelf: "center",
    marginTop: 30,
  },
});

export default EditProfile;
