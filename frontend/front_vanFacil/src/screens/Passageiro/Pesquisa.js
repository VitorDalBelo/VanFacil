import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import cores from '../../../assets/cores';

import MenuBar from '../Shared/MenuBar';
import CardPesquisa from '../Shared/pesquisa/CardPesquisa';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';

import Motoristas from '../../mocks/motorista';

export default function Inicial() {
   return (
      <>
         <MenuBar nomeTela={'Pesquisa Motorista'} mostraBtnPerfil={false} />
         <ListaPesquisa />
      </>
   );
}

function ListaPesquisa() {
   const navigation = useNavigation();
   return (
      <FlatList
         data={Motoristas}
         renderItem={({ item }) => {
            return (
               <CardPesquisa
                  {...item}
                  aoPressionar={() => {
                     navigation.navigate('Perfil', item);
                  }}
               />
            );
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}
