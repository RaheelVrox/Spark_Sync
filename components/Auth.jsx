import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as SecureStore from "expo-secure-store";

export function AuthApple() {
  const [isFirstSignIn, setIsFirstSignIn] = useState(true);

  useEffect(() => {
    // Check if the user has signed in before
    SecureStore.getItemAsync("appleAuthToken").then((token) => {
      if (token) {
        setIsFirstSignIn(false);
      }
    });
  }, []);

  const handleAppleSignUp = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("Apple Sign-In Success:", credential);

      // Check the received user information
      console.log("Email:", credential.email);
      console.log("AppleAuthentication:", credential.fullName);

      // Store the token securely only on the first sign-in
      if (isFirstSignIn && credential.identityToken) {
        await SecureStore.setItemAsync(
          "appleAuthToken",
          credential.identityToken
        );
        // Alert.alert(
        //   "Token Stored",
        //   "Apple Authentication token has been stored."
        // );
        setIsFirstSignIn(false); // Update state to indicate subsequent sign-ins
      }

      console.log("Credential Data:", credential);
    } catch (e) {
      console.error("Apple Sign-In Error:", e);

      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
        Alert.alert("Sign-In Canceled", "You canceled the Apple Sign-In.");
      } else {
        // handle other errors
        Alert.alert(
          "Sign-In Error",
          "An error occurred during Apple Sign-In. Please try again."
        );
      }
    }
  };

  if (Platform.OS === "ios") {
    return (
      <View style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 64 }}
          onPress={handleAppleSignUp}
        />
      </View>
    );
  }

  return null; // Return null for non-iOS platforms
}
export default AuthApple;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
