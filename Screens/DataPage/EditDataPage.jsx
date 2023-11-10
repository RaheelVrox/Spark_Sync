import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const EditDataPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddres] = useState("");
  const [amount, setAmount] = useState("");
  const [current, setCurrent] = useState("");
  const [energy, setEnergy] = useState("");
  const [plan, setPlan] = useState("");
  const [amountId, setAmountId] = useState("");
  const [utilitynumber, setUtilityNumber] = useState("");
  const [service, setService] = useState("");
  const [statement, setStatement] = useState("");
  const [taxes, setTaxes] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [trijunction, setTrijunction] = useState("");
  const [electric, setElectric] = useState("");
  const [marketcharges, setMarketCharges] = useState("");
  const [charges, setCharges] = useState("");
  const goBack = () => {
    navigation.goBack();
  };
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
            <TouchableOpacity style={styles.backbut} onPress={goBack}>
              <Ionicons name="ios-chevron-back-sharp" size={28} color="#670097" />
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
              Welcome Faris
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "400",
                color: "#0D3559",
              }}
            >
              Please check your data before go forward
            </Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView>
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
          {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.textBold}>Name</Text>
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
        </View> */}
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
          <View style={{ paddingTop: wp(7) }}>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Total amount due by 31/01/2023:</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Total Amount"
                    style={styles.inputField}
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textBold}>Current month Usage:</Text>
            <View>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Current Month Usage"
                  style={styles.inputField}
                  value={current}
                  onChangeText={(text) => setCurrent(text)}
                  placeholderTextColor="#3D3D3D"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View style={{ paddingTop: wp(7) }}>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Energy From</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Cirro Energy"
                    style={styles.inputField}
                    value={energy}
                    onChangeText={(text) => setEnergy(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textBold}>Plan:</Text>
            <View>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Plan"
                  style={styles.inputField}
                  value={plan}
                  onChangeText={(text) => setPlan(text)}
                  placeholderTextColor="#3D3D3D"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textBold}>CNE Account ID:</Text>
            <View>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Account ID"
                  style={styles.inputField}
                  value={amountId}
                  onChangeText={(text) => setAmountId(text)}
                  placeholderTextColor="#3D3D3D"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textBold}>Utility Number:</Text>
            <View>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Utility Number"
                  style={styles.inputField}
                  value={utilitynumber}
                  onChangeText={(text) => setUtilityNumber(text)}
                  placeholderTextColor="#3D3D3D"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textBold}>Service Periods:</Text>
            <View>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Service Periods"
                  style={styles.inputField}
                  value={service}
                  onChangeText={(text) => setService(text)}
                  placeholderTextColor="#3D3D3D"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textBold}>Statement Number:</Text>
            <View>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  placeholder="Statement Number"
                  style={styles.inputField}
                  value={statement}
                  onChangeText={(text) => setStatement(text)}
                  placeholderTextColor="#3D3D3D"
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View style={{ paddingTop: wp(7) }}>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Taxes:</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Taxes"
                    style={styles.inputField}
                    value={statement}
                    onChangeText={(taxes) => setTaxes(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Adjustment</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Adjustment"
                    style={styles.inputField}
                    value={adjustment}
                    onChangeText={(taxes) => setAdjustment(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Trijunction line losses:</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Trijunction line losses"
                    style={styles.inputField}
                    value={trijunction}
                    onChangeText={(taxes) => setTrijunction(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Electric Supply Charges:</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Electric Supply Charges"
                    style={styles.inputField}
                    value={electric}
                    onChangeText={(taxes) => setElectric(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Market Charges</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="Market Charges"
                    style={styles.inputField}
                    value={marketcharges}
                    onChangeText={(taxes) => setMarketCharges(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>UDC Charges</Text>
              <View>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TextInput
                    placeholder="UDC Charges"
                    style={styles.inputField}
                    value={charges}
                    onChangeText={(taxes) => setCharges(text)}
                    placeholderTextColor="#3D3D3D"
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.Editbutton}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    fontFamily: "Roboto-Regular",
                    color: "#fff",
                  }}
                >
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditDataPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //     justifyContent: "center",
    //     alignItems: "center",
  },
  headerContainer: {
    height: hp("25%"),
    width: wp("100%"),
  },
  backbut: {
    height: hp("5.5%"),
    width: wp("11%"),
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  detailContainer: {
    height: hp("148%"),
    width: wp("90%"),
    borderWidth: 1,
    borderColor: "#B2C3D1",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 50
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 8,
  },
  textBold: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    fontWeight: "700",
    color: "#0D3559",
  },
  inputField: {
    height: hp("6%"),
    width: wp("50%"),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EEF7FE",
    paddingLeft: wp(4),
    backgroundColor: "#EEF7FE",
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    justifyContent: "center",
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
});
