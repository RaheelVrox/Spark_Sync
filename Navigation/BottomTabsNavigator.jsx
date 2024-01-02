import { StyleSheet, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomepageOne from "../Screens/HomePage/HomepageOne";
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import Profile from "../Screens/Profile/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import UploadFrontpage from "../Screens/ScanPages/UploadFrontpage";
import { LinearGradient } from "expo-linear-gradient";
import UpdateFrontImage from "../Screens/ScanPages/UpdateFrontImage";
import UpdateBackImage from "../Screens/ScanPages/UpdateBackImage";
import UploadBackpage from "../Screens/ScanPages/UploadBackpage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../apiconfig";
import ForgotPassword from "../Screens/Password Recovery/ForgotPassword";
import LoginRegister from "../Screens/LoginRegister/LoginRegister";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="HomepageOne"
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "",
        }}
        name="HomepageOne"
        component={HomepageOne}
      />
    </Stack.Navigator>
  );
};

const AddNew = ({ navigation }) => {
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      navigation.navigate("AddNew", { screen: "UploadFrontpage" });
    });
    return () => {
      unsubscribeFocus();
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="UploadFrontpage"
      screenOptions={{
        headerShadowVisibl: false,
      }}
    >
      <Stack.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#E81F76",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#9b2890",
          },
          headerStyle: {},
          headerTitleAlign: "center",
        }}
        name="UploadFrontpage"
        component={UploadFrontpage}
      />

      <Stack.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#E81F76",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#9b2890",
          },
          headerStyle: {},
          headerTitleAlign: "center",
        }}
        name="UpdateFrontImage"
        component={UpdateFrontImage}
      />
      <Stack.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#E81F76",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#9b2890",
          },
          headerStyle: {},
          headerTitleAlign: "center",
        }}
        name="UploadBackpage"
        component={UploadBackpage}
      />
      <Stack.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#E81F76",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#9b2890",
          },
          headerStyle: {},
          headerTitleAlign: "center",
        }}
        name="UpdateBackImage"
        component={UpdateBackImage}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({ navigation }) => {
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      // Reset the navigation state to Profile when the EditProfile screen is focused
      navigation.navigate("Profile");
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShadowVisibl: false,
      }}
    >
      <Stack.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#E81F76",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#9b2890",
          },
          headerStyle: {},
          headerTitleAlign: "center",
        }}
        name="Profile"
        component={Profile}
      />

      <Stack.Screen
        options={{
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#E81F76",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "",
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "#9b2890",
          },
          headerStyle: {},
          headerTitleAlign: "center",
        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          tabBarVisible: false, // Hide the bottom tab bar on this screen
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerShown: false,
          tabBarVisible: false, // Hide tab bar on the first screen (Profile)
        })}
        name="LoginRegister"
        component={LoginRegister}
      />
    </Stack.Navigator>
  );
};
const BottomTabsNavigator = () => {
  const insets = useSafeAreaInsets();
  const [profile_image, setProfileImage] = useState(null);
  const [profile_imageCheck, setProfileImageCheck] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const dataAfterParse = JSON.parse(storedUserData);
        setProfileImageCheck(dataAfterParse?.profile_image);
        setProfileImage(
          `${ApiData.url}/profile_image/${dataAfterParse?.profile_image}`
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarActiveTintColor: "#346AFE",
        tabBarInactiveTintColor: "#002896",
        tabBarBackground: () => (
          <LinearGradient
            colors={["#EEF7FE", "#FCEEFE"]}
            style={{
              flex: 1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: "#fff",
              borderColor: "#fff",
            }}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0.6, y: 0.6 }}
          />
        ),
        tabBarStyle: [
          style.tabStyleProp,
          {
            height:
              Platform.OS === "ios" ? 72 + insets.bottom : 72 + insets.bottom,
            backgroundColor: "#fff",
            borderColor: "#fff",
          },
        ],
        tabBarItemStyle: style.tabStyle,
        headerStyle: {
          backgroundColor: "transparent",
          borderColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "HOME",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNew}
        options={{
          tabBarLabel: "ADD NEW",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" color={color} size={size + 5} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "PROFILE",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <>
              <Ionicons
                name="ios-person-circle-sharp"
                color={color}
                size={size + 6}
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabsNavigator;
const style = StyleSheet.create({
  tabStyle: {
    backgroundColor: "transparent",
    paddingBottom: 7,
  },
  tabStyleProp: {
    elevation: 20,
    height: Platform.OS === "ios" ? wp(20) : wp(17),
    marginBottom: Platform.OS === "ios" ? -5 : wp(0),
    position: "relative",
  },
});
