import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import cores from '../../../assets/cores';

import CardRota from '../Shared/Inicial/CardRota';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

import rotas from '../../mocks/rotas';
import { useNavigation } from '@react-navigation/native';

export default function Inicial() {
   return (
      <>
         <ListaRotas />
         <BtnNovaRota />
      </>
   );
}
function ListaRotas() {
   const navigation = useNavigation();

   return (
      <FlatList
         data={rotas.lista1}
         renderItem={({ item }) => {
            return (
               <CardRota
                  {...item}
                  aoPressionar={() => {
                     navigation.navigate('M_RotaAtiva');
                     console.log('a');
                  }}
               />
            );
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}
