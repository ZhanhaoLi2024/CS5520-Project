import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { getAllPostsWithStats } from "../Firebase/firebaseHelper";
import { generalStyles } from "../theme/generalStyles";

export default function Map({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const defaultRegion = {
    latitude: 42.3601,
    longitude: -71.0589,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // get user location permission and current location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          Alert.alert(
            "Permission Denied",
            "Please enable location services to see your current location."
          );
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg("Error getting location");
      }
    })();
  }, []);

  // load all posts with location information
  const loadPosts = async () => {
    try {
      const allPosts = await getAllPostsWithStats();
      // Filter out posts without location information
      const postsWithLocation = allPosts.filter(
        (post) => post.location && post.location.coords
      );
      setPosts(postsWithLocation);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) {
    return (
      <View style={generalStyles.centered}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location || defaultRegion}
        showsUserLocation={true} // show user current location
        showsMyLocationButton={true} // add a button to go back to current location
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            pinColor="#4285F4"
          />
        )}

        {posts.map((post) => (
          <Marker
            key={post.id}
            coordinate={post.location.coords}
            title={post.title}
            description={post.description}
            pinColor="#FF6B6B"
          >
            <Callout
              onPress={() => navigation.navigate("PostDetail", { post })}
            >
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{post.title}</Text>
                <Text style={styles.calloutDescription}>
                  {post.description.length > 50
                    ? `${post.description.substring(0, 50)}...`
                    : post.description}
                </Text>
                <Text style={styles.calloutTap}>Tap to view details</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {errorMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 200,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#FF6B6B",
  },
  calloutDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  calloutTap: {
    fontSize: 10,
    color: "#999",
    fontStyle: "italic",
  },
  errorContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 107, 107, 0.9)",
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});
