import React from "react";
import { View, StyleSheet } from "react-native";
import WeatherDisplay from "../components/Weather/WeatherDisplay";

export default function WeatherScreen() {
  return (
    <View style={styles.container}>
      <WeatherDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
