import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Easing,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { auth } from "./src/Firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import { Feather, MaterialIcons, FontAwesome5 } from "react-native-vector-icons";
import { setupNotificationResponseListener } from "./src/components/Notification/NotificationManager";

// Import screens
import Login from "./src/screens/Auth/Login";
import Signup from "./src/screens/Auth/Signup";
import ResetPassword from "./src/screens/Auth/ResetPassword";
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
import WeatherScreen from "./src/screens/WeatherScreen"; // Import the WeatherScreen
import { promptLogin, getLoginPromptMessage } from "./src/utils/authUtils";

import { animationStyles } from "./src/theme/animationStyles"; // Import animation styles

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

export const AuthContext = React.createContext({
  isGuest: false,
  setIsGuest: () => {},
  user: null,
  isAuthenticated: () => false,
  isGuestMode: () => false,
});

const withAuth = (Component) => {
  return function WithAuthComponent(props) {
    const auth = React.useContext(AuthContext);
    return <Component {...props} auth={auth} />;
  };
};

const ExplorerWithAuth = withAuth(Explorer);
const ProfileWithAuth = withAuth(Profile);
const PlanWithAuth = withAuth(Plan);
const MapWithAuth = withAuth(Map);

function BottomTabs() {
  const { setIsGuest } = React.useContext(AuthContext);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleProtectedAction = (navigation, action) => {
    if (!auth.currentUser) {
      promptLogin(navigation, getLoginPromptMessage(action), setIsGuest);
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: animationStyles.tabBarStyle,
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#999999",
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Plan"
        component={PlanWithAuth}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <MaterialIcons name="calendar-today" color={color} size={size} />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            animateIcon();
          },
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <MaterialIcons name="wb-sunny" color={color} size={size} />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            animateIcon();
          },
        }}
      />
      <Tab.Screen
        name="Explorer"
        component={ExplorerWithAuth}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Feather name="compass" color={color} size={size} />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            animateIcon();
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapWithAuth}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <FontAwesome5 name="map-marker-alt" color={color} size={size} />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: () => {
            animateIcon();
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileWithAuth}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Feather name="user" color={color} size={size} />
            </Animated.View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!handleProtectedAction(navigation, "view-profile")) {
              e.preventDefault();
            } else {
              animateIcon();
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: true }}>
      <AuthStack.Screen
        name="LoginScreen"
        component={Login}
        options={{ title: "Welcome" }}
      />
      <AuthStack.Screen
        name="SignupScreen"
        component={Signup}
        options={{ title: "Create Account" }}
      />
      <AuthStack.Screen
        name="ResetPasswordScreen"
        component={ResetPassword}
        options={{ title: "Reset Password" }}
      />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
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
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, isGuest } = React.useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user || isGuest ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const navigationRef = useRef(null); // Reference for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setIsGuest(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (navigationRef.current) {
      setupNotificationResponseListener(navigationRef.current); // Pass navigationRef here
    }
  }, []);

  const authContext = {
    isGuest,
    setIsGuest,
    user,
    isAuthenticated: () => user !== null,
    isGuestMode: () => !user && isGuest,
    currentUser: auth.currentUser,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
