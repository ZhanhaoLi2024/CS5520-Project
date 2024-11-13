import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { updatePost } from "../../Firebase/firebaseHelper";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";

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
              navigation.navigate("MainTabs", {
                screen: "Explorer",
                params: { screen: "MyPosts" },
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
    <ScrollView style={generalStyles.container}>
      <View style={generalStyles.formContainer}>
        <TextInput
          style={inputStyles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          editable={!submitting}
        />

        <TextInput
          style={[inputStyles.input, inputStyles.descriptionInput]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          editable={!submitting}
        />

        <Pressable style={buttonStyles.imageButton} onPress={pickImage}>
          <Text style={[buttonStyles.imageButtonText, { color: "red" }]}>
            iteration1 has not yet added camera functionality
          </Text>
        </Pressable>
        <Pressable style={buttonStyles.imageButton} onPress={pickImage}>
          <Text style={[buttonStyles.imageButtonText, { color: "red" }]}>
            iteration1 has not yet added location functionality
          </Text>
        </Pressable>

        <Pressable style={buttonStyles.submitButton} onPress={handleSubmit}>
          <Text style={buttonStyles.submitButtonText}>Update Post</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
