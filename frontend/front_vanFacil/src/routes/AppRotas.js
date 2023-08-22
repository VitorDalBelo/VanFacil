import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import M_Inicial from '../screens/Motorista/Inicial';
import M_RotaAtiva from '../screens/Motorista/RotaAtiva';
import M_rota from '../screens/Motorista/Rota';
import Navegação from '../screens/testeNavegação'

import P_Inicial from '../screens/Passageiro/Inicial'
import P_Pesquisa from '../screens/Passageiro/Pesquisa'

import Perfil from '../screens/Perfil'

const Stack = createNativeStackNavigator();

export default function AppRotas() {
   return (
      <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Navegação" component={Navegação} />
            <Stack.Screen name="M_Inicial" component={M_Inicial} />
            <Stack.Screen name="M_RotaAtiva" component={M_RotaAtiva} />
            <Stack.Screen name="M_Rota" component={M_rota} />

            <Stack.Screen name="P_Inicial" component={P_Inicial} />
            <Stack.Screen name="P_Pesquisa" component={P_Pesquisa} />

            <Stack.Screen name="Perfil" component={Perfil} />

         </Stack.Navigator>
      </NavigationContainer>
   );
}
