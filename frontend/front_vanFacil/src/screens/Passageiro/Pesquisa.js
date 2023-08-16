import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import cores from '../../../assets/cores';

import MenuBar from '../Shared/MenuBar';
import CardPesquisa from '../Shared/pesquisa/CardPesquisa';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

import Motoristas from '../../mocks/motorista';

export default function Inicial() {
   return (
      <>
         <MenuBar/>
         <ListaPesquisa />
      </>
   );
}
function ListaPesquisa() {
   return (
      <FlatList
         data={Motoristas}
         renderItem={({ item }) => {
            return <CardPesquisa {...item} />;
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}
