import React, { useCallback } from 'react';
import { StatusBar, StyleSheet, SafeAreaView ,LogBox} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import AppRotas from './src/routes/AppRotas';

import { useFonts, Rubik_300Light, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';

import {
   GoogleSignin,
   statusCodes,
 } from '@react-native-google-signin/google-signin';

 GoogleSignin.configure({
   androidClientId: '329088296130-ntjm0st16jh9btsher95rge5asotvbqp.apps.googleusercontent.com',
   iosClientId: '329088296130-aqq4ph2d2fevv21f9km5636n2tomh0a5.apps.googleusercontent.com',
});

SplashScreen.preventAutoHideAsync();

console.log("BackEnd",process.env.EXPO_PUBLIC_BACKEND_URL);

export default function App() {
   // warnings.js
   // console.disableYellowBox = true;
   // LogBox.ignoreAllLogs()

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
