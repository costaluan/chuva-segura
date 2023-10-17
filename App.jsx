import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Routes from './src/routes';


import Login from "./src/pages/login";
import AuthProvider from './auth/src/context/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <AuthProvider>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator> */}
      <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}