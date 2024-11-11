import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
  Image,
} from "react-native";
import { createPost } from "../Firebase/firebaseHelper";
import { auth } from "../Firebase/firebaseSetup";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

export default function NewPost({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return;
    }

    try {
      setSubmitting(true);
      const postData = {
        title: title.trim(),
        description: description.trim(),
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      };

      const result = await createPost(postData);
      if (result.success) {
        Alert.alert("Success", "Post created successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const pickImage = async () => {
    // Placeholder for image picker functionality
  };

  return (
    <ScrollView style={generalStyles.newPostContainer}>
      <View style={generalStyles.formContainer}>
        <TextInput
          style={inputStyles.authInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          editable={!submitting}
        />

        <TextInput
          style={[inputStyles.authInput, inputStyles.descriptionInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          editable={!submitting}
        />

        <Pressable style={buttonStyles.imageButton} onPress={pickImage}>
          <Text style={buttonStyles.imageButtonText}>
            iteration1 has not yet added camera functionality
          </Text>
        </Pressable>
        <Pressable style={buttonStyles.imageButton} onPress={pickImage}>
          <Text style={buttonStyles.imageButtonText}>
            iteration1 has not yet added location functionality
          </Text>
        </Pressable>

        <Pressable style={buttonStyles.submitButton} onPress={handleSubmit}>
          <Text style={buttonStyles.submitButtonText}>Create Post</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
