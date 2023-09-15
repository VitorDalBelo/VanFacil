import React from 'react';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import cores from '../../../../assets/cores';

export default function MapaRegiao({ regiao }) {
   var centro = calculaCentro(regiao);
   return (
      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         initialRegion={{
            latitude: centro.latitude,
            longitude: centro.longitude,
            latitudeDelta: centro.delta,
            longitudeDelta: centro.delta,
         }}
         scrollEnabled={false}
         zoomEnabled={false}
      >
         <Polygon coordinates={regiao} fillColor={cores.roxoTransparente} strokeColor={cores.roxoTransparente} />
      </MapView>
   );
}

function calculaCentro(regiao) {
   var latitudeCentro = 0;
   var longitudeCentro = 0;
   var delta = 0;
   var distancia = 0;

   // Média da latitude e longitude para determinar o centro
   regiao.forEach((x) => {
      latitudeCentro += x.latitude;
      longitudeCentro += x.longitude;
   });

   latitudeCentro /= regiao.length;
   longitudeCentro /= regiao.length;

   // Cálculo das maiores distâncias do centro, para determinar o 'zoom' do mapa
   regiao.forEach((x) => {
      distancia = Math.abs(x.latitude - latitudeCentro);
      if (delta < distancia) delta = distancia;
   });

   // Ajuste do delta para ter um espaço entre o poligono e as bordas
   delta *= 2.2;

   return {
      latitude: latitudeCentro,
      longitude: longitudeCentro,
      delta: delta,
   };
}
