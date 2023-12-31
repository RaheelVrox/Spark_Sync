import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import ApiData from "../../apiconfig.js";
import RNRestart from "react-native-restart";
import { useUserData } from "../../UserDataContext.js";

const Profile = ({ route }) => {
  const { setUserData } = useUserData();

  const navigation = useNavigation();
  const [userData, setUserDataSt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  // console.log("userDatadsadsadsadsa", userData);

  // console.log(loading);

  useEffect(() => {
    setLoading(!loading);
  }, [navigation]);

  const handleSignOut = async () => {
    try {
      setUserData(null);

      // await AsyncStorage.clear();
      // await Updates.reloadAsync();
      // RNRestart.restart();
      // navigation.navigate("LoginRegister");
      // Restart();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const fetchUserData = async () => {
    // console.log("jo");
    const storedUserData = await AsyncStorage.getItem("userData");
    // console.log("store_data", storedUserData);
    const userDataFromApi = JSON.parse(storedUserData)?.id;
    // console.log("userDataFrom_Api", JSON.parse(storedUserData));
    const apiUrl = `${ApiData.url}/api/v1/user/details/${userDataFromApi}`;
    // console.log("apiUrl", apiUrl);
    await axios
      .get(apiUrl)
      .then((res) => {
        // console.log("res", res);
        let data = res.data || res;
        let image = `${ApiData.url}/profile_image/${data?.profile_image}`;
        setProfileImage(image);
        // console.log("data", data);
        setUserDataSt(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchUserData();
  }, [navigation]);

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      userId: userData?.id,
      onProfileUpdate: () => fetchUserData(),
    });
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
          {userData?.profile_image ? (
            <>
              <Image
                style={{
                  resizeMode: "contain",
                  marginBottom: 16,
                  alignSelf: "center",
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
                source={{
                  uri: profileImage,
                }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 24,
              fontWeight: "600",
              color: "#122359",
              textAlign: "center",
            }}
          >
            {userData?.name || "Loading..."}
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#3D3D3D",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginHorizontal: 8,
                marginTop: 8,
              }}
            >
              {userData?.address || "Address not found!"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={{
              height: 34,
              width: 107,
              backgroundColor: "#002896",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 16,
            }}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.detailContainer}>
        <View style={{ marginHorizontal: 16, paddingTop: 2 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.text}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Terms of Services</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: hp("37%"),
    width: wp("100%"),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  detailContainer: {
    backgroundColor: "#EEF7FE",
    marginHorizontal: 24,
    borderRadius: 10,
    marginTop: 40,
    // height:
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#122359",
    lineHeight: 48,
  },
  divider: {
    height: 1.5,
    backgroundColor: "#2a2a2a",
    marginTop: 15,
    marginBottom: 11,
  },
});
