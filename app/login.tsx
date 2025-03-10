import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    const { supportedFirstFactors } = await signIn!.create({
      identifier: fullPhoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
      return factor.strategy === "phone_code";
    });

    if (!firstPhoneFactor) {
      console.error("No phone factor found");
      return;
    }

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push({
      pathname: "/verify/[phone]",
      params: { phone: fullPhoneNumber, signin: "true" },
    });
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Welcome back!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number. We will send you a confirmation code there.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Country Code"
          placeholderTextColor={Colors.gray}
          value={countryCode}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Phone Number"
          placeholderTextColor={Colors.gray}
          keyboardType="numeric"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber.length > 0 ? styles.enabled : styles.disabled,
          { marginBottom: 20 },
        ]}
        onPress={onSignIn}
      >
        <Text style={defaultStyles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 12,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Login;
