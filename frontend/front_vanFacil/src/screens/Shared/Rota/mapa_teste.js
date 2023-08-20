import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';



export default function Mapa() {
    return (
      // Placeholder para a fução da API do Google Maps
    <View>
      <MapView style={styles.map} />
    </View>
   );
}
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});