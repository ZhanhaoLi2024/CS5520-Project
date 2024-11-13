import React from "react";
import { Alert } from "react-native";
import MealPlanForm from "../components/MealPlanForm";
import { auth } from "../../Firebase/firebaseSetup";
import { createMealPlan } from "../../Firebase/firebaseHelper";

export default function MealPlanner({ navigation }) {
  const handleSubmit = async (formData) => {
    // Validate inputs
    if (!formData.dishName.trim()) {
      Alert.alert("Error", "Please enter a dish name");
      return;
    }

    if (
      formData.steps.length === 0 ||
      formData.steps.some((step) => !step.trim())
    ) {
      Alert.alert("Error", "Please fill in all steps");
      return;
    }

    try {
      const mealPlanData = {
        ...formData,
        userId: auth.currentUser.uid,
      };

      const result = await createMealPlan(mealPlanData);

      if (result.success) {
        Alert.alert("Success", "Meal plan saved successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
      Alert.alert("Error", "Failed to save meal plan");
    }
  };

  return (
    <MealPlanForm onSubmit={handleSubmit} submitButtonText="Create Meal Plan" />
  );
}
