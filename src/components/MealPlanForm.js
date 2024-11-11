import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { generalStyles } from "../theme/generalStyles";
import { inputStyles } from "../theme/inputStyles";
import { buttonStyles } from "../theme/buttonStyles";

export default function MealPlanForm({
  initialValues = {
    dishName: "",
    plannedDate: new Date(),
    steps: [{ step: "" }],
  },
  onSubmit,
  submitButtonText = "Save Meal Plan",
}) {
  const [dishName, setDishName] = useState(initialValues.dishName);
  const [date, setDate] = useState(new Date(initialValues.plannedDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [steps, setSteps] = useState(
    initialValues.steps.map((step) => ({
      step: typeof step === "string" ? step : "",
    }))
  );

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index].step = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { step: "" }]);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      dishName,
      plannedDate: date.toISOString(),
      steps: steps.map((s) => s.step),
    });
  };

  return (
    <ScrollView style={generalStyles.container}>
      <View style={generalStyles.formContainer}>
        {/* Dish Name Input */}
        <View style={generalStyles.inputContainer}>
          <Text style={generalStyles.label}>Dish Name</Text>
          <TextInput
            style={inputStyles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Enter dish name"
          />
        </View>

        {/* Planned Date Picker */}
        <View style={generalStyles.inputContainer}>
          <Text style={generalStyles.label}>Planned Date</Text>
          <Pressable
            style={inputStyles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={inputStyles.dateButtonText}>
              {date.toLocaleDateString()}
            </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Cooking Steps Input */}
        <View style={generalStyles.stepsContainer}>
          <Text style={generalStyles.label}>Cooking Steps</Text>
          {steps.map((step, index) => (
            <View key={index} style={generalStyles.stepInputContainer}>
              <TextInput
                style={inputStyles.stepInput}
                value={step.step}
                onChangeText={(value) => handleStepChange(index, value)}
                placeholder={`Step ${index + 1}`}
                multiline
              />
              <Pressable
                style={buttonStyles.removeButton}
                onPress={() => removeStep(index)}
              >
                <Text style={buttonStyles.removeButtonText}>✕</Text>
              </Pressable>
            </View>
          ))}
          <Pressable style={buttonStyles.addButton} onPress={addStep}>
            <Text style={buttonStyles.addButtonText}>+ Add Step</Text>
          </Pressable>
        </View>

        {/* Submit Button */}
        <Pressable style={buttonStyles.submitButton} onPress={handleSubmit}>
          <Text style={buttonStyles.submitButtonText}>{submitButtonText}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
