import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

export default function PlanDetail({ route, navigation }) {
  const { plan } = route.params;

  useEffect(() => {
    // Set the header title to the dish name
    navigation.setOptions({
      title: plan.dishName,
    });
  }, [navigation, plan.dishName]);

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Dish Name</Text>
        <Text style={styles.value}>{plan.dishName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Planned Date</Text>
        <Text style={styles.value}>{formatDate(plan.plannedDate)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Steps</Text>
        {plan.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  stepContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF6B6B",
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});
