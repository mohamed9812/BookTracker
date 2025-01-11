import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreen";
import MenuScreen from "./src/MenuScreen";
import ProfileScreen from "./src/ProfileScreen";
import UploadBookScreen from "./src/UploadBookScreen";
import BookDetailsScreen from "./src/BookDetailsScreen";
import SuccessScreen from "./src/SuccessScreen";
import BookListScreen from "./src/BookListScreen";
import ReadBookScreen from "./src/ReadBookScreen";
import RatingListScreen from "./src/RatingListScreen";
import RateBookScreen from "./src/RateBookScreen";
import NotificationScreen from "./src/NotificationScreen";
import VerifyEmailScreen from "./src/VerifyEmailScreen";

const Stack = createStackNavigator();

// Konfiguration für Deep Linking if varification process enabled
// const linking = {
//   prefixes: [`http://${process.env.EXPO_PUBLIC_BASE_URI}:8081`],
//   config: {
//     screens: {
//       VerifyEmail: 'verify-email/:token', //
//     },
//   },
// };

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: null, // Entfernt den Zurück-Button
        }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="UploadBookScreen"
        component={UploadBookScreen}
        options={{ title: "Buch hinzufügen" }}
      />
      <Stack.Screen
        name="BookDetailsScreen"
        component={BookDetailsScreen}
        options={{ title: "Buch hinzufügen" }}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ title: "Erfolg" }}
      />
      <Stack.Screen name="BookListScreen" component={BookListScreen} />
      <Stack.Screen
        name="ReadBookScreen"
        component={ReadBookScreen}
        options={{ title: "Buch lesen" }}
      />
      <Stack.Screen
        name="RatingListScreen"
        component={RatingListScreen}
        options={{ title: "Bewertungsliste" }}
      />
      <Stack.Screen
        name="RateBookScreen"
        component={RateBookScreen}
        options={{ title: "Buch bewerten" }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ title: "Lesezeit Wecker" }}
      />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
