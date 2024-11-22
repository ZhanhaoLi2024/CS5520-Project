import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { Marker, Callout } from "react-native-maps";
import { getAllPostsWithStats } from "../Firebase/firebaseHelper";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getAllPostsWithStats();
      setPosts(data);
    };

    loadPosts();
  }, []);

  if (!location && !errorMsg) {
    return <Text>Loading map...</Text>;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <MapView style={{ flex: 1 }} showsUserLocation={true}>
      {posts.map((post) => (
        <Marker
          key={post.id}
          coordinate={post.location.coords}
          title={post.title}
        >
          <Callout>
            <Text>{post.title}</Text>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}
