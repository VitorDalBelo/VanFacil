import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import cores from '../../../assets/cores';

import CardRota from '../Shared/Inicial/CardRota';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';
import MenuBar from '../Shared/MenuBar';

import rotas from '../../mocks/rotas';

export default function Inicial() {
   const navigation = useNavigation();
   return (
      <>
         <MenuBar/>
         <ListaRotas />
         <BtnNovaRota telaMotorista={false} pressionar={() => navigation.navigate('P_Pesquisa')}/>
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
