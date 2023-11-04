import React from 'react';
import { StyleSheet, View } from 'react-native';

import MenuBar from '../Shared/MenuBar';
import ListaRotas from '../Shared/Inicial/ListaRotas';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

export default function Inicial() {
   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Home Motorista'} telaInicial={true} />
         <ListaRotas />
         <BtnNovaRota />
      </View>
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
});
