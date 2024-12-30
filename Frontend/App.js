import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import MenuScreen from './Screens/MenuScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UploadBookScreen from './Screens/UploadBookScreen';
import BookDetailsScreen from './Screens/BookDetailsScreen';
import SuccessScreen from './Screens/SuccessScreen';
import BookListScreen from './Screens/BookListScreen';
import ReadBookScreen from "./Screens/ReadBookScreen";
import RatingListScreen from './Screens/RatingListScreen';
import RateBookScreen from './Screens/RateBookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
          headerLeft: null, // Entfernt den Zurück-Button
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Menu" component={MenuScreen}  
       
          options={{
          headerLeft: null, // Entfernt den Zurück-Button
          }}
       />
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="UploadBookScreen" component={UploadBookScreen} options={{ title: 'Buch hinzufügen' }} />
        <Stack.Screen name="BookDetailsScreen" component={BookDetailsScreen} options={{ title: 'Buch hinzufügen' }} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Erfolg' }} />
        <Stack.Screen name="BookListScreen" component={BookListScreen} />
        <Stack.Screen name="ReadBookScreen" component={ReadBookScreen} options={{ title: "Buch lesen" }}/>
        <Stack.Screen name="RatingListScreen" component={RatingListScreen} options={{ title: 'Bewertungsliste' }}  />
        <Stack.Screen name="RateBookScreen" component={RateBookScreen} options={{ title: 'Buch bewerten' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}