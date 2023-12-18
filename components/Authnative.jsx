import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export function Auth() {
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        buttonType: AppleAuthentication.AppleAuthenticationButtonType.CONTINUE,
      });

      if (credential.identityToken) {
        // Handle the received credential
        // Uncomment and modify the following Supabase code if needed
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        if (!error) {
          // User is signed in.
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  if (Platform.OS === "ios") {
    return (
      <View style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={handleAppleSignIn}
        />
      </View>
    );
  }

  return <>{/* Implement Android Auth options. */}</>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
  },
  button: {
    width: wp("87.5%"),
    height: hp("7%"),
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginVertical: 15,
  },
});
