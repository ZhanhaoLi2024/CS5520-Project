import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { auth } from "./src/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import {
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "react-native-vector-icons";
import Login from "./src/screens/Auth/Login";
import Signup from "./src/screens/Auth/Signup";
import Explorer from "./src/screens/Post/Explorer";
import Profile from "./src/screens/Profile";
import Map from "./src/screens/Map";
import Plan from "./src/screens/MealPlan/Plan";
import MealPlanner from "./src/screens/MealPlan/MealPlanner";
import PlanDetail from "./src/screens/MealPlan/PlanDetail";
import PlanEdit from "./src/screens/MealPlan/PlanEdit";
import NewPost from "./src/screens/Post/NewPost";
import PostDetail from "./src/screens/Post/PostDetail";
import EditPost from "./src/screens/Post/EditPost";
import LocationMap from "./src/components/Location/LocationMap";

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
        },
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#999999",
        headerShown: true,
      }}
    >
      {/* Plan Tab */}
      <Tab.Screen
        name="Plan"
        component={Plan}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
          ),
          title: "Plan",
        }}
      />
      {/* Explorer Tab */}
      <Tab.Screen
        name="Explorer"
        component={Explorer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" color={color} size={size} />
          ),
          title: "Explorer",
        }}
      />
      {/* Map Tab */}
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" color={color} size={size} />
          ),
          title: "Map",
        }}
      />
      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
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
      options={{ title: "Welcome" }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{ title: "Create Account" }}
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
      options={{ headerBackTitle: "Back" }}
    />
    <Stack.Screen
      name="PlanEdit"
      component={PlanEdit}
      options={{
        title: "Edit Meal Plan",
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="NewPost"
      component={NewPost}
      options={{
        title: "Create Post",
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="PostDetail"
      component={PostDetail}
      options={{ headerBackTitle: "Back" }}
    />
    <Stack.Screen
      name="EditPost"
      component={EditPost}
      options={{
        title: "Edit Post",
        headerBackTitle: "Back",
      }}
    />
    <Stack.Screen
      name="LocationMap"
      component={LocationMap}
      options={{
        title: "Pick Location",
        headerBackTitle: "Back",
      }}
    />
  </>
);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
      console.log(user ? `User signed in: ${user.email}` : "User signed out");
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>{user ? AppStack() : AuthStack()}</Stack.Navigator>
    </NavigationContainer>
  );
}
