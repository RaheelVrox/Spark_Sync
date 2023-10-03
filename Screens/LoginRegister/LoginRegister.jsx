import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
//android 540523955446-jkfj5mos0c2sda6sdoefki6e2io7if0t.apps.googleusercontent.com

const LoginRegister = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "540523955446-jkfj5mos0c2sda6sdoefki6e2io7if0t.apps.googleusercontent.com",
    webClientId:
      "540523955446-i933in45ugmauu2bptr7feru6oafq0jn.apps.googleusercontent.com",
    iosClientId:
      "540523955446-d87qjngbbrd52356tuitujekmgiheepa.apps.googleusercontent.com",
  });
  const navigation = useNavigation();
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '',
  //   });
  // }, []);
  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();

  //     // Use userInfo to authenticate with Firebase
  //     // You can use Firebase Authentication methods to link or create a user with this data.
  //     console.log(userInfo);
  //   }
  //   catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // User canceled the sign-in process
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // Sign-in is in progress
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // Play services are not available
  //     } else {
  //       // Some other error occurred
  //       console.error(error);
  //     }
  //   }
  // };

  useEffect(() => {
    handlesSignInwithGoogle();
  }, [response]);

  // const getUserInfo = async (token) => {
  //   if (!token) return;

  //   console.log("token", token);

  //   try {
  //     const response = await fetch("http://www.googleapis.com/userinfo/v2/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const user = await response.json();

  //     await AsyncStorage.setItem("@user", JSON, Stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {}
  // };
  
  async function getUserInfo(token) {
    if (!token) return;
  
    console.log("token", token);
  
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      } else {
        console.error("Failed to fetch user info:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  

  // async function handlesSignInwithGoogle() {
  //   const user = await AsyncStorage.getItem("@user");
  //   if (!user) {
  //     if (response?.type === "success") {
  //       await getUserInfo(response.authorization.accessToken);
  //     }
  //   } else {
  //     setUserInfo(JSON.parse(user));
  //   }
  // }
  // console.log("userInfo:-", userInfo);
  
  async function handlesSignInwithGoogle() {
    console.log("Handling Google Sign-In");
    console.log("Response:", response);
  
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authorization.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }
  async function getUserInfo(token) {
    if (!token) return;
  
    console.log("token", token);
  
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.ok) {
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      } else {
        console.error("Failed to fetch user info:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/faviconn.png")} />
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 32,
            fontWeight: "600",
            color: "#0D3559",
          }}
        >
          Welcome To
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 32,
            fontWeight: "600",
            color: "#0D3559",
          }}
        >
          Spark Sync
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("SignUP")}>
        <View style={{ paddingTop: wp(30) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 50,
              backgroundColor: "#EEF7FE",
              paddingVertical: 5,
              borderRadius: 10,
              marginLeft: 24,
              marginRight: 24,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 24 }}
              name="email"
              size={35}
              color="#0D3559"
            />

            <TextInput
              style={{
                marginVertical: 10,
                width: wp("50%"),
                height: hp("4%"),
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Roboto-Regular",
              }}
              placeholder="Continue with Email"
              placeholderTextColor="#0D3559"
              editable={false}
            />
          </View>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={signInWithGoogle}> */}
      <TouchableOpacity onPress={promptAsync}>
        <View style={{ paddingTop: wp(6) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 40,
              backgroundColor: "#EEF7FE",
              paddingVertical: 5,
              borderRadius: 10,
              marginLeft: 24,
              marginRight: 24,
            }}
          >
            <Image
              style={{
                marginLeft: 20,
                resizeMode: "contain",
                width: wp("12%"),
                height: wp("12%"),
              }}
              source={require("../../assets/googleicon.png")}
            />
            <TextInput
              style={{
                marginVertical: 10,
                width: wp("50%"),
                height: hp("4%"),
                fontWeight: "600",
                fontSize: 16,
                fontFamily: "Roboto-Regular",
              }}
              placeholder="Continue with Google"
              placeholderTextColor="#0D3559"
              editable={false}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 42,
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
        <TouchableOpacity>
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
          paddingTop: wp(30),
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
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginHorizontal: 24,
    paddingTop: wp(40),
  },
});
