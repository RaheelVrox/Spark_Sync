import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";

const ConfirmationPage = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={toggleBottomSheet} />

      <Modal
        isVisible={isBottomSheetVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ justifyContent: "flex-start", margin: 0 }}
      >
        <LinearGradient
          colors={["#EEF7FE", "#FCEEFE"]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0.6, y: 0.6 }}
          style={[
            styles.bottomSheetContainer,
            {
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              height: hp("75%"),
            },
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: wp("40%"),
              fontSize: 24,
              fontWeight: "600",
              fontFamily: "Roboto-Regular",
              color: "#122359",
              marginHorizontal: 24,
              marginBottom: 70,
            }}
          >
            Please confirm sending your bill to SparkSync
          </Text>
          <View style={styles.buttonContainer}>
            <>
              <TouchableOpacity
                style={{
                  width: wp("27%"),
                  height: hp("6.5%"),
                  backgroundColor: "#002896",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleBottomSheet}
                style={{
                  width: wp("27%"),
                  height: hp("6.5%"),
                  backgroundColor: "#858585",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 35,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ConfirmationPage;
