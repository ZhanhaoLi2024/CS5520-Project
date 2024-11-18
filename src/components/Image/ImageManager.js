import React, { useState } from "react";
import { View, Image, Pressable, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";

const ImageManager = ({ onImageTaken }) => {
  const [imageUri, setImageUri] = useState();
  const [cameraPermission] = ImagePicker.useCameraPermissions();

  const verifyPermissions = async () => {
    if (cameraPermission?.granted) {
      return true;
    }

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    return permissionResult.granted;
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Insufficient Permissions!",
          "You need to grant camera permissions to use this feature.",
          [{ text: "Okay" }]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        mediaTypes: ImagePicker.MediaType.Images,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        onImageTaken(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Error taking picture:", err);
      Alert.alert("Error", "Failed to take picture");
    }
  };

  return (
    <View style={generalStyles.imageContainer}>
      <View style={generalStyles.imagePreview}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={generalStyles.image}
            resizeMode="cover"
          />
        ) : (
          <Text>No image taken yet</Text>
        )}
      </View>
      <Pressable style={buttonStyles.imageButton} onPress={takeImageHandler}>
        <Text style={buttonStyles.imageButtonText}>Take Picture</Text>
      </Pressable>
    </View>
  );
};

export default ImageManager;
