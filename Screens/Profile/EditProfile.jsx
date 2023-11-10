import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
const EditProfile = () => {
    const [name, setName] = useState("");
    const [address, setAddres] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
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
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#122359",
                                textAlign: "center"
                            }}
                        >
                            Edit Picture
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.detailContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.textBold}>Name</Text>
                    <View>
                        <KeyboardAvoidingView
                            enabled
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <TextInput
                                placeholder="Your Name"
                                style={styles.inputField}
                                value={name}
                                onChangeText={(text) => setName(text)}
                                placeholderTextColor="#3D3D3D"
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.textBold}>Address</Text>
                    <View>
                        <KeyboardAvoidingView
                            enabled
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <TextInput
                                placeholder="Your Address"
                                style={styles.inputField}
                                value={address}
                                onChangeText={(text) => setAddres(text)}
                                placeholderTextColor="#3D3D3D"
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.textBold}>Phone Number</Text>
                    <View>
                        <KeyboardAvoidingView
                            enabled
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <TextInput
                                placeholder="Phone Number"
                                style={styles.inputField}
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                placeholderTextColor="#3D3D3D"
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.textBold}>Email</Text>
                    <View>
                        <KeyboardAvoidingView
                            enabled
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <TextInput
                                placeholder="Your Email"
                                style={styles.inputField}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholderTextColor="#3D3D3D"
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
                <TouchableOpacity style={styles.Editbutton}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "600",
                            fontFamily: "Roboto-Regular",
                            color: "#fff",
                        }}
                    >
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile

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
    detailContainer: {
        backgroundColor: "#EEF7FE",
        marginHorizontal: 24,
        borderRadius: 10,
        marginTop: 40,
        height: hp("44%"),
        // width: wp("90%"),
        // height:272,
        // width:380,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 8,
        marginTop: 8,
    },
    inputField: {
        height: hp("5%"),
        width: wp("50%"),
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#fff",
        paddingLeft: wp(4),
        backgroundColor: "#fff",
        fontWeight: "400",
        fontSize: 14,
        fontFamily: "Roboto-Regular",
        justifyContent: "center",
    },
    textBold: {
        flex: 1,
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        fontWeight: "700",
        color: "#122359",
    },
    Editbutton: {
        width: wp("22%"),
        height: hp("5%"),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#346AFE",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#346AFE",
        alignSelf: "center",
        marginTop: 30,
    },
})