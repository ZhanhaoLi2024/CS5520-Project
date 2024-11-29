import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied.");
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log("Location data:", latitude, longitude);

      // Fetch weather data
      const apiKey = "beef6ed257861e81239489e1df671db0"; // Your API key
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`;
      console.log("Fetching weather data from:", url);

      const response = await fetch(url);
      console.log("API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error:", errorData);
        throw new Error(errorData.message || "Failed to fetch weather data.");
      }

      const data = await response.json();
      console.log("Weather data fetched successfully:", data);
      setWeather(data.current); // Accessing 'current' data from the API response
    } catch (err) {
      console.error("Error in fetchWeather:", err);
      setError(err.message || "An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.errorHelp}>
          Please check your internet connection or location permissions.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <Text style={styles.city}>Your Location</Text>
          <Text style={styles.temp}>{Math.round(weather.temp)}°C</Text>
          <Text style={styles.description}>
            {weather.weather[0].description}
          </Text>
          <Text style={styles.details}>Humidity: {weather.humidity}%</Text>
          <Text style={styles.details}>
            Wind Speed: {weather.wind_speed} m/s
          </Text>
        </>
      ) : (
        <Text>No weather data available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#333",
    textTransform: "capitalize",
  },
  details: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  errorHelp: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
