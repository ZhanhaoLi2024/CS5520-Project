import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

const IngredientRecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const SPOONACULAR_API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

  const searchRecipesByIngredients = async () => {
    if (!ingredients.trim()) {
      Alert.alert("Error", "Please enter ingredients");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=5&ranking=2&ignorePantry=true`
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      Alert.alert("Error", `Failed to fetch recipes: ${error.message}`);
    }
  };

  return (
    <View style={generalStyles.searchContainer}>
      <Text style={generalStyles.searchLabel}>
        Search Recipes by Ingredients
      </Text>
      <View style={generalStyles.searchInputContainer}>
        <TextInput
          style={inputStyles.searchInput}
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />
        <Pressable
          style={buttonStyles.searchButton}
          onPress={searchRecipesByIngredients}
        >
          <Text style={buttonStyles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default IngredientRecipeSearch;
