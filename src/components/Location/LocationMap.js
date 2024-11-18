import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LocationMap({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialRegion = {
    latitude: 42.3601,
    longitude: -71.0589,
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
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Picked Location" />
        )}
      </MapView>
      <View style={{ padding: 10 }}>
        <Pressable
          style={{
            backgroundColor: selectedLocation ? "blue" : "gray",
            padding: 10,
            alignItems: "center",
          }}
          onPress={savePickedLocationHandler}
          disabled={!selectedLocation}
        >
          <Text style={{ color: "white" }}>Save Location</Text>
        </Pressable>
      </View>
    </View>
  );
}
