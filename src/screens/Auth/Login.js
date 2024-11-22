import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Image } from "react-native";
import { auth } from "../../Firebase/firebaseSetup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";

// Import the logo image
import logo from "../../../assets/Logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in with:", userCredential.user.email);
    } catch (error) {
      let errorMessage = "An error occurred during login";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address format";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
      }
      Alert.alert("Login Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={generalStyles.loginContainer}>
      <Image source={logo} style={generalStyles.logo} />

      <Text style={generalStyles.title}>Welcome to iCook!</Text>

      <TextInput
        style={inputStyles.authInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isSubmitting}
      />

      <TextInput
        style={inputStyles.authInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isSubmitting}
      />

      <Pressable
        style={[
          buttonStyles.authButton,
          isSubmitting && buttonStyles.authButtonDisabled,
        ]}
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        <Text style={buttonStyles.authButtonText}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Text>
      </Pressable>

      {/* Add Forgot Password Link */}
      <Pressable onPress={() => navigation.navigate("ResetPassword")}>
        <Text style={[generalStyles.linkText, { marginBottom: 20 }]}>
          Forgot Password?
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.replace("Signup")}>
        <Text style={generalStyles.loginLinkText}>
          Don't have an account? Sign up
        </Text>
      </Pressable>
    </View>
  );
}
