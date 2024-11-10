import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Enter dish name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Planned Date</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
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

        <View style={styles.stepsContainer}>
          <Text style={styles.label}>Cooking Steps</Text>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepInputContainer}>
              <TextInput
                style={styles.stepInput}
                value={step.step}
                onChangeText={(value) => handleStepChange(index, value)}
                placeholder={`Step ${index + 1}`}
                multiline
              />
              <Pressable
                style={styles.removeButton}
                onPress={() => removeStep(index)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </Pressable>
            </View>
          ))}
          <Pressable style={styles.addButton} onPress={addStep}>
            <Text style={styles.addButtonText}>+ Add Step</Text>
          </Pressable>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>{submitButtonText}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f5f5f5",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  stepsContainer: {
    marginBottom: 20,
  },
  stepInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },
  removeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#ffeded",
  },
  removeButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderStyle: "dashed",
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
