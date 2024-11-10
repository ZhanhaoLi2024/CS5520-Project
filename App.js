import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Create from "./src/screens/Create";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

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
