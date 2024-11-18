import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";

const LocationPicker = ({ onLocationPicked }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Get location permissions and initial location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Only get current location if we don't have one already
      if (!location) {
        let currentLocation = await Location.getCurrentPositionAsync({});
        const newLocation = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };
        setLocation(newLocation);
        onLocationPicked(newLocation);
      }
    })();
  }, []);

  // Listen for location picked from map
  useEffect(() => {
    if (route.params?.pickedLocation) {
      setLocation(route.params.pickedLocation);
      onLocationPicked(route.params.pickedLocation);
    }
  }, [route.params]);

  // Generate static map URL
  const getMapPreview = (latitude, longitude) => {
    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  };

  // Handler for "Pick on Map" button
  const pickOnMapHandler = () => {
    navigation.navigate("LocationMap", {
      initialLocation: location || {
        latitude: 42.3601, // Default to Boston coordinates if no location
        longitude: -71.0589,
      },
    });
  };

  let locationDisplay = <Text>Waiting for location...</Text>;

  if (errorMsg) {
    locationDisplay = <Text style={generalStyles.errorText}>{errorMsg}</Text>;
  } else if (location) {
    locationDisplay = (
      <Image
        style={generalStyles.mapPreview}
        source={{
          uri: getMapPreview(location.latitude, location.longitude),
        }}
      />
    );
  }

  return (
    <View style={generalStyles.locationContainer}>
      <View style={generalStyles.mapPreviewContainer}>{locationDisplay}</View>
      <Pressable
        style={({ pressed }) => [
          buttonStyles.locationButton,
          pressed && buttonStyles.buttonPressed,
        ]}
        onPress={pickOnMapHandler}
      >
        <Text style={buttonStyles.locationButtonText}>
          {location ? "Change Location" : "Pick on Map"}
        </Text>
      </Pressable>
    </View>
  );
};

export default LocationPicker;
