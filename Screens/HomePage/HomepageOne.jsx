import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Modal from "react-native-modal";
import ApiData from "../../apiconfig";

const HomepageOne = ({ route }) => {
  const navigation = useNavigation();
  const [user_id, setuser_id] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [propertiesData, setPropertiesData] = useState([]);
  const [showInitialAlert, setShowInitialAlert] = useState(false);

  useEffect(() => {
    // Show initial alert when showAlert is true
    if (route?.params?.showAlert) {
      setShowInitialAlert(true);
    }
  }, [route?.params]);

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
        setIsLoading(false);
      }
    };

    fetchData();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const hideInitialAlert = () => {
    setShowInitialAlert(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#EEF7FE", "#FCEEFE"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0.6, y: 0.6 }}
        style={{
          borderBottomRightRadius: Platform.OS === "ios" ? 30 : 0,
          borderBottomLeftRadius: Platform.OS === "ios" ? 30 : 0,
        }}
      >
        <View style={styles.headerContainer}>
          <View style={{ marginHorizontal: wp(4) }}>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: wp(6),
                fontWeight: "600",
                color: "#122359",
                marginTop: hp(2),
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: wp(3.5),
                fontWeight: "400",
                color: "#3D3D3D",
              }}
            >
              Review all your properties
            </Text>
          </View>
        </View>
      </LinearGradient>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={75} color="#346AFE" />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: wp(4),
                paddingTop: wp(9),
                marginBottom: wp(9),
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: wp(5),
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
                marginHorizontal: wp(4),
                paddingTop: wp(3),
                marginBottom: wp(5),
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: wp(5),
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
                              marginHorizontal: wp(2),
                            }}
                          >
                            <Text
                              style={{
                                justifyContent: "center",
                                fontFamily: "Roboto-Regular",
                                fontSize: wp(4),
                                fontWeight: "600",
                                color: "#122359",
                              }}
                            >
                              Property{idx + 1}:
                            </Text>
                          </View>
                          <View
                            style={{
                              width: "60%",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                              marginLeft: wp(6),
                              gap: wp(5),
                            }}
                          >
                            <Image
                              style={styles.image}
                              source={{
                                uri: `${ApiData.url}/front_image/${el?.front_image_url}`,
                              }}
                            />
                            <Image
                              style={styles.image}
                              source={{
                                uri: `${ApiData.url}/back_image/${el?.back_image_url}`,
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
                    fontSize: wp(3),
                    fontWeight: "300",
                    color: "#122359",
                  }}
                >
                  No Properties added yet!
                </Text>
              </View>
            )}
          </ScrollView>
        </>
      )}

      {/* Custom modal for initial alert */}
      <Modal isVisible={showInitialAlert} onBackdropPress={hideInitialAlert}>
        <View
          style={{ backgroundColor: "#EEF7FE", padding: 20, borderRadius: 10 }}
        >
          <Text
            style={{
              color: "#122359",
              fontFamily: "Roboto-Regular",
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            Thank You
          </Text>
          <Text
            style={{
              color: "#122359",
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
            }}
          >
            Your bill has been submitted.Our sales representative will contact
            you soon.
          </Text>
          <TouchableOpacity
            onPress={hideInitialAlert}
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ color: "blue", fontSize: 16, fontWeight: "400" }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    borderBottomRightRadius: Platform.OS === "ios" ? 30 : 0,
    borderBottomLeftRadius: Platform.OS === "ios" ? 30 : 0,
    justifyContent: "center",
  },
  propertieontainer: {
    backgroundColor: "#EEF7FE",
    paddingTop: wp(2),
    paddingBottom: wp(2),
    paddingRight: wp(2),
    paddingLeft: wp(2),
    flexDirection: "row",
    marginHorizontal: wp(4),
    borderRadius: wp(2),
    height: hp("13%"),
    marginBottom: wp(5),
  },
  image: {
    resizeMode: "contain",
    width: wp("35%"),
    height: hp("10%"),
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
