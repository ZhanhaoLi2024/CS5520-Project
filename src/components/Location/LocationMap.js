import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

export default function LocationMap() {
  const initialRegion = {
    latitude: 42.3601,
    longitude: -71.0589,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={initialRegion} />
    </View>
  );
}
