import { View, Text } from "react-native";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();

  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length == 6) {
    }
  }, []);

  const verifyCode = async () => {};
  const verifySignIn = async () => {};

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
