import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import MenuBar from './src/screens/Shared/MenuBar';

import AppRotas from './src/routes/AppRotas';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
         <SafeAreaView style={estilos.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            {/* <MenuBar nomeTela={'USCS - Noite'} /> */}
            <AppRotas />
         </SafeAreaView>
      </GestureHandlerRootView>
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ffffff',
   },
});
