import React from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert } from "react-native";

// Configure notification behavior for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Define action categories for interactive buttons
Notifications.setNotificationCategoryAsync("reminder", [
  {
    identifier: "CONFIRM",
    buttonTitle: "Confirm",
    options: { opensAppToForeground: true },
  },
  {
    identifier: "IGNORE",
    buttonTitle: "Ignore",
    options: { isDestructive: true },
  },
]);

export const NotificationManager = {
  getExpoPushToken: async () => {
    if (!Constants.isDevice) {
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

  scheduleNotification: async (title, body, triggerDate, notificationData) => {
    try {
      if (triggerDate <= new Date()) {
        Alert.alert("Invalid Time", "Please select a future time for the notification.");
        return;
      }

      const trigger = {
        type: "date",
        date: triggerDate,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          categoryIdentifier: "reminder",
          data: notificationData, // Attach custom data (e.g., plan details)
        },
        trigger,
      });

      console.log("Notification scheduled successfully");
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  },

  sendPushNotification: async (expoPushToken, title, body, notificationData) => {
    try {
      const message = {
        to: expoPushToken,
        sound: "default",
        title,
        body,
        categoryId: "reminder",
        data: notificationData,
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

// Register and handle notification responses
export const setupNotificationResponseListener = (navigation) => {
  Notifications.addNotificationResponseReceivedListener(async (response) => {
    const actionId = response.actionIdentifier;
    const notificationId = response.notification.request.identifier; // Get the notification ID

    try {
      if (actionId === "CONFIRM") {
        const plan = response.notification.request.content.data.plan;
        if (plan) {
          navigation.navigate("PlanDetail", { plan }); // Use navigation to go to the PlanDetail screen
        } else {
          Alert.alert("Error", "Plan details not found!");
        }
      } else if (actionId === "IGNORE") {
        console.log("Notification ignored.");
      } else {
        console.log("Notification tapped without action.");
      }

      // Dismiss the notification after any action
      await Notifications.dismissNotificationAsync(notificationId);
    } catch (error) {
      console.error("Error dismissing notification:", error);
    }
  });
};
