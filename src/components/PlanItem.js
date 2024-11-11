import React from "react";
import { Text, View, Pressable, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { generalStyles } from "../theme/generalStyles";
import { buttonStyles } from "../theme/buttonStyles";

export const PlanItem = ({ dishName, plannedDate, onPress, onDelete, id }) => {
  // Convert ISO string to a readable date format
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
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => onDelete(id), style: "destructive" },
      ]
    );
  };

  return (
    <View style={generalStyles.planItemContainer}>
      <Pressable
        style={({ pressed }) => [
          generalStyles.contentContainer,
          pressed && generalStyles.pressed,
        ]}
        onPress={onPress}
      >
        <View style={generalStyles.textContainer}>
          <Text style={generalStyles.dishName}>{dishName}</Text>
          <Text style={generalStyles.date}>{formatDate(plannedDate)}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [
          buttonStyles.deleteButton,
          pressed && buttonStyles.deletePressed,
        ]}
      >
        <AntDesign name="delete" size={20} color="#FF6B6B" />
      </Pressable>
    </View>
  );
};
