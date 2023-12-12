import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ApiData from "../../apiconfig";

const HomepageOne = ({ route }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const navigation = useNavigation();
  const [user_id, setuser_id] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [propertiesData, setPropertiesData] = useState([]);

  // console.log("user_id", user_id);

  useEffect(() => {
    getUserId();
  }, [route.params?.selectedImage]);

  const fetchFrontImages = async (value) => {
    try {
      const apiUrl = `${ApiData.url}/api/v1/frontimage/${value}`;
      const response = await axios.get(apiUrl);
      const fetchedFrontImages = response.data;
      console.log("user:", value);
      setPropertiesData(fetchedFrontImages?.properties);

      console.log("Fetched Front Images:", fetchedFrontImages?.properties);
    } catch (error) {
      console.error("Error fetching front images:", error);
    }
  };

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      const storedUserData = await AsyncStorage.getItem("userData");
      const userDataFromStorage = JSON.parse(storedUserData) || { id: null };

      console.log("asdasdasdas:", userDataFromStorage);
      if (userDataFromStorage !== null) {
        setuser_id(userDataFromStorage?.id);
        fetchFrontImages(userDataFromStorage?.id);
      }
    } catch (error) {
      console.error("Error fetching user id:", error);
    }
  };

  return (
    <>
      {isLoading === true ? null : (
        <>
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
                      color: "#122359",
                      marginBottom: 5,
                    }}
                  >
                    Welcome
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontSize: 16,
                      fontWeight: "400",
                      color: "#3D3D3D",
                    }}
                  >
                    Review all your properties.
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View
              style={{
                marginHorizontal: 24,
                paddingTop: wp(9),
                marginBottom: wp(9),
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#122359",
                }}
              >
                Texas Electricity Areas
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  resizeMode: "contain",
                  height: hp("37%"),
                  width: wp("100%"),
                }}
                source={require("../../assets/Blank_map.png")}
              />
            </View>
            <View
              style={{
                marginHorizontal: 24,
                paddingTop: wp(4),
                marginBottom: 22,
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#122359",
                }}
              >
                Your properties
              </Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.propertieontainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {propertiesData &&
                propertiesData?.map((el, idx) => {
                  return (
                    <View key={idx + 1} style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          justifyContent: "center",
                          marginHorizontal: 11,
                        }}
                      >
                        <Text
                          style={{
                            justifyContent: "center",
                            fontFamily: "Roboto-Regular",
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#122359",
                          }}
                        >
                          Property: {idx + 1}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginLeft: wp(6),
                          gap: 20,
                        }}
                      >
                        <Image
                          style={styles.image}
                          source={{
                            uri: `${ApiData.url}/front_image/${el.front_image_url}`,
                          }}
                        />
                        <Image
                          style={styles.image}
                          source={{
                            uri: `${ApiData.url}/back_image/${el.back_image_url}`,
                          }}
                        />
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

export default HomepageOne;

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
  backbut: {
    height: hp("5.5%"),
    width: wp("11%"),
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  propertieontainer: {
    backgroundColor: "#EEF7FE",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    marginHorizontal: 24,
    borderRadius: 10,
    height: hp("13%"),
  },
  image: {
    width: wp("22%"),
    height: wp("22%"),
    resizeMode: "contain",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FCEEFE",
  },
});
