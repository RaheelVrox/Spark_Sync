import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AuthApple from ".../../../components/Auth";

const LoginRegister = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const handleGooglePress = () => {
    promptAsync();
  };
  const handleEmailPress = () => {
    navigation.navigate("SignUP");
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "540523955446-jkfj5mos0c2sda6sdoefki6e2io7if0t.apps.googleusercontent.com",
    webClientId:
      "540523955446-i933in45ugmauu2bptr7feru6oafq0jn.apps.googleusercontent.com",
    iosClientId:
      "540523955446-d87qjngbbrd52356tuitujekmgiheepa.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    // console.log("Local_User:", user);

    if (!user) {
      if (response?.type === "success") {
        // console.log("Authentication Response:", response);
        setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      } else {
        // console.log("Authentication Response:", response);
      }
    } else {
      setUserInfo(user);
      // console.log("Loaded locally:", user);
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        console.error(
          "UserInfo API Error:",
          response.status,
          response.statusText
        );
        return;
      }

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("UserInfo Fetch Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/newlogo.png")}
        />
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 24,
            fontWeight: "600",
            color: "#122359",
            textAlign: "center",
          }}
        >
          Welcome To
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 32,
            fontWeight: "600",
            color: "#002896",
            textAlign: "center",
          }}
        >
          Spark Sync
        </Text>
      </View>

      <View style={{ paddingTop: 50 }}>
        <TouchableOpacity>
          <View>
            {/* {Platform.OS === "ios" && ( */}
            <>
              <View>
                {/* <AuthApple /> */}

                {/* <AntDesign
                    style={{ marginLeft: 24 }}
                    name="apple1"
                    size={35}
                    color="black"
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Continue with Apple"
                    placeholderTextColor="#0D3559"
                    editable={false}
                  /> */}
              </View>
            </>
            {/* // )} */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGooglePress()}>
          <View style={{ paddingTop: 21 }}>
            <View style={styles.registerContainer}>
              <Image
                style={{
                  marginLeft: 18,
                  resizeMode: "contain",
                  width: 40,
                  height: 40,
                }}
                source={require("../../assets/googleicon.png")}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Continue with Google"
                placeholderTextColor="#0D3559"
                editable={false}
                disabled={!request}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmailPress}>
          <View style={{ paddingTop: 21 }}>
            <View style={styles.registerContainer}>
              <MaterialIcons
                style={{ marginLeft: 26 }}
                name="email"
                size={32}
                color="#002896"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Continue with Email"
                placeholderTextColor="#0D3559"
                editable={false}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // marginTop: 25,
          paddingTop: 25,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 14,
            fontWeight: "600",
            color: "#3D3D3D",
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("WelcomeBack")}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "600",
              color: "#346AFE",
            }}
          >
            {" "}
            Log in
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: wp(38),
          marginHorizontal: 24,
        }}
      >
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 14,
            fontWeight: "400",
            color: "#3D3D3D",
          }}
        >
          By continuing, you accept the{" "}
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#346AFE",
              lineHeight: 30,
              textDecorationLine: "underline",
            }}
          >
            Term of Use
          </Text>{" "}
          and
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 14,
            fontWeight: "400",
            color: "#346AFE",
            lineHeight: 30,
            textDecorationLine: "underline",
          }}
        >
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default LoginRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 45,
  },
  image: {
    width: wp("40%"),
    height: wp("50%"),
    alignItems: "center",
    resizeMode: "contain",
    alignSelf: "center",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
    backgroundColor: "#EEF7FE",
    borderRadius: 10,
    marginHorizontal: 24,
  },
  textInput: {
    flex: 1,
    width: wp("50%"),
    height: hp("4%"),
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginVertical: 15,
  },
});
