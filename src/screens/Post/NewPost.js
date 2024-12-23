import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { createPost, uploadPostImage } from "../../Firebase/firebaseHelper";
import { auth } from "../../Firebase/firebaseSetup";
import LocationPicker from "../../components/Location/LocationPicker";
import ImageManager from "../../components/Image/ImageManager";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons for the check mark

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

      const locationData = location
        ? {
            coords: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            address: location.address || null,
          }
        : null;

      let imageUrl = null;
      if (imageUri) {
        imageUrl = await uploadPostImage(imageUri);
      }

      const postData = {
        title: title.trim(),
        description: description.trim(),
        userId: auth.currentUser.uid,
        location: locationData,
        imageUri: imageUrl,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        likedBy: [],
        commentsCount: 0,
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

        <Pressable
          style={[
            buttonStyles.submitButton,
            submitting && buttonStyles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <View style={buttonStyles.buttonContent}>
            {!submitting && (
              <MaterialIcons
                name="check-circle"
                size={20}
                color="#FFF"
                style={buttonStyles.iconSpacing}
              />
            )}
            <Text style={buttonStyles.submitButtonText}>
              {submitting ? "Creating..." : "Create Post"}
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
