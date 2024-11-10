import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { auth } from "./src/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Create from "./src/screens/Create";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

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

// Define app stack (screens for authenticated users)
const AppStack = () => (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: "iCook",
      }}
    />
    <Stack.Screen
      name="Create"
      component={Create}
      options={{
        title: "Share Your Recipe",
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "My Profile",
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
