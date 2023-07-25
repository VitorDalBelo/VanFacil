import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import M_Inicial from './src/screens/Motorista/Inicial';
import MenuBar from './src/screens/Shared/MenuBar';
import Login from "./src/screens/Login"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const {Navigator,Screen} = createNativeStackNavigator();
export default function App() {
   return (
      <NavigationContainer>
         <Navigator initialRouteName='Login'>
            <Screen name='Login' component={Login} options={{headerShown:false}}></Screen>
         </Navigator>
      </NavigationContainer>
   );
}
