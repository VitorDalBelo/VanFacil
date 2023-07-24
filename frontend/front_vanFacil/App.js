import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import M_Inicial from './src/screens/Motorista/Inicial';
import P_Inicial from './src/screens/Passageiro/Inicial';
import MenuBar from './src/screens/Shared/MenuBar';

export default function App() {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="auto" />
         <MenuBar nomeTela={'Minhas Rotas'} />
         <P_Inicial />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      //justifyContent: 'center',
   },
});
