import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import M_Inicial from '../screens/Motorista/Inicial';
import M_RotaAtiva from '../screens/Motorista/RotaAtiva';
import M_rota from '../screens/Motorista/Rota';
import P_pesquisa from '../screens/Passageiro/Pesquisa'

const Stack = createNativeStackNavigator();

export default function AppRotas() {
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="M_RotaAtiva" component={M_RotaAtiva} />
            {/* <Stack.Screen name="P_pesquisa" component={P_pesquisa} /> */}
            {/* <Stack.Screen name="M_Inicial" component={M_Inicial} />
            <Stack.Screen name="M_Rota" component={M_rota} />
            <Stack.Screen name="P_pesquisa" component={P_pesquisa} /> */}
         </Stack.Navigator>
      </NavigationContainer>
   );
}
