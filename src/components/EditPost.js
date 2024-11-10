import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { updatePost } from "../Firebase/firebaseHelper";

export default function EditPost({ route, navigation }) {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
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
      const updateData = {
        title: title.trim(),
        description: description.trim(),
      };

      const result = await updatePost(post.id, updateData);
      if (result.success) {
        Alert.alert("Success", "Post updated successfully!", [
          {
            text: "OK",
            onPress: () => {
              // Navigate back to Explorer screen
              navigation.navigate("MainTabs", {
                screen: "Explorer",
                params: {
                  screen: "MyPosts",
                },
              });
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      Alert.alert("Error", "Failed to update post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const pickImage = () => {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          editable={!submitting}
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          editable={!submitting}
        />

        <Pressable style={styles.imageButton} onPress={pickImage}>
          <Text style={[styles.imageButtonText, { color: "red" }]}>
            iteration1 has not yet added camera functionality
            {/* {image ? "Change Image" : "Add Image"} */}
          </Text>
        </Pressable>
        <Pressable style={styles.imageButton} onPress={pickImage}>
          <Text style={[styles.imageButtonText, { color: "red" }]}>
            iteration1 has not yet added location functionality
            {/* {image ? "Change Image" : "Add Image"} */}
          </Text>
        </Pressable>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update Post</Text>
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
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  imageButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  imageButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
