import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import cores from '../../../assets/cores';

import CardRota from '../Shared/Inicial/CardRota';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

import rotas from '../../mocks/rotas';

export default function Inicial() {
   return (
      <>
         <ListaRotas />
         <BtnNovaRota telaMotorista={false} />
      </>
   );
}
function ListaRotas() {
   return (
      <FlatList
         data={rotas.lista1}
         renderItem={({ item }) => {
            return <CardRota {...item} />;
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}
