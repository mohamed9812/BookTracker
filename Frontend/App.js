import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import MenuScreen from './Screens/MenuScreen';
import ProfileScreen from './Screens/ProfileScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}