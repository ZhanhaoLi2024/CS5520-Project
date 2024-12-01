import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

const IngredientRecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");

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
        <Pressable style={buttonStyles.searchButton} onPress={() => {}}>
          <Text style={buttonStyles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default IngredientRecipeSearch;
