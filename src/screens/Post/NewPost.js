import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { createPost } from "../../Firebase/firebaseHelper";
import { auth } from "../../Firebase/firebaseSetup";
import { storage } from "../../Firebase/firebaseSetup";
import { ref, uploadBytesResumable } from "firebase/storage";
import LocationPicker from "../../components/Location/LocationPicker";
import ImageManager from "../../components/Image/ImageManager";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";

export default function NewPost({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (route.params?.pickedLocation) {
      setLocation(route.params.pickedLocation);
    }
  }, [route.params]);

  const handleLocationPicked = (pickedLocation) => {
    setLocation(pickedLocation);
  };
  const handleImageTaken = (uri) => {
    setImageUri(uri);
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);

      return uploadResult.metadata.fullPath;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

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
      let imageUrl = null;

      if (imageUri) {
        imageUrl = await uploadImage(imageUri);
      }

      const postData = {
        title: title.trim(),
        description: description.trim(),
        userId: auth.currentUser.uid,
        location: location,
        imageUri: imageUrl,
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

        <ImageManager onImageTaken={handleImageTaken} />

        <LocationPicker onLocationPicked={handleLocationPicked} />

        <Pressable style={buttonStyles.submitButton} onPress={handleSubmit}>
          <Text style={buttonStyles.submitButtonText}>Create Post</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
