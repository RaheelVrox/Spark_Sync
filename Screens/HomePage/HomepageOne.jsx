import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(true);
  const [propertiesData, setPropertiesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const storedUserData = await AsyncStorage.getItem("userData");
        const userDataFromStorage = JSON.parse(storedUserData) || { id: null };

        if (userDataFromStorage !== null) {
          setuser_id(userDataFromStorage?.id);
          const apiUrl = `${ApiData.url}/api/v1/frontimage/${userDataFromStorage?.id}`;
          const response = await axios.get(apiUrl);
          const fetchedFrontImages = response.data;
          setPropertiesData(fetchedFrontImages?.properties);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Hide the loader after fetching data
        setIsLoading(false);
      }
    };

    // Fetch data when the component mounts
    fetchData();

    // Subscribe to the focus event to refetch data when the screen is focused
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const value = await AsyncStorage.getItem("userData");
  //       const storedUserData = await AsyncStorage.getItem("userData");
  //       const userDataFromStorage = JSON.parse(storedUserData) || { id: null };

  //       if (userDataFromStorage !== null) {
  //         setuser_id(userDataFromStorage?.id);
  //         const apiUrl = `${ApiData.url}/api/v1/frontimage/${userDataFromStorage?.id}`;
  //         const response = await axios.get(apiUrl);
  //         const fetchedFrontImages = response.data;
  //         setPropertiesData(fetchedFrontImages?.properties);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       // Hide the loader after a specific duration (3 seconds)
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 2000);
  //     }
  //   };

  //   fetchData();
  // }, [navigation]);

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
          <View style={{ marginHorizontal: 24 }}>
            {/* <TouchableOpacity style={styles.backbut} onPress={goBack}>
              <Ionicons
                name="ios-chevron-back-sharp"
                size={28}
                color="#670097"
              />
            </TouchableOpacity> */}
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 24,
                fontWeight: "600",
                color: "#122359",
                marginTop: 20,
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
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={73} color="#346AFE" />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                  height: hp("35%"),
                  width: wp("100%"),
                }}
                source={require("../../assets/Blank_map.png")}
              />
            </View>
            <View
              style={{
                marginHorizontal: 24,
                paddingTop: wp(3),
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
            {propertiesData?.length !== 0 ? (
              <>
                {propertiesData &&
                  propertiesData?.map((el, idx) => {
                    return (
                      <View style={styles.propertieontainer} key={idx}>
                        <View style={{ flexDirection: "row" }}>
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
                              Property {idx + 1}:
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
                      </View>
                    );
                  })}
              </>
            ) : (
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    fontWeight: "300",
                    color: "#122359",
                  }}
                >
                  No Proerties added yet!
                </Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default HomepageOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    height: hp("20%"),
    width: wp("100%"),
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
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
    flexDirection: "coloum",
    marginHorizontal: 24,
    borderRadius: 10,
    height: hp("13%"),
    marginBottom: 20,
  },
  image: {
    width: wp("22%"),
    height: wp("22%"),
    resizeMode: "contain",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FCEEFE",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
