import React from 'react';

import { View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapaRotaInativa() {
   const mapRef = React.useRef(null);

   return (
      // Placeholder para a fução da API do Google Maps
      <View>
         <MapView ref={mapRef} style={{ width: '100%', height: '90%', zIndex: -1 }} provider={PROVIDER_GOOGLE} initialRegion={undefined} />
      </View>
   );
}
