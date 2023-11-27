import React, { useEffect, useState } from "react";
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

const Profile = ({ route }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async (userId) => {
    try {
      const apiUrl = `http://192.168.18.140:5000/api/v1/user/details/${userId}`;
      const response = await axios.get(apiUrl);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const storedUserData = await AsyncStorage.getItem("userData");
        const userDataFromApi = JSON.parse(storedUserData)?.id;
        console.log("id is: ", userDataFromApi);
        setUserData(userDataFromApi);
        const userDetails = await getUserDetails(userDataFromApi);
        setUserData(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
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
            {loading ? (
              <ActivityIndicator size="large" color="#0D3559" />
            ) : (
              <>
                <Image
                  style={{
                    resizeMode: "contain",
                    marginBottom: 16,
                    alignSelf: "center",
                  }}
                  source={
                    userData?.profile_image
                      ? { uri: userData.address }
                      : require("../../assets/profile.png")
                  }
                />
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 24,
                    fontWeight: "600",
                    color: "#0D3559",
                    textAlign: "center",
                  }}
                >
                  {userData?.name || "Faris Husain"}
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
                  {userData?.address ||
                    "1234 Some house, Some street Houston, Texas."}
                </Text>
              </>
            )}
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
          {/* Other user details or menu options */}
          <Text style={styles.text}>Reset Password</Text>
          <Text style={styles.text}>Contact</Text>
          <Text style={styles.text}>Terms of Services</Text>
          <Text style={styles.text}>Privacy Policy</Text>
          <Text style={styles.text}>Sign Out</Text>
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
    height: hp("35%"),
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
