import { StyleSheet, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomepageOne from "../Screens/HomePage/HomepageOne";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Profile from "../Screens/Profile/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import UploadFrontpage from "../Screens/ScanPages/UploadFrontpage";
import { LinearGradient } from "expo-linear-gradient";
import UpdateFrontImage from "../Screens/ScanPages/UpdateFrontImage";
import UpdateBackImage from "../Screens/ScanPages/UpdateFrontImage";
import UploadBackpage from "../Screens/ScanPages/UploadBackpage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiData from "../apiconfig";

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
  return (
    <Stack.Navigator
      initialRouteName="AddNew"
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
    </Stack.Navigator>
  );
};
const BottomTabsNavigator = () => {
  const insets = useSafeAreaInsets();
  const [profile_image, setProfileImage] = useState(null);
  const [profile_imageCheck, setProfileImageCheck] = useState(null);

  console.log("profile_image", profile_image);

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
            style={{ flex: 1 }}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0.6, y: 0.6 }}
          />
        ),
        tabBarStyle: [
          {
            height:
              Platform.OS === "ios" ? 62 + insets.bottom : 62 + insets.bottom,
          },
        ],
        tabBarItemStyle: style.tabStyle,
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size + 5} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNew"
        component={AddNew}
        options={{
          tabBarLabel: "Add New",
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
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <>
              {/* {profile_imageCheck ? (
                <Image
                  style={{
                    resizeMode: "contain",
                    alignSelf: "center",
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: profile_image,
                  }}
                /> */}
              {/* ) : ( */}
              <Ionicons
                name="ios-person-circle-sharp"
                color={color}
                size={size + 5}
              />
              {/* <Image
                  style={{
                    resizeMode: "contain",
                    alignSelf: "center",
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                  }}
                  source={require("../assets/profile_img.png")}
                /> */}
              {/* )} */}
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
    paddingBottom: 5,
  },
});
