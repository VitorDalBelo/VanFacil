import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import MapView , {PROVIDER_GOOGLE}from 'react-native-maps';


export default function Mapa() {
    return (
      // Placeholder para a fução da API do Google Maps
    <View>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
    </View>
   );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});