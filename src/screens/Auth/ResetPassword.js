import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { auth } from "../../Firebase/firebaseSetup";
import { sendPasswordResetEmail } from "firebase/auth";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      let errorMessage = "An error occurred while resetting password";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address format";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={generalStyles.authContainer}>
      <Text style={generalStyles.title}>Reset Password</Text>
      <Text style={generalStyles.subtitle}>
        Enter your email address and we'll send you instructions to reset your
        password.
      </Text>

      <TextInput
        style={inputStyles.authInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isSubmitting}
      />

      <Pressable
        style={[
          buttonStyles.authButton,
          isSubmitting && buttonStyles.authButtonDisabled,
        ]}
        onPress={handleResetPassword}
        disabled={isSubmitting}
      >
        <Text style={buttonStyles.authButtonText}>
          {isSubmitting ? "Sending..." : "Reset Password"}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={generalStyles.linkText}>Back to Login</Text>
      </Pressable>
    </View>
  );
}
