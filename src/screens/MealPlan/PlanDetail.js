import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { generalStyles } from "../../theme/generalStyles";
import { buttonStyles } from "../../theme/buttonStyles";
import { NotificationManager } from "../../components/Notification/NotificationManager";

export default function PlanDetail({ route, navigation }) {
  const { plan } = route.params;
  const [reminderTime, setReminderTime] = useState(new Date());
  const [reminderMessage, setReminderMessage] = useState(`Time to start cooking ${plan.dishName}!`);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: plan.dishName,
    });

    // Request notification permissions on mount
    NotificationManager.requestPermissions();
  }, [navigation, plan.dishName]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSetReminder = () => {
    const triggerDate = new Date(reminderTime);
    if (triggerDate <= new Date()) {
      Alert.alert("Invalid Time", "Please select a future time for the reminder.");
      return;
    }

    NotificationManager.scheduleNotification(
      "Cooking Reminder",
      reminderMessage,
      triggerDate
    );

    Alert.alert("Reminder Set", `We’ll remind you to start cooking at ${triggerDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
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

        {/* Reminder Section */}
        <View style={generalStyles.section}>
          <Text style={generalStyles.label}>Set a Reminder</Text>
          <TextInput
            style={generalStyles.reminderInput}
            placeholder="Customize your reminder message"
            value={reminderMessage}
            onChangeText={setReminderMessage}
          />
          <Pressable
            style={buttonStyles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={buttonStyles.dateButtonText}>
              {reminderTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setReminderTime(selectedDate);
              }
            }}
          />
        )}
      </ScrollView>

      {/* Buttons */}
      <Pressable
        style={({ pressed }) => [
          buttonStyles.submitButton,
          pressed && buttonStyles.submitButtonPressed,
        ]}
        onPress={handleSetReminder}
      >
        <Text style={buttonStyles.submitButtonText}>Set Reminder</Text>
      </Pressable>
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
