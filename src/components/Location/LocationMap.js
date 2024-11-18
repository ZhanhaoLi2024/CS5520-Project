import React, { useState } from "react";
import { View, Pressable, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";

const LocationMap = ({ navigation, route }) => {
  const initialLocation = route.params?.initialLocation || {
    latitude: 42.3601,
    longitude: -71.0589,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [mapRef, setMapRef] = useState(null);

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

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to use this feature."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation(currentLocation);

      // Animate map to new location
      mapRef?.animateToRegion(
        {
          ...currentLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    } catch (error) {
      Alert.alert("Error", "Could not fetch your location.");
    }
  };

  const savePickedLocationHandler = async () => {
    if (!selectedLocation) {
      return;
    }

    try {
      // Get address for selected location
      const address = await Location.reverseGeocodeAsync({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });

      if (address && address.length > 0) {
        const locationInfo = {
          coords: selectedLocation,
          address: formatAddress(address[0]),
        };
        navigation.navigate("NewPost", { pickedLocation: locationInfo });
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch address information.");
      navigation.navigate("NewPost", {
        pickedLocation: { coords: selectedLocation, address: null },
      });
    }
  };

  const formatAddress = (addressObj) => {
    const components = [];
    if (addressObj.name) components.push(addressObj.name);
    if (addressObj.street) components.push(addressObj.street);
    if (addressObj.city) components.push(addressObj.city);
    if (addressObj.region) components.push(addressObj.region);
    if (addressObj.country) components.push(addressObj.country);
    return components.join(", ");
  };

  return (
    <View style={generalStyles.container}>
      <MapView
        ref={setMapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>
      <View style={generalStyles.mapButtons}>
        <Pressable
          style={({ pressed }) => [
            buttonStyles.locationButton,
            pressed && buttonStyles.buttonPressed,
            { marginBottom: 10 },
          ]}
          onPress={getCurrentLocation}
        >
          <Text style={buttonStyles.locationButtonText}>
            Get Current Location
          </Text>
        </Pressable>
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
