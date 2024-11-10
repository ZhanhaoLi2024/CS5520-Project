import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";

export default function Explorer({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("NewPost")}
          style={({ pressed }) => [
            styles.postButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Explorer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postButton: {
    marginRight: 15,
  },
  postButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
