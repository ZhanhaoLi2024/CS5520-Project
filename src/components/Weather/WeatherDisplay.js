import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { generalStyles } from "../../theme/generalStyles"; // Import general styles
import { inputStyles } from "../../theme/inputStyles"; // Import input styles
import { buttonStyles } from "../../theme/buttonStyles"; // Import button styles

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

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch weather data.");
      }

      const data = await response.json();
      if (queryCity) {
        setCityWeatherList((prev) => [...prev, data]);
      } else {
        setCurrentWeather(data);
      }
    } catch (err) {
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
    <View style={generalStyles.weatherCard}>
      <View style={generalStyles.weatherDetails}>
        <Text style={generalStyles.weatherCity}>{item.name}</Text>
        {getWeatherIcon(item.weather?.[0]?.description)}
        <Text style={generalStyles.weatherTemp}>{Math.round(item.main.temp)}°C</Text>
        <Text style={generalStyles.weatherDescription}>{item.weather?.[0]?.description}</Text>
      </View>
      <TouchableOpacity
        style={buttonStyles.weatherDeleteButton}
        onPress={() => handleDeleteCity(item.id)}
      >
        <MaterialIcons name="delete" size={24} color="#FF6B6B" />
        <Text style={buttonStyles.weatherDeleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={generalStyles.weatherContainer}>
      {currentWeather && (
        <View style={generalStyles.weatherSection}>
          <Text style={generalStyles.weatherSectionTitle}>Current Location Weather:</Text>
          <Text style={generalStyles.weatherCity}>{currentWeather.name}</Text>
          {getWeatherIcon(currentWeather.weather?.[0]?.description)}
          <Text style={generalStyles.weatherTemp}>{Math.round(currentWeather.main.temp)}°C</Text>
          <Text style={generalStyles.weatherDescription}>{currentWeather.weather?.[0]?.description}</Text>
        </View>
      )}

      <FlatList
        data={cityWeatherList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCityWeather}
        ListHeaderComponent={
          <View>
            <Text style={generalStyles.weatherSectionTitle}>Saved Cities:</Text>
            <View style={generalStyles.weatherInputSection}>
              <TextInput
                style={inputStyles.weatherInput}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
              />
              <TouchableOpacity
                style={buttonStyles.weatherAddButton}
                onPress={() => {
                  if (city.trim()) {
                    fetchWeather(city.trim());
                    setCity("");
                  } else {
                    Alert.alert("Invalid Input", "Please enter a valid city name.");
                  }
                }}
              >
                <Text style={buttonStyles.weatherAddButtonText}>Add City</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={generalStyles.weatherEmptyText}>No cities added yet.</Text>}
      />

      {loading && (
        <View style={generalStyles.weatherLoadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      )}

      {error && (
        <View style={generalStyles.weatherErrorOverlay}>
          <Text style={generalStyles.weatherError}>{error}</Text>
          <Text style={generalStyles.weatherErrorHelp}>Please check your internet connection or location permissions.</Text>
        </View>
      )}
    </View>
  );
}
