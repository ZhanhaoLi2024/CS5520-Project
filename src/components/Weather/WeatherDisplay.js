import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function WeatherDisplay() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cityWeatherList, setCityWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const apiKey = "beef6ed257861e81239489e1df671db0"; // Replace with your API key

  const fetchWeather = async (queryCity) => {
    try {
      setLoading(true);
      setError(null);

      let url;
      if (queryCity) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${apiKey}`;
      } else {
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

      if (queryCity) {
        setCityWeatherList((prev) => [...prev, data]);
      } else {
        setCurrentWeather(data);
      }
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

  const handleDeleteCity = (cityId) => {
    setCityWeatherList((prev) => prev.filter((weather) => weather.id !== cityId));
  };

  const getWeatherIcon = (description) => {
    const lowerDescription = description?.toLowerCase();
    if (lowerDescription.includes("cloud")) return <FontAwesome5 name="cloud" size={50} color="#555" />;
    if (lowerDescription.includes("rain")) return <FontAwesome5 name="cloud-rain" size={50} color="#007BFF" />;
    if (lowerDescription.includes("sun") || lowerDescription.includes("clear")) return <FontAwesome5 name="sun" size={50} color="#FFA500" />;
    if (lowerDescription.includes("snow")) return <FontAwesome5 name="snowflake" size={50} color="#00BFFF" />;
    if (lowerDescription.includes("thunder")) return <FontAwesome5 name="bolt" size={50} color="#FF4500" />;
    return <FontAwesome5 name="smog" size={50} color="#808080" />;
  };

  const renderCityWeather = ({ item }) => (
    <View style={styles.cityWeather}>
      <Text style={styles.city}>{item.name}</Text>
      {getWeatherIcon(item.weather?.[0]?.description)}
      <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
      <Text style={styles.description}>{item.weather?.[0]?.description}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCity(item.id)}>
        <MaterialIcons name="delete" size={24} color="#FF6B6B" />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentWeather && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Location Weather:</Text>
          <Text style={styles.city}>{currentWeather.name}</Text>
          {getWeatherIcon(currentWeather.weather?.[0]?.description)}
          <Text style={styles.temp}>{Math.round(currentWeather.main.temp)}°C</Text>
          <Text style={styles.description}>{currentWeather.weather?.[0]?.description}</Text>
        </View>
      )}

      <FlatList
        data={cityWeatherList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCityWeather}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionTitle}>Saved Cities:</Text>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
              />
              <Button
                title="Add City"
                color="#FF6B6B"
                onPress={() => {
                  if (city.trim()) {
                    fetchWeather(city.trim());
                    setCity("");
                  } else {
                    Alert.alert("Invalid Input", "Please enter a valid city name.");
                  }
                }}
              />
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>No cities added yet.</Text>}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      )}

      {error && (
        <View style={styles.errorOverlay}>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.errorHelp}>Please check your internet connection or location permissions.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
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
  cityWeather: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#FF6B6B",
    marginLeft: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
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
