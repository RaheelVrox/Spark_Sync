import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons'
const DataPage = () => {
  const goBack = () => {
    navigation.goBack();
  };
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
          <View>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "#0D3559",
                marginBottom: 4,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Faris Husain
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 16,
                fontWeight: "500",
                color: "#0D3559",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              1234 Some house, Some street Houston, Texas.
            </Text>
          </View>
          <View style={{ paddingTop: wp(4) }}>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>
                Total amount due by 31/01/2023:
              </Text>
              <Text style={styles.textMedium}>$ 80.45</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Current month's Usage:</Text>
              <Text style={styles.textMedium}>380 KWh</Text>
            </View>
            <View style={{ paddingTop: wp(7) }}>
              <View style={styles.rowContainer}>
                <Text style={styles.textBold}>Energy From</Text>
                <Text style={styles.textMedium}>Cirro Energy</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Plan:</Text>
              <Text style={styles.textMedium}>12 month</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>CNE Account ID:</Text>
              <Text style={styles.textMedium}>1-5463547326</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Utility Number:</Text>
              <Text style={styles.textMedium}>23744958312849371028593</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Service Periods:</Text>
              <Text style={styles.textMedium}>01/01/2023 to 31.12.2023</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Statement Number:</Text>
              <Text style={styles.textMedium}>01/01/2023 to 31.12.2023</Text>
            </View>
            <View style={{ paddingTop: wp(7) }}>
              <View style={styles.rowContainer}>
                <Text style={styles.textBold}>Taxes:</Text>
                <Text style={styles.textMedium}>$ 3.56</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Adjustment</Text>
              <Text style={styles.textMedium}>$ 0.00</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Trijunction line losses:</Text>
              <Text style={styles.textMedium}>$ 0.00</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Electric Supply Charges:</Text>
              <Text style={styles.textMedium}>$ 14.41</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>Market Charges</Text>
              <Text style={styles.textMedium}>$ 0.15</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textBold}>UDC Charges</Text>
              <Text style={styles.textMedium}>$ 22.50</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("EditDataPage")}>
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

        <TouchableOpacity onPress={() => navigation.navigate("FrontPageScan")}>
          <View style={styles.button}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "Roboto-Regular",
                color: "#fff",
              }}
            >
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DataPage;

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
    height: hp("73%"),
    width: wp("88%"),
    borderWidth: 1,
    borderColor: "#B2C3D1",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 65,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  textBold: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    fontWeight: "700",
    color: "#0D3559",
  },
  textMedium: {
    flex: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    fontWeight: "400",
    color: "#0D3559",
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
    marginTop: 25,
  },
  button: {
    width: wp("85%"),
    height: hp("7%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#346AFE",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#346AFE",
    alignSelf: "center",
    marginBottom: 50,
  },
});
