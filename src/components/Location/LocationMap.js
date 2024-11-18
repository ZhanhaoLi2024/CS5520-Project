import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";

const LocationMap = ({ navigation, route }) => {
  // Get initial location from navigation params or use default
  const initialLocation = route.params?.initialLocation || {
    latitude: 42.3601,
    longitude: -71.0589,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const initialRegion = {
    ...initialLocation,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      return;
    }
    navigation.navigate("NewPost", { pickedLocation: selectedLocation });
  };

  return (
    <View style={generalStyles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Picked Location" />
        )}
      </MapView>
      <View style={generalStyles.mapButtons}>
        <Pressable
          style={({ pressed }) => [
            buttonStyles.submitButton,
            pressed && buttonStyles.buttonPressed,
          ]}
          onPress={savePickedLocationHandler}
        >
          <Text style={buttonStyles.submitButtonText}>Confirm Location</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LocationMap;
