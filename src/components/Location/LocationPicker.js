import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import * as Location from "expo-location";

export default function LocationPicker({ onLocationPicked }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      onLocationPicked({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const getMapPreview = (latitude, longitude) => {
    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  };

  return (
    <View>
      {errorMsg && <Text>{errorMsg}</Text>}
      {!errorMsg && !location && <Text>Waiting for location...</Text>}
      {location && (
        <Image
          style={{ width: "100%", height: 200 }}
          source={{ uri: getMapPreview(location.latitude, location.longitude) }}
        />
      )}
      <Pressable
        style={{
          backgroundColor: "blue",
          padding: 10,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={() => {
          /* Add navigation logic later */
        }}
      >
        <Text style={{ color: "white" }}>Pick on Map</Text>
      </Pressable>
    </View>
  );
}
