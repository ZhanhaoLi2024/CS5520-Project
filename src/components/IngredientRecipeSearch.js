import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

const IngredientRecipeSearch = ({ onRecipeSelect }) => {
  const [ingredients, setIngredients] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const SPOONACULAR_API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

  const searchRecipesByIngredients = async () => {
    if (!ingredients.trim()) {
      Alert.alert("Error", "Please enter ingredients");
      return;
    }

    if (!SPOONACULAR_API_KEY) {
      Alert.alert("Configuration Error", "API key is not configured properly");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=5&ranking=2&ignorePantry=true`
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }

      if (data.length === 0) {
        Alert.alert("No Results", "No recipes found for these ingredients");
        return;
      }

      setSearchResults(data);
      setShowSearchModal(true);
    } catch (error) {
      console.error("Error searching recipes:", error);
      Alert.alert(
        "Error",
        `Failed to search recipes: ${error.message || "Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const getRecipeDetails = async (recipeId) => {
    console.log("Recipe ID:", recipeId);
    // if (!recipeId || !SPOONACULAR_API_KEY) {
    //   Alert.alert("Error", "Invalid request");
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
    //   );

    //   if (!response.ok) {
    //     throw new Error(`API responded with status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   console.log("Recipe details:", data);
    //   if (!data || !data.title) {
    //     throw new Error("Invalid recipe data received");
    //   }

    //   setSelectedRecipe(data);
    // } catch (error) {
    //   console.error("Error fetching recipe details:", error);
    //   Alert.alert("Error", `Failed to fetch recipe details: ${error.message}`);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleRecipeSelect = () => {
    if (!selectedRecipe || !selectedRecipe.title) {
      Alert.alert("Error", "No recipe selected");
      return;
    }

    const steps =
      selectedRecipe.analyzedInstructions?.[0]?.steps?.map(
        (step) => step.step
      ) || [];

    if (steps.length === 0) {
      Alert.alert(
        "Warning",
        "This recipe doesn't have any steps. Would you like to continue?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Continue",
            onPress: () => {
              onRecipeSelect({
                dishName: selectedRecipe.title,
                steps: ["No steps provided for this recipe"],
              });
              setShowSearchModal(false);
              setIngredients("");
              setSelectedRecipe(null);
            },
          },
        ]
      );
      return;
    }

    onRecipeSelect({
      dishName: selectedRecipe.title,
      steps: steps,
    });

    setShowSearchModal(false);
    setIngredients("");
    setSelectedRecipe(null);
  };

  const renderRecipeItem = ({ item }) => {
    if (!item || !item.id || !item.title) return null;

    return (
      <Pressable
        style={generalStyles.recipeItem}
        onPress={() => getRecipeDetails(item.id)}
      >
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/100" }}
          style={generalStyles.recipeImage}
        />
        <View style={generalStyles.recipeInfo}>
          <Text style={generalStyles.recipeTitle}>{item.title}</Text>
          {/* <Text style={generalStyles.recipeMissing}>
            Missing ingredients: {item.missedIngredientCount || 0}
          </Text> */}
        </View>
      </Pressable>
    );
  };

  const renderRecipeDetails = () => {
    if (!selectedRecipe) return null;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={generalStyles.modalContent}
          contentContainerStyle={{ padding: 16 }}
        >
          <Text style={generalStyles.modalTitle}>{selectedRecipe.title}</Text>
          {selectedRecipe.image && (
            <Image
              source={{ uri: selectedRecipe.image }}
              style={generalStyles.modalImage}
            />
          )}
          <Text style={generalStyles.sectionTitle}>Ingredients:</Text>
          {selectedRecipe.extendedIngredients?.map((ingredient, index) =>
            ingredient?.original ? (
              <Text key={index} style={generalStyles.ingredientText}>
                • {ingredient.original}
              </Text>
            ) : null
          )}
          <Text style={generalStyles.sectionTitle}>Instructions:</Text>
          {selectedRecipe.analyzedInstructions?.[0]?.steps?.map((step, index) =>
            step?.step ? (
              <Text key={index} style={generalStyles.stepText}>
                {index + 1}. {step.step}
              </Text>
            ) : null
          )}
        </ScrollView>
      </View>
    );
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
          style={[
            buttonStyles.searchButton,
            loading && buttonStyles.searchButtonDisabled,
          ]}
          onPress={searchRecipesByIngredients}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonStyles.searchButtonText}>Search</Text>
          )}
        </Pressable>
      </View>

      <Modal
        visible={showSearchModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowSearchModal(false);
          setSelectedRecipe(null);
        }}
      >
        <View style={generalStyles.modalOverlay}>
          <View style={[generalStyles.modalContainer, { maxHeight: "90%" }]}>
            {!selectedRecipe ? (
              // 搜索结果视图
              <>
                <Text style={generalStyles.modalTitle}>Search Results</Text>
                <FlatList
                  data={searchResults}
                  renderItem={renderRecipeItem}
                  keyExtractor={(item) =>
                    item.id?.toString() || Math.random().toString()
                  }
                  style={generalStyles.resultsList}
                />
                <Pressable
                  style={buttonStyles.closeButton}
                  onPress={() => {
                    setShowSearchModal(false);
                    setSelectedRecipe(null);
                  }}
                >
                  <Text style={buttonStyles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            ) : (
              // 食材详情视图
              <>
                {renderRecipeDetails()}
                <View style={generalStyles.modalButtonContainer}>
                  <Pressable
                    style={buttonStyles.selectButton}
                    onPress={handleRecipeSelect}
                  >
                    <Text style={buttonStyles.selectButtonText}>Close</Text>
                  </Pressable>
                  <Pressable
                    style={buttonStyles.backButton}
                    onPress={() => setSelectedRecipe(null)}
                  >
                    <Text style={buttonStyles.backButtonText}>
                      Back to Results
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IngredientRecipeSearch;
