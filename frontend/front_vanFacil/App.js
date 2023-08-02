import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import MenuBar from './src/screens/Shared/MenuBar';

// Import das telas já feitas, quando houver a navegação vai ser deletado
import M_Inicial from './src/screens/Motorista/Inicial';
import P_Inicial from './src/screens/Passageiro/Inicial';
import M_Rota from './src/screens/Motorista/Rota';
import P_Rota from './src/screens/Passageiro/Rota';
import M_RotaAtiva from './src/screens/Motorista/RotaAtiva';

import AppRotas from './src/routes/AppRotas'

import {
   useFonts,
   Rubik_300Light,
   Rubik_400Regular,
   Rubik_500Medium,
   Rubik_700Bold,
} from '@expo-google-fonts/rubik';

SplashScreen.preventAutoHideAsync();

export default function App() {
   const [fontsLoaded] = useFonts({
      RubikLight: Rubik_300Light,
      RubikRegular: Rubik_400Regular,
      RubikMedium: Rubik_500Medium,
      RubikBold: Rubik_700Bold,
   });

   const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
         await SplashScreen.hideAsync();
      }
   }, [fontsLoaded]);

   if (!fontsLoaded) {
      return null;
   }

   return (
     
          
          <AppRotas />
          
      
      
      // <GestureHandlerRootView style={{ flex: 1 }}>
      //    <SafeAreaView style={estilos.container} onLayout={onLayoutRootView}>
      //       <StatusBar style="auto" />
      //       <MenuBar nomeTela={'USCS - Noite'} />
      //       <M_Inicial />
      //    </SafeAreaView>
      // </GestureHandlerRootView>
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
   },
});
