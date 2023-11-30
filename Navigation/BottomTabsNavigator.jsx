import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomepageOne from "../Screens/HomePage/HomepageOne";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Profile from "../Screens/Profile/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import UploadFrontpage from "../Screens/ScanPages/UploadFrontpage";
import { LinearGradient } from "expo-linear-gradient";
import UpdateFrontImage from "../Screens/ScanPages/UpdateFrontImage";
import UpdateBackImage from "../Screens/ScanPages/UpdateFrontImage";
import UploadBackpage from "../Screens/ScanPages/UploadBackpage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
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
              Platform.OS === "ios" ? 60 + insets.bottom : 60 + insets.bottom,
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
            <Entypo name="home" color={color} size={size} />
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
            <AntDesign name="plus" color={color} size={size} />
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
            <AntDesign name="home" color={color} size={size} />
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
