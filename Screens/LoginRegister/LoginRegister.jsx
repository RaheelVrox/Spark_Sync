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
// import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AuthApple from ".../../../components/Auth";

const LoginRegister = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  // const handleGooglePress = () => {
  //   promptAsync();
  // };
  const handleEmailPress = () => {
    navigation.navigate("SignUP");
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
          SparkSync
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

        {/* <TouchableOpacity onPress={() => {}}>
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
                // disabled={!request}
              />
            </View>
          </View>
        </TouchableOpacity> */}
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
                placeholder="Register with Email"
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
          flex: 1,
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
          marginHorizontal: 24,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Roboto-Regular",
            fontSize: 14,
            fontWeight: "400",
          }}
        >
          By continuing, you accept the{" "}
          <Text style={{ color: "#346AFE", textDecorationLine: "underline" }}>
            Term of Use
          </Text>{" "}
          and{" "}
          <Text style={{ color: "#346AFE", textDecorationLine: "underline" }}>
            Privacy Policy
          </Text>
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
    // paddingTop: 45,
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
