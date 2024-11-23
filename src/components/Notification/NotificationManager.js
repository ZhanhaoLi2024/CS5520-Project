import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior for foreground notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Notification Manager Component
export const NotificationManager = {
  scheduleNotification: async (title, body, triggerDate) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: triggerDate,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  },

  requestPermissions: async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("You need to grant notification permissions to use reminders.");
    }
  },
};
