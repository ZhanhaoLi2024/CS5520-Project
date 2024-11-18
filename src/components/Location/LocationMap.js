import React, { useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function LocationMap() {
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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={selectLocationHandler}
      />
    </View>
  );
}
