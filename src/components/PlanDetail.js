import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";

export default function PlanDetail({ route, navigation }) {
  const { plan } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: plan.dishName,
    });
  }, [navigation, plan.dishName]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
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

      <Pressable
        style={({ pressed }) => [
          styles.editButton,
          pressed && styles.editButtonPressed,
        ]}
        onPress={() => navigation.navigate("PlanEdit", { plan })}
      >
        <Text style={styles.editButtonText}>Edit Plan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
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
  editButton: {
    backgroundColor: "#FF6B6B",
    margin: 16,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonPressed: {
    opacity: 0.7,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
