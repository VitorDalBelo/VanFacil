import React from 'react';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import cores from '../../../../assets/cores';
import { calculaCentro } from '../../../helpers/calculaCentro';

export default function MapaRegiao({ regiao, movimentar, onMapReady }) {
   var centro = calculaCentro(regiao);
   return (
      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         onMapReady={onMapReady}
         initialRegion={{
            latitude: centro.latitude,
            longitude: centro.longitude,
            latitudeDelta: centro.latitudeDelta,
            longitudeDelta: centro.longitudeDelta,
         }}
         moveOnMarkerPres={movimentar}
         scrollEnabled={movimentar}
         zoomEnabled={movimentar}
         rotateEnabled={false}
         pitchEnable={false}
      >
         <Polygon coordinates={regiao} fillColor={cores.roxoTransparente} strokeColor={cores.roxoTransparente} />
      </MapView>
   );
}
