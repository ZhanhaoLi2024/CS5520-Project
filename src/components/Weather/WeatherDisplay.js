import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(""); // Input city
  const [userCity, setUserCity] = useState(null); // User's current location weather

  const apiKey = "beef6ed257861e81239489e1df671db0"; // Replace with your OpenWeather API key

  const fetchWeather = async (queryCity) => {
    try {
      setLoading(true);
      setError(null);

      let url;
      if (queryCity) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${apiKey}`;
      } else {
        // Use current location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied.");
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      }

      console.log("Fetching weather data from:", url);
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error:", errorData);
        throw new Error(errorData.message || "Failed to fetch weather data.");
      }

      const data = await response.json();
      console.log("Weather data fetched successfully:", data);
      queryCity ? setWeather(data) : setUserCity(data); // Update based on query type
    } catch (err) {
      console.error("Error in fetchWeather:", err);
      setError(err.message || "An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user's current location weather on mount
    fetchWeather();
  }, []);

  const getWeatherIcon = (description) => {
    const lowerDescription = description?.toLowerCase();
    if (lowerDescription.includes("cloud")) return <FontAwesome5 name="cloud" size={50} color="#555" />;
    if (lowerDescription.includes("rain")) return <FontAwesome5 name="cloud-rain" size={50} color="#007BFF" />;
    if (lowerDescription.includes("sun") || lowerDescription.includes("clear")) return <FontAwesome5 name="sun" size={50} color="#FFA500" />;
    if (lowerDescription.includes("snow")) return <FontAwesome5 name="snowflake" size={50} color="#00BFFF" />;
    if (lowerDescription.includes("thunder")) return <FontAwesome5 name="bolt" size={50} color="#FF4500" />;
    return <FontAwesome5 name="smog" size={50} color="#808080" />;
  };

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
        <Text style={styles.errorHelp}>Please check your internet connection or location permissions.</Text>
      </View>
    );
  }

  const renderWeather = (data) => (
    <>
      <Text style={styles.city}>{data.name || "Your Location"}</Text>
      {getWeatherIcon(data.weather?.[0]?.description)}
      <Text style={styles.temp}>{data.main ? `${Math.round(data.main.temp)}°C` : "N/A"}</Text>
      <Text style={styles.description}>{data.weather?.[0]?.description || "No description available"}</Text>
      <Text style={styles.details}>Humidity: {data.main?.humidity || "N/A"}%</Text>
      <Text style={styles.details}>Wind Speed: {data.wind?.speed || "N/A"} m/s</Text>
    </>
  );

  return (
    <View style={styles.container}>
      {userCity && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Location Weather:</Text>
          {renderWeather(userCity)}
        </View>
      )}

      {weather && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather for {weather.name}:</Text>
          {renderWeather(weather)}
        </View>
      )}

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <Button
          title="Get Weather"
          color="#FF6B6B"
          onPress={() => {
            if (city.trim()) fetchWeather(city.trim());
            else Alert.alert("Invalid Input", "Please enter a valid city name.");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
  inputSection: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
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
