import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const VerifyLogin = () => {
  const navigation = useNavigation();
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ marginHorizontal: 24, paddingTop: wp(20) }}>
          <TouchableOpacity>
            <Image
              style={{ resizeMode: "contain", marginBottom: 10 }}
              source={require("../../assets/back.png")}
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
            Verify Login
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "400",
              color: "#0D3559",
            }}
          >
            Enter OTP Code send to your email.
          </Text>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              fontWeight: "400",
              color: "#0D3559",
            }}
          >
            The code will expire in 01:30
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingTop: wp(15),
        }}
      >
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp1(text)}
            value={otp1}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp2(text)}
            value={otp2}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp3(text)}
            value={otp3}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setOtp4(text)}
            value={otp4}
            placeholderTextColor="#3D3D3D"
            keyboardType="phone-pad"
            maxLength={1}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 30,
          flexDirection: "row",
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
          Didn’t received the code?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("EmailRecovery")}>
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              fontWeight: "400",
              color: "#346AFE",
            }}
          >
            {" "}
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#EEF7FE",
    height: hp("26%"),
    width: wp("100%"),
  },
  inputField: {
    height: hp("8%"),
    width: wp("15%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEF7FE",
    marginBottom: wp("5%"),
    backgroundColor: "#EEF7FE",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
});
