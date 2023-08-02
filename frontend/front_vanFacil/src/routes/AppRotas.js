import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import M_Inicial from '../screens/Motorista/Inicial'
import M_RotaAtiva from '../screens/Motorista/RotaAtiva';


const Stack = createNativeStackNavigator();

export default function AppRotas() {
   return (<NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="M_inicial" component={M_Inicial} />
      </Stack.Navigator>
      </NavigationContainer>);
}
