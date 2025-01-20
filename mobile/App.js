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
import RatingScreen from "./src/RatingScreen";
import RateBookScreen from "./src/RateBookScreen";
import NotificationScreen from "./src/NotificationScreen";
import VerifyEmailScreen from "./src/VerifyEmailScreen";
import NearbyLibrariesScreen from "./src/NearbyLibrariesScreen";
import DetailsScreen from "./src/DetailsScreen";
import FavoriteGenreScreen from "./src/FavoriteGenreScreen";
import BookRecommendationScreen from "./src/BookRecommendationScreen";

import "react-native-get-random-values";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="UploadBookScreen"
          component={UploadBookScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />

        <Stack.Screen
          name="SuccessScreen"
          component={SuccessScreen}
          options={{
            headerShown: false,
          }}
        />

     
        <Stack.Screen
          name="BookListScreen"
          component={BookListScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="ReadBookScreen"
          component={ReadBookScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="RatingListScreen"
          component={RatingListScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="RateBookScreen"
          component={RateBookScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />

        <Stack.Screen
          name="NearbyLibrariesScreen"
          component={NearbyLibrariesScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />

        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />

        <Stack.Screen
          name="BookDetailsScreen"
          component={BookDetailsScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />

        <Stack.Screen
          name="LieblingsGenresScreen"
          component={FavoriteGenreScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
        <Stack.Screen
          name="BookRecommendationScreen"
          component={BookRecommendationScreen}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#D8C3FC",
            },
            headerTitle: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
