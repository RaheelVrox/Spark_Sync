import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomepageOne from "../Screens/HomePage/HomepageOne";
import { AntDesign } from "@expo/vector-icons";
import Profile from "../Screens/Profile/Profile";
import EditProfile from "../Screens/Profile/EditProfile";

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
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShadowVisible: false,
        tabBarLabelStyle: { fontSize: 10 },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#9b2890",
        tabBarStyle: [
          style.tabStyleProp,
          {
            height: 55,
            paddingBottom: 5,
          },
        ],
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
            <AntDesign name="home" color={color} size={size} />
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
const style = StyleSheet.create({});
