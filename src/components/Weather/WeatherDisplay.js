import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons"; // Use FontAwesome5 icons

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
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
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
      setWeather(data); // Store the entire weather object
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

  const temperature = weather?.main?.temp;
  const weatherDescription = weather?.weather?.[0]?.description;
  const humidity = weather?.main?.humidity;
  const windSpeed = weather?.wind?.speed;
  const cityName = weather?.name;

  // Map weather descriptions to icons
  const getWeatherIcon = (description) => {
    const lowerDescription = description?.toLowerCase();
    if (lowerDescription.includes("cloud")) {
      return <FontAwesome5 name="cloud" size={50} color="#555" />;
    }
    if (lowerDescription.includes("rain")) {
      return <FontAwesome5 name="cloud-rain" size={50} color="#007BFF" />;
    }
    if (lowerDescription.includes("sun") || lowerDescription.includes("clear")) {
      return <FontAwesome5 name="sun" size={50} color="#FFA500" />;
    }
    if (lowerDescription.includes("snow")) {
      return <FontAwesome5 name="snowflake" size={50} color="#00BFFF" />;
    }
    if (lowerDescription.includes("thunder")) {
      return <FontAwesome5 name="bolt" size={50} color="#FF4500" />;
    }
    return <FontAwesome5 name="smog" size={50} color="#808080" />; // Default icon
  };

  return (
    <View style={styles.container}>
      {weather ? (
        <>
          <Text style={styles.city}>{cityName || "Your Location"}</Text>
          {getWeatherIcon(weatherDescription)}
          <Text style={styles.temp}>{temperature ? `${Math.round(temperature)}°C` : "N/A"}</Text>
          <Text style={styles.description}>
            {weatherDescription || "No description available"}
          </Text>
          <Text style={styles.details}>Humidity: {humidity || "N/A"}%</Text>
          <Text style={styles.details}>
            Wind Speed: {windSpeed || "N/A"} m/s
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
