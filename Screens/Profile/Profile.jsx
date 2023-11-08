import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const Profile = () => {
    const navigation = useNavigation();
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
                    <View style={{ marginHorizontal: 24, paddingTop: wp(15) }}>
                        <Image
                            style={{
                                resizeMode: "contain", marginBottom: 16,
                                alignSelf: 'center'
                            }}
                            source={require("../../assets/profile.png")}
                        />
                        <Text
                            style={{
                                fontFamily: "Roboto-Regular",
                                fontSize: 24,
                                fontWeight: "600",
                                color: "#0D3559",
                                textAlign: "center"
                            }}
                        >
                            Faris Husain
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Roboto-Regular",
                                fontSize: 16,
                                fontWeight: "400",
                                color: "#0D3559",
                                textAlign: "center",
                                marginTop: 8
                            }}
                        >
                            1234 Some house, Some street
                            Houston, Texas.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}
                        style={{
                            height: 34,
                            width: 107,
                            backgroundColor: "#002896",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            alignSelf: "center",
                            marginTop: 16
                        }}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.detailContainer}>
                <View style={{ marginHorizontal: 16, paddingTop: 16 }}>
                    <Text style={styles.text}>Reset Password</Text>
                    <Text style={styles.text}>Contact</Text>
                    <Text style={styles.text}>Terms of Services</Text>
                    <Text style={styles.text}>Privacy Policy</Text>
                    <Text style={styles.text}>Sign Out</Text>
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        height: hp("35%"),
        width: wp("100%"),
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    buttonText: {
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
    },
    detailContainer: {
        backgroundColor: "#EEF7FE",
        marginHorizontal: 24,
        borderRadius: 10,
        marginTop: 40,
        height: hp("30%"),
        // width: wp("90%"),
        // height:272,
        // width:380,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: "600",
        color: "#122359",
        lineHeight: 45,
    },
})