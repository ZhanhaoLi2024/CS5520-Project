import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons

const LocationPicker = ({ onLocationPicked }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      if (!location) {
        let currentLocation = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        // Get address for current location
        try {
          const addressResponse = await Location.reverseGeocodeAsync(coords);
          if (addressResponse && addressResponse.length > 0) {
            const addressInfo = formatAddress(addressResponse[0]);
            setAddress(addressInfo);
            setLocation({ coords, address: addressInfo });
            onLocationPicked({ coords, address: addressInfo });
          }
        } catch (error) {
          console.error("Error getting address:", error);
          setLocation({ coords, address: null });
          onLocationPicked({ coords, address: null });
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (route.params?.pickedLocation) {
      setLocation(route.params.pickedLocation);
      setAddress(route.params.pickedLocation.address);
      onLocationPicked(route.params.pickedLocation);
    }
  }, [route.params]);

  const formatAddress = (addressObj) => {
    const components = [];
    if (addressObj.name) components.push(addressObj.name);
    if (addressObj.street) components.push(addressObj.street);
    if (addressObj.city) components.push(addressObj.city);
    if (addressObj.region) components.push(addressObj.region);
    if (addressObj.country) components.push(addressObj.country);
    return components.join(", ");
  };

  const getMapPreview = (latitude, longitude) => {
    const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  };

  const pickOnMapHandler = () => {
    navigation.navigate("LocationMap", {
      initialLocation: location?.coords || {
        latitude: 42.3601,
        longitude: -71.0589,
      },
    });
  };

  let locationDisplay = <Text>Waiting for location...</Text>;

  if (errorMsg) {
    locationDisplay = <Text style={generalStyles.errorText}>{errorMsg}</Text>;
  } else if (location?.coords) {
    locationDisplay = (
      <View style={generalStyles.locationPreview}>
        <Image
          style={generalStyles.mapPreview}
          source={{
            uri: getMapPreview(
              location.coords.latitude,
              location.coords.longitude
            ),
          }}
        />
        {address && <Text style={generalStyles.addressText}>{address}</Text>}
      </View>
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
        <View style={buttonStyles.locationButtonContent}>
          <MaterialIcons name="location-on" size={20} color="#FFF" />
          <Text style={buttonStyles.locationButtonText}>
            {location ? "Change Location" : "Pick on Map"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default LocationPicker;
