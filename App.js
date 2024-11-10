import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { auth } from "./src/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Explorer from "./src/screens/Explorer";
import Profile from "./src/screens/Profile";
import Map from "./src/screens/Map";
import Plan from "./src/screens/Plan";
import MealPlanner from "./src/screens/MealPlanner";
import PlanDetail from "./src/components/PlanDetail";
import PlanEdit from "./src/screens/PlanEdit";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator component for authenticated users
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
          // paddingBottom: 5,
          // paddingTop: 5,
        },
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#999999",
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Plan"
        component={Plan}
        options={{
          // tabBarIcon: ({ color, size }) => (
          //   <CalendarIcon color={color} size={size} />
          // ),
          title: "Plan",
        }}
      />
      <Tab.Screen
        name="Explorer"
        component={Explorer}
        options={{
          // tabBarIcon: ({ color, size }) => (
          //   <CompassIcon color={color} size={size} />
          // ),
          title: "Explorer",
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          // tabBarIcon: ({ color, size }) => (
          //   <MapIcon color={color} size={size} />
          // ),
          title: "Map",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // tabBarIcon: ({ color, size }) => (
          //   <UserIcon color={color} size={size} />
          // ),
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

// Define authentication stack (screens for non-authenticated users)
const AuthStack = () => (
  <>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: "Welcome",
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        title: "Create Account",
      }}
    />
  </>
);

// Define app stack with bottom tabs for authenticated users
const AppStack = () => (
  <>
    <Stack.Screen
      name="MainTabs"
      component={BottomTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MealPlanner"
      component={MealPlanner}
      options={{
        title: "Meal Planner",
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="PlanDetail"
      component={PlanDetail}
      options={{
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="PlanEdit"
      component={PlanEdit}
      options={{
        title: "Edit Meal Plan",
        headerBackTitle: "Back",
      }}
    />
  </>
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("User is signed in:", user.email);
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>{user ? AppStack() : AuthStack()}</Stack.Navigator>
    </NavigationContainer>
  );
}
