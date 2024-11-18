import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { generalStyles } from "../../theme/generalStyles";

export default function ImageManager() {
  const [imageUri, setImageUri] = useState();

  const verifyPermissions = async () => {
    const [permissionResponse, requestPermission] =
      ImagePicker.useCameraPermissions();

    if (permissionResponse.granted) {
      return true;
    }

    const result = await requestPermission();
    return result.granted;
  };

  return (
    <View style={generalStyles.imageContainer}>
      <View style={generalStyles.imagePreview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={generalStyles.image} />
        ) : (
          <Text>No image taken yet</Text>
        )}
      </View>
    </View>
  );
}
