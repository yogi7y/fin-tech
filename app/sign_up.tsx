import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { signUp } = useSignUp();

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    router.push({
      pathname: "/verify/[phone]",
      params: { phone: fullPhoneNumber },
    });

    // try {
    //   await signUp?.create({
    //     phoneNumber: fullPhoneNumber,
    //   });

    //   router.push({
    //     pathname: "/verify/[phone]",
    //     params: {
    //       phone: fullPhoneNumber,
    //     },
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's get you started!</Text>
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

      <Link href="/login" asChild replace>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </Link>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber.length > 0 ? styles.enabled : styles.disabled,
          { marginBottom: 20 },
        ]}
        onPress={onSignup}
      >
        <Text style={defaultStyles.buttonText}>Sign up</Text>
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

export default SignUp;
