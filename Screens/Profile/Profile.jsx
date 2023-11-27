import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

const Profile = ({ route }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.reset({
        index: 0,
        routes: [{ name: "SignUP" }],
      });
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const fetchUserData = async () => {
    const storedUserData = await AsyncStorage.getItem("userData");
    const userDataFromApi = JSON.parse(storedUserData)?.id;

    const apiUrl = `http://192.168.18.41:5000/api/v1/user/details/${userDataFromApi}`;

    await axios
      .get(apiUrl)
      .then((res) => {
        let image = `http://192.168.18.41:5000/profile_image/${userData?.profile_image}`;
        setProfileImage(image);
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useLayoutEffect(() => {
    fetchUserData();
  });

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
            {userData ? (
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
                  }}
                  source={require("../../assets/profile.png")}
                />
              </>
            )}
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 24,
                fontWeight: "600",
                color: "#0D3559",
                textAlign: "center",
              }}
            >
              {userData?.name || "Loading..."}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#0D3559",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {userData?.address || "Address not found!"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditProfile", { userId: userData?.id })
            }
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
        <View style={{ marginHorizontal: 16, paddingTop: 16 }}>
          <Text style={styles.text}>Reset Password</Text>
          <Text style={styles.text}>Contact</Text>
          <Text style={styles.text}>Terms of Services</Text>
          <Text style={styles.text}>Privacy Policy</Text>
          <TouchableOpacity onPress={logout}>
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
    height: hp("36%"),
    width: wp("100%"),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
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
    height: hp("30%"),
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#122359",
    lineHeight: 45,
  },
});
