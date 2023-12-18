import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";

export default function AuthApple() {
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
      if (isAvailable) {
        const credentialJson = await SecureStore.getItemAsync(
          "apple-credentials"
        );
        setUserToken(JSON.parse(credentialJson));
      }
    };

    checkAvailable();
  }, []);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      setUserToken(credential);
      SecureStore.setItemAsync("apple-credentials", JSON.stringify(credential));
    } catch (e) {
      // console.log(e);
    }
  };

  const getCredentialState = async () => {
    const credentialState = await AppleAuthentication.getCredentialStateAsync(
      userToken.user
    );
  };

  const logout = async () => {
    SecureStore.deleteItemAsync("apple-credentials");
    setUserToken(undefined);
  };

  const refresh = async () => {
    const result = await AppleAuthentication.refreshAsync({
      user: userToken.user,
    });
    setUserToken(result);
    SecureStore.setItemAsync("apple-credentials", JSON.stringify(result));
  };

  const getAppleAuthContent = () => {
    if (!userToken) {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={login}
        />
      );
    } else {
      const identityToken = userToken.identityToken;
      if (identityToken) {
        const parts = identityToken
          .split(".")
          .map((part) =>
            Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64")
          );
        const decodedPayload = JSON.parse(parts[1].toString("utf-8"));
        const current = Date.now() / 1000;

        return (
          <View>
            <Text>{decodedPayload.email}</Text>
            <Text>Expired: {(current >= decodedPayload.exp).toString()}</Text>

            <Button
              title="Logout"
              onPress={logout}
              style={styles.logoutButton}
            />

            {/* <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text
                style={{
                  color: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity> */}

            <Button title="Refresh" onPress={refresh} />
            <Button title="Get Credential State" onPress={getCredentialState} />
          </View>
        );
      } else {
        return <Text>Identity Token not available</Text>;
      }
    }
  };

  return (
    <View style={styles.container}>
      {appleAuthAvailable ? (
        getAppleAuthContent()
      ) : (
        <Text>Apple auth unavailable</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 80,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  logoutButton: {
    width: 150,
    height: 40,
    // marginTop: 80,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
