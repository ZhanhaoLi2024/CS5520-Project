import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, Alert } from "react-native";
import { auth } from "../../Firebase/firebaseSetup";
import {
  getUserMealPlans,
  deleteMealPlan,
} from "../../Firebase/firebaseHelper";
import { PlanItem } from "../../components/MealPlan/PlanItem";
import { useFocusEffect } from "@react-navigation/native";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";

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
            buttonStyles.headerAddButton,
            pressed && buttonStyles.buttonPressed,
          ]}
        >
          <Text style={buttonStyles.headerAddButtonText}>+</Text>
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
      Alert.alert("Error", "Failed to load meal plans");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await deleteMealPlan(planId);
      await loadMealPlans();
      Alert.alert("Success", "Meal plan deleted successfully");
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      Alert.alert("Error", "Failed to delete meal plan");
    }
  };

  const renderItem = ({ item }) => (
    <PlanItem
      id={item.id}
      dishName={item.dishName}
      plannedDate={item.plannedDate}
      onPress={() => navigation.navigate("PlanDetail", { plan: item })}
      onDelete={handleDeletePlan}
    />
  );

  if (loading) {
    return (
      <View style={generalStyles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={generalStyles.planContainer}>
      {mealPlans.length === 0 ? (
        <View style={generalStyles.centered}>
          <Text style={generalStyles.emptyText}>No meal plans yet</Text>
          <Text style={generalStyles.subText}>
            Press the + button to create your first meal plan
          </Text>
        </View>
      ) : (
        <FlatList
          data={mealPlans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={generalStyles.list}
        />
      )}
    </View>
  );
}
