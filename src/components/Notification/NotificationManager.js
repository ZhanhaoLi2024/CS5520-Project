import React from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";

// Configure notification behavior for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NotificationManager = {
  getExpoPushToken: async () => {
    if (!Constants.isDevice && !__DEV__) {
      Alert.alert("Error", "Push notifications are only supported on physical devices.");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission Required", "You need to enable notifications to use this feature.");
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", tokenData.data); // Log token for testing
    return tokenData.data;
  },

  scheduleNotification: async (title, body, triggerDate) => {
    try {
      // Ensure triggerDate is in the future
      if (triggerDate <= new Date()) {
        Alert.alert("Invalid Time", "Please select a future time for the notification.");
        return;
      }

      const trigger = {
        type: "date", // Correct type for date-based scheduling
        date: triggerDate, // Specify the exact date and time
      };

      console.log("Scheduling notification with trigger:", trigger);

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger, // Use the updated trigger configuration
      });

      console.log("Notification scheduled successfully");
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  },

  sendPushNotification: async (expoPushToken, title, body) => {
    try {
      const message = {
        to: expoPushToken,
        sound: "default",
        title,
        body,
      };

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error(`Failed to send push notification: ${response.statusText}`);
      }

      console.log("Push notification sent successfully");
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  },
};
