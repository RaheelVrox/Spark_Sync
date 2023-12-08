import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
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
  const [frontImages, setFrontImages] = useState([]);

  useEffect(() => {
    fetchFrontImages();
  }, [route.params?.selectedImage]);

  const fetchFrontImages = async () => {
    try {
      const user_id = await AsyncStorage.getItem("userData");
      const apiUrl = `${ApiData.url}/api/v1/frontimage/${user_id}`;
      const response = await axios.get(apiUrl);
      const fetchedFrontImages = response.data;
      if (route.params?.selectedImage) {
        setFrontImages([route.params.selectedImage, ...fetchedFrontImages]);
      } else {
        setFrontImages(fetchedFrontImages);
      }

      console.log("Fetched Front Images:", fetchedFrontImages);

    } catch (error) {
      console.error("Error fetching front images:", error);
    }
  };

  console.log("Front Images:", frontImages);

  return (
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
                  color: "#0D3559",
                  marginBottom: 5,
                }}
              >
                Welcome Faris
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#0D3559",
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
            paddingTop: wp(4.5),
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
        <View style={styles.propertieontainer}>
          <View style={{ justifyContent: "center", marginHorizontal: 11 }}>
            <Text
              style={{
                justifyContent: "center",
                fontFamily: "Roboto-Regular",
                fontSize: 18,
                fontWeight: "600",
                color: "#122359",
              }}
            >
              Property:1
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginLeft: 40,
            }}
          >
            {frontImages.length > 0 ? (
              frontImages.map((image, index) => (
                <Image
                  key={index}
                  style={styles.image}
                  source={{ uri: image.uri }}
                />
              ))
            ) : (
              <>
                <Image
                  style={styles.image}
                  source={require("../../assets/frontpage.png")}
                />
                <View style={{ marginLeft: 20 }}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/frontpage.png")}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
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
  containerbox: {
    backgroundColor: "#F3F4FF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    marginHorizontal: 24,
    borderRadius: 10,
    height: hp("8%"),
    marginBottom: 15,
  },
  rightText: {
    marginLeft: 10,
    justifyContent: "center",
    alignSelf: "center",
    gap: 4,
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
  },
});
