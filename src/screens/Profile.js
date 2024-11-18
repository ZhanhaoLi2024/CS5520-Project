import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { auth, db } from "../Firebase/firebaseSetup";
import {
  signOut,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

export default function Profile({ navigation }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserProfile();
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            buttonStyles.logoutButton,
            pressed && buttonStyles.buttonPressed,
          ]}
        >
          <Text style={buttonStyles.logoutButtonText}>Logout</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const loadUserProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserName(userDoc.data().username || "");
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateProfile(user, { username });
      await setDoc(
        doc(db, "users", user.uid),
        { username, email: user.email, updatedAt: new Date().toISOString() },
        { merge: true }
      );
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setNewPassword("");
      setCurrentPassword("");
      Alert.alert("Success", "Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update password");
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
    <ScrollView style={generalStyles.profileContainer}>
      <View style={generalStyles.profileSection}>
        <Text style={generalStyles.sectionTitle}>Profile Information</Text>
        <View style={generalStyles.infoContainer}>
          <Text style={generalStyles.profileLabel}>User's Email</Text>
          <Text style={generalStyles.profileText}>{email}</Text>
        </View>

        <View style={generalStyles.infoContainer}>
          <Text style={generalStyles.profileLabel}>User's Name</Text>
          {isEditing ? (
            <TextInput
              style={inputStyles.profileInput}
              value={username}
              onChangeText={setUserName}
              placeholder="Enter your name"
            />
          ) : (
            <Text style={generalStyles.profileText}>
              {username || "Not set"}
            </Text>
          )}
        </View>

        <Pressable
          style={buttonStyles.profileButton}
          onPress={() => {
            if (isEditing) {
              handleUpdateProfile();
            }
            setIsEditing(!isEditing);
          }}
        >
          <Text style={buttonStyles.profileButtonText}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Text>
        </Pressable>
      </View>

      <View style={generalStyles.profileSection}>
        <Text style={generalStyles.sectionTitle}>Change Password</Text>
        <TextInput
          style={inputStyles.profileInput}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          style={inputStyles.profileInput}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Pressable
          style={[
            buttonStyles.profileButton,
            (!currentPassword || !newPassword) && buttonStyles.buttonDisabled,
          ]}
          onPress={handleUpdatePassword}
          disabled={!currentPassword || !newPassword}
        >
          <Text style={buttonStyles.profileButtonText}>Update Password</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
