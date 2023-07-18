import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import M_Inicial from './src/screens/Motorista/Inicial';

export default function App() {
   return (
      <SafeAreaView style={styles.container}>
         <StatusBar style="auto" />
         <M_Inicial />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
