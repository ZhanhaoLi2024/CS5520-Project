import React from "react";
import { Alert } from "react-native";
import MealPlanForm from "../components/MealPlanForm";
import { updateMealPlan } from "../../Firebase/firebaseHelper";

export default function PlanEdit({ route, navigation }) {
  const { plan } = route.params;

  const handleSubmit = async (formData) => {
    try {
      await updateMealPlan(plan.id, formData);
      Alert.alert("Success", "Meal plan updated successfully!", [
        {
          text: "OK",
          //   onPress: () => {
          //     // Navigate back to plan detail with updated data
          //     navigation.navigate("PlanDetail", {
          //       plan: {
          //         ...plan,
          //         ...formData,
          //       },
          //     });
          //   },
          onPress: () => {
            // Navigate back to Explorer screen
            navigation.navigate("MainTabs", {
              screen: "Plan",
            });
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating meal plan:", error);
      Alert.alert("Error", "Failed to update meal plan");
    }
  };

  return (
    <MealPlanForm
      initialValues={{
        dishName: plan.dishName,
        plannedDate: plan.plannedDate,
        steps: plan.steps,
      }}
      onSubmit={handleSubmit}
      submitButtonText="Update Meal Plan"
    />
  );
}
