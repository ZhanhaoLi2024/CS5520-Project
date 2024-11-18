import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";

export default function LocationPicker() {
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
    })();
  }, []);

  return (
    <View>
      {errorMsg && <Text>{errorMsg}</Text>}
      {!errorMsg && !location && <Text>Waiting for location...</Text>}
      {location && (
        <Text>
          Location: {location.latitude}, {location.longitude}
        </Text>
      )}
    </View>
  );
}
