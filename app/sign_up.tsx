import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
const SignUp = () => {
  const onSignup = async () => {};

  return (
    <View style={styles.container}>
      <Text style={defaultStyles.header}>Sign Up</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number. We will send you a confirmation code there.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} />
      </View>
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
  input: {},
});

export default SignUp;
