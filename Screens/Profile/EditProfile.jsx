import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
import ApiData from "../../apiconfig";
import { ScrollView } from "react-native";

const EditProfile = ({ route }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [profile_image, setProfileImage] = useState(null);
  const [profile_imageDisplayCheck, setProfileImageDisplayCheck] =
    useState(null);
  const [profile_imageDisplay, setProfileImageDisplay] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isAddressDirty, setIsAddressDirty] = useState(false);
  const [isPhoneDirty, setIsPhoneDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const handleNameChange = (text) => {
    setName(text);
    setIsNameDirty(true);
  };
  const handleaddressChange = (text) => {
    setAddress(text);
    setIsAddressDirty(true);
  };
  const handlePhoneChange = (text) => {
    setPhone(text);
    setIsPhoneDirty(true);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailDirty(true);
    const trimmedEmail = text.trim();
    // Update the state with the trimmed email
    setEmail(trimmedEmail.toLowerCase());
  };
  const inputColor = isNameDirty ? "#122359" : "#3D3D3D";
  const addressInputColor = isAddressDirty ? "#122359" : "#3D3D3D";
  const phoneInputColor = isPhoneDirty ? "#122359" : "#3D3D3D";
  const emailInputColor = isEmailDirty ? "#122359" : "#3D3D3D";
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const apiUrl = `${ApiData.url}/api/v1/user/update/${userData.id}`;
      const filename = profile_image?.uri.substring(
        profile_image?.uri.lastIndexOf("/") + 1
      );

      let data = new FormData();
      data.append("email", email);
      data.append("address", address);
      data.append("name", name);
      data.append("phone_number", phone_number);
      if (profile_image) {
        data.append("profile_image", {
          uri: profile_image?.uri,
          type: "image/jpeg",
          name: filename,
        });
      }

      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUserData = { ...userData, ...response.data };
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
      route.params.onProfileUpdate();
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0]);
        setProfileImageDisplay(result.assets[0]?.uri);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const userDataFromStorage = JSON.parse(storedUserData) || { id: null };
        // console.log("dsadsasad", userDataFromStorage);
        setUserData(userDataFromStorage);
        setName(userDataFromStorage.name || "");
        setAddress(userDataFromStorage.address || "");
        setPhone(userDataFromStorage.phone_number || "");
        setEmail(userDataFromStorage.email || "");
        setProfileImageDisplayCheck(userDataFromStorage?.profile_image);
        setProfileImageDisplay(
          `${ApiData.url}/profile_image/${userDataFromStorage?.profile_image}` ||
            ""
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {profile_imageDisplayCheck ? (
                  <Image
                    style={{
                      resizeMode: "contain",
                      marginBottom: 16,
                      alignSelf: "center",
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                    }}
                    source={{ uri: profile_imageDisplay }}
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
                    source={require("../../assets/profile_img.png")}
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
        <ScrollView>
          <View style={styles.detailContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Name</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Your name"
                    style={{
                      ...styles.inputField,
                      fontSize: 14,
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      color: inputColor,
                    }}
                    value={name}
                    onChangeText={handleNameChange}
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
                    multiline
                    placeholder="Your address"
                    style={{
                      ...styles.inputField,
                      fontSize: 14,
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      color: addressInputColor,
                      height: hp("7.5%"),
                    }}
                    value={address}
                    onChangeText={handleaddressChange}
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
                    placeholder="Phone number"
                    style={{
                      ...styles.inputField,
                      fontSize: 14,
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      color: phoneInputColor,
                    }}
                    value={phone_number}
                    onChangeText={handlePhoneChange}
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
                    placeholder="Your email"
                    multiline
                    style={{
                      ...styles.inputField,
                      fontSize: 14,
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      color: emailInputColor,
                      height: hp("7.5%"),
                    }}
                    value={email}
                    onChangeText={handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <TouchableOpacity
              style={styles.Editbutton}
              onPress={() => handleSubmit()}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
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
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    height: hp("44.6%"),
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 9,
    marginTop: 17,
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
    fontSize: 12,
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
    marginTop: 34,
  },
});

export default EditProfile;
