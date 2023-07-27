import React from 'react';

import { Image, View } from 'react-native';

import imagemMapa from '../../../../assets/teste/ExemploMapa.png';

export default function MapaRotaInativa() {
   return (
      // Placeholder para a fução da API do Google Maps
      <View>
         <Image source={imagemMapa} />
      </View>
   );
}
