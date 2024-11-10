import React from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const PlanItem = ({ dishName, plannedDate, onPress, onDelete, id }) => {
  // Convert ISO string to readable date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Plan",
      `Are you sure you want to delete "${dishName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.contentContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <View style={styles.textContainer}>
          <Text style={styles.dishName}>{dishName}</Text>
          <Text style={styles.date}>{formatDate(plannedDate)}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deletePressed,
        ]}
      >
        <AntDesign name="delete" size={20} color="#FF6B6B" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  textContainer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  deletePressed: {
    opacity: 0.5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
