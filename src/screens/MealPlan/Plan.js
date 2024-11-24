import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TextInput, Pressable, Alert } from "react-native";
import { auth } from "../../Firebase/firebaseSetup";
import {
  getUserMealPlans,
  deleteMealPlan,
} from "../../Firebase/firebaseHelper";
import { PlanItem } from "../../components/MealPlan/PlanItem";
import { useFocusEffect } from "@react-navigation/native";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { promptLogin, getLoginPromptMessage } from "../../utils/authUtils";

export default function Plan({ navigation, auth }) {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [sortOption, setSortOption] = useState("newest"); // Sort option state
  const { setIsGuest } = auth;

  useFocusEffect(
    React.useCallback(() => {
      loadMealPlans();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            if (!auth.currentUser) {
              promptLogin(
                navigation,
                getLoginPromptMessage("create-plan"),
                setIsGuest
              );
              return;
            }
            navigation.navigate("MealPlanner");
          }}
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
  }, [navigation, setIsGuest]);

  const loadMealPlans = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        setMealPlans([]);
        setLoading(false);
        return;
      }
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

  const filteredPlans = mealPlans.filter((plan) =>
    plan.dishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.plannedDate) - new Date(a.plannedDate); // Sort by newest
    } else if (sortOption === "oldest") {
      return new Date(a.plannedDate) - new Date(b.plannedDate); // Sort by oldest
    } else if (sortOption === "dishName") {
      return a.dishName.localeCompare(b.dishName); // Sort alphabetically by dish name
    }
    return 0;
  });

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
      {/* Search Bar */}
      <View style={generalStyles.searchContainer}>
        <TextInput
          style={generalStyles.searchInput}
          placeholder="Search meal plans..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Sort Buttons */}
      <View style={generalStyles.sortContainer}>
        <Pressable
          style={[
            buttonStyles.sortButton,
            sortOption === "newest" && buttonStyles.activeSortButton,
          ]}
          onPress={() => setSortOption("newest")}
        >
          <Text style={buttonStyles.sortButtonText}>Newest</Text>
        </Pressable>
        <Pressable
          style={[
            buttonStyles.sortButton,
            sortOption === "oldest" && buttonStyles.activeSortButton,
          ]}
          onPress={() => setSortOption("oldest")}
        >
          <Text style={buttonStyles.sortButtonText}>Oldest</Text>
        </Pressable>
        <Pressable
          style={[
            buttonStyles.sortButton,
            sortOption === "dishName" && buttonStyles.activeSortButton,
          ]}
          onPress={() => setSortOption("dishName")}
        >
          <Text style={buttonStyles.sortButtonText}>Dish Name</Text>
        </Pressable>
      </View>

      {/* Meal Plan List */}
      {sortedPlans.length === 0 ? (
        <View style={generalStyles.centered}>
          <Text style={generalStyles.emptyText}>No meal plans found</Text>
          <Text style={generalStyles.subText}>
            Press the + button to create your first meal plan
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedPlans}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={generalStyles.list}
        />
      )}
    </View>
  );
}
