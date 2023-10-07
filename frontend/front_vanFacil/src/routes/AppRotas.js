import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navegação from '../screens/testeNavegação';
import Cadastro from '../screens/cadastro';

import M_Inicial from '../screens/Motorista/Inicial';
import M_Perfil from '../screens/Motorista/Perfil/Perfil';
import M_Rota from '../screens/Motorista/Rota';
import M_RotaAtiva from '../screens/Motorista/RotaAtiva';
import CapturaMapa from '../screens/testeCapturaMapa';
import DesenhaMapa from '../screens/Motorista/Perfil/DesenhaMapa';

import P_Inicial from '../screens/Passageiro/Inicial';
import P_Pesquisa from '../screens/Passageiro/Pesquisa';
import P_Rota from '../screens/Passageiro/Rota';
import P_RotaAtiva from '../screens/Passageiro/RotaAtiva';

import Perfil from '../screens/Perfil';
import CadastroPassageiro from '../screens/Cadastro/CadastroPassageiro';

import { AuthProvider } from '../context/Auth/AuthContext';

import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

export default function AppRotas() {
   return (
      <NavigationContainer>
         <AuthProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="CadastroPassageiro" component={CadastroPassageiro} />

               <Stack.Screen name="Navegação" component={Navegação} />
               <Stack.Screen name="Cadastro" component={Cadastro} />

               <Stack.Screen name="M_Inicial" component={M_Inicial} />
               <Stack.Screen name="M_Perfil" component={M_Perfil} />
               <Stack.Screen name="DesenhaMapa" component={DesenhaMapa} />
               <Stack.Screen name="CapturaMapa" component={CapturaMapa} />

               <Stack.Screen name="M_Rota" component={M_Rota} />
               <Stack.Screen name="M_RotaAtiva" component={M_RotaAtiva} />

               <Stack.Screen name="P_Inicial" component={P_Inicial} />
               <Stack.Screen name="P_Pesquisa" component={P_Pesquisa} />
               <Stack.Screen name="P_Rota" component={P_Rota} />
               <Stack.Screen name="P_RotaAtiva" component={P_RotaAtiva} />

               <Stack.Screen name="Perfil" component={Perfil} />
            </Stack.Navigator>
         </AuthProvider>
      </NavigationContainer>
   );
}
