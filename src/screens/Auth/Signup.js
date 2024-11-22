import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { auth, db } from "../../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { createUserInFirestore } from "../../Firebase/firebaseHelper";

export default function Signup({ navigation, onGuestMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // 新增用户名状态
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  });

  const handleSkip = () => {
    onGuestMode();
    navigation.navigate("MainTabs");
  };

  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
      passwordsMatch:
        password === confirmPassword &&
        password !== "" &&
        confirmPassword !== "",
    });
  }, [password, confirmPassword]);

  const isPasswordValid = () => {
    return Object.values(passwordStrength).every((value) => value === true);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isPasswordValid()) {
      Alert.alert(
        "Weak Password",
        "Please make sure your password meets all the requirements"
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const result = await createUserInFirestore(userCredential.user.uid, {
        username,
        email,
      });

      if (result.success) {
        console.log("Account created successfully for:", email);
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "An error occurred during signup");
    }
  };

  const renderPasswordRequirement = (met, text) => (
    <Text
      style={[generalStyles.passwordHint, { color: met ? "#4CAF50" : "#666" }]}
    >
      {met ? "✓" : "○"} {text}
    </Text>
  );

  return (
    <View style={generalStyles.signupContainer}>
      <ScrollView>
        <Text style={generalStyles.signupTitle}>Join iCook Community</Text>

        <TextInput
          style={inputStyles.authInput}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={inputStyles.authInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={inputStyles.authInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={inputStyles.authInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <View style={generalStyles.passwordRules}>
          <Text style={generalStyles.passwordTitle}>
            Password Requirements:
          </Text>
          {renderPasswordRequirement(
            passwordStrength.length,
            "At least 6 characters long"
          )}
          {renderPasswordRequirement(
            passwordStrength.hasUpperCase,
            "Contains uppercase letter (A-Z)"
          )}
          {renderPasswordRequirement(
            passwordStrength.hasLowerCase,
            "Contains lowercase letter (a-z)"
          )}
          {renderPasswordRequirement(
            passwordStrength.hasNumber,
            "Contains number (0-9)"
          )}
          {renderPasswordRequirement(
            passwordStrength.hasSpecialChar,
            "Contains special character (!@#$%^&*)"
          )}
          {renderPasswordRequirement(
            passwordStrength.passwordsMatch,
            "Passwords match"
          )}
        </View>

        <Pressable
          style={[
            buttonStyles.authButton,
            !isPasswordValid() && buttonStyles.authButtonDisabled,
          ]}
          onPress={handleSignup}
          disabled={!isPasswordValid()}
        >
          <Text style={buttonStyles.authButtonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => navigation.replace("LoginScreen")}>
          <Text style={generalStyles.linkText}>
            Already have an account? Log in
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
