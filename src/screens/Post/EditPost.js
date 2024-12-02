import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { updatePost, uploadPostImage } from "../../Firebase/firebaseHelper";
import { generalStyles } from "../../theme/generalStyles";
import { inputStyles } from "../../theme/inputStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
 // Import Material Icons for the check mark
import ImageManager from "../../components/Image/ImageManager";
import LocationPicker from "../../components/Location/LocationPicker";

export default function EditPost({ route, navigation }) {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [imageUri, setImageUri] = useState(post.imageUri || null);
  const [location, setLocation] = useState(post.location || null);
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

      let imageUrl = post.imageUri;
      if (imageUri && imageUri !== post.imageUri) {
        imageUrl = await uploadPostImage(imageUri);
      }

      const updateData = {
        title: title.trim(),
        description: description.trim(),
        location: locationData,
        imageUri: imageUrl,
      };

      const result = await updatePost(post.id, updateData);
      if (result.success) {
        Alert.alert("Success", "Post updated successfully!", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Explorer", {
                screen: "MyPosts",
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
              {submitting ? "Updating..." : "Update Post"}
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
