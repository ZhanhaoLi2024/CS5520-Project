import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { generalStyles } from "../../theme/generalStyles";

export default function ImageManager() {
  const [imageUri, setImageUri] = useState();

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
