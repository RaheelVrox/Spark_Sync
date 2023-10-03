import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const LodingPage = () => {
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
            We'll analyze your data and give you the best offer.
          </Text>
        </View>
      </View>
    </View>
  )
}

export default LodingPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
})