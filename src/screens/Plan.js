import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";

export default function Plan({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("MealPlanner")}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>Plan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginRight: 15,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    fontSize: 24,
    color: "#FF6B6B",
  },
});
