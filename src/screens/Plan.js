import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseSetup";
import { getUserMealPlans } from "../Firebase/firebaseHelper";
import { PlanItem } from "../components/PlanItem";
import { useFocusEffect } from "@react-navigation/native";

export default function Plan({ navigation }) {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadMealPlans();
    }, [])
  );

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

    loadMealPlans();
  }, [navigation]);

  const loadMealPlans = async () => {
    try {
      const userId = auth.currentUser.uid;
      const plans = await getUserMealPlans(userId);
      setMealPlans(plans);
    } catch (error) {
      console.error("Error loading meal plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <PlanItem
      dishName={item.dishName}
      plannedDate={item.plannedDate}
      onPress={() => {
        // Handle plan item press - can be used for viewing details later
        console.log("Pressed plan:", item.dishName);
      }}
    />
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {mealPlans.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No meal plans yet</Text>
          <Text style={styles.subText}>
            Press the + button to create your first meal plan
          </Text>
        </View>
      ) : (
        <FlatList
          data={mealPlans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    paddingVertical: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
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
