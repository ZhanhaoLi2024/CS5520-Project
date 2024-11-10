import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
<<<<<<< Updated upstream
import Home from "./src/screens/Home";
=======
import React, { useState, useEffect } from "react";
import { auth } from "./src/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import Plan from "./src/screens/Plan";
>>>>>>> Stashed changes
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Explorer from "./src/screens/Explorer";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

<<<<<<< Updated upstream
=======
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
      name="Plan"
      component={Plan}
      options={{
        title: "iCook",
      }}
    />
    <Stack.Screen
      name="Explorer"
      component={Explorer}
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

>>>>>>> Stashed changes
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
