import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
  Image,
} from "react-native";
// import * as ImagePicker from "expo-image-picker";
import { createPost } from "../Firebase/firebaseHelper";
import { auth } from "../Firebase/firebaseSetup";

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
        userId: auth.currentUser.uid, // Make sure to include this
        createdAt: new Date().toISOString(),
        // Add any other fields you need
      };

      const result = await createPost(postData);
      if (result.success) {
        Alert.alert("Success", "Post created successfully!", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
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
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== "granted") {
    //   Alert.alert("Permission required", "You need to grant permission to access your media library to pick an image.");
    //   return;
    // }
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (result.cancelled) {
    //   return;
    // }
    // setImage(result.uri);
  };

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
        {/* <Pressable style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>
            {image ? "Change Image" : "Add Image"}
          </Text>
        </Pressable>

        {image && <Image source={{ uri: image }} style={styles.previewImage} />} */}

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Post</Text>
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
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
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
});
