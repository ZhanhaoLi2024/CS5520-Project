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
import { db } from "../Firebase/firebaseSetup";
import {
  signOut,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserProfile();
    // Set up navigation options
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const loadUserProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);

      // Try to get additional user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName || "");
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Update display name in Firebase Auth
      await updateProfile(user, {
        displayName: displayName,
      });

      // Update or create user document in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          displayName: displayName,
          email: user.email,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>{email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Display Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your name"
            />
          ) : (
            <Text style={styles.text}>{displayName || "Not set"}</Text>
          )}
        </View>

        <Pressable
          style={styles.button}
          onPress={() => {
            if (isEditing) {
              handleUpdateProfile();
            }
            setIsEditing(!isEditing);
          }}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ffb3b3",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
