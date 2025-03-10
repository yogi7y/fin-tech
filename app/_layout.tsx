import Colors from "@/constants/Colors";
import { Link, router, SplashScreen, Stack, useRouter } from "expo-router";
import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo/dist/cache/types";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

const InitialLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign_up"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={28} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={28} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"/help"} asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={28}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY!}
        tokenCache={createTokenCache()}
      >
        <InitialLayout />
      </ClerkProvider>
    </>
  );
};

export default RootLayout;
