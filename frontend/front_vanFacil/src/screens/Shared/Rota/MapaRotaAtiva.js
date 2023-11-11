import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapaRotaAtiva() {
   const [region, setRegion] = useState({
      latitude: -23.618257130791033,
      longitude: -46.578958189894266,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0121,
   });

   return (
      <View>
         <MapView region={region} style={styles.map} provider={PROVIDER_GOOGLE} />
      </View>
   );
}
const styles = StyleSheet.create({
   map: {
      width: '100%',
      height: '100%',
   },
});
