import { Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { generalStyles } from "../theme/generalStyles";
import { buttonStyles } from "../theme/buttonStyles";

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
    <View style={generalStyles.container}>
      <ScrollView style={generalStyles.scrollContainer}>
        {/* Dish Name Section */}
        <View style={generalStyles.section}>
          <Text style={generalStyles.label}>Dish Name</Text>
          <Text style={generalStyles.value}>{plan.dishName}</Text>
        </View>

        {/* Planned Date Section */}
        <View style={generalStyles.section}>
          <Text style={generalStyles.label}>Planned Date</Text>
          <Text style={generalStyles.value}>{formatDate(plan.plannedDate)}</Text>
        </View>

        {/* Cooking Steps Section */}
        <View style={generalStyles.section}>
          <Text style={generalStyles.label}>Steps</Text>
          {plan.steps.map((step, index) => (
            <View key={index} style={generalStyles.stepContainer}>
              <Text style={generalStyles.stepNumber}>{index + 1}</Text>
              <Text style={generalStyles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Button */}
      <Pressable
        style={({ pressed }) => [
          buttonStyles.submitButton,
          pressed && buttonStyles.submitButtonPressed,
        ]}
        onPress={() => navigation.navigate("PlanEdit", { plan })}
      >
        <Text style={buttonStyles.submitButtonText}>Edit Plan</Text>
      </Pressable>
    </View>
  );
}
