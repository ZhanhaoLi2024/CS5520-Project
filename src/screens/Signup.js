import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  });

  // 密码强度和匹配检查
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

  // 检查密码是否满足所有要求
  const isPasswordValid = () => {
    return Object.values(passwordStrength).every((value) => value === true);
  };

  const handleSignup = async () => {
    // 基本验证
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // 密码强度验证
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
      console.log("Account created for:", userCredential.user.email);
      navigation.replace("Plan");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  // 渲染密码要求项
  const renderPasswordRequirement = (met, text) => (
    <Text style={[styles.passwordHint, { color: met ? "#4CAF50" : "#666" }]}>
      {met ? "✓" : "○"} {text}
    </Text>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Join iCook Community</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <View style={styles.passwordRules}>
          <Text style={styles.passwordTitle}>Password Requirements:</Text>
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
          style={[styles.button, !isPasswordValid() && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={!isPasswordValid()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.replace("Login")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Already have an account? Log in</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
    color: "#1a1a1a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ffb3b3",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkContainer: {
    padding: 10,
    marginBottom: 20,
  },
  linkText: {
    color: "#FF6B6B",
    textAlign: "center",
    fontSize: 14,
  },
  passwordRules: {
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
  },
  passwordTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  passwordHint: {
    fontSize: 12,
    marginBottom: 5,
  },
});
