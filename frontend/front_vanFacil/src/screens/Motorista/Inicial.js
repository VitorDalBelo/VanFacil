import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import cores from '../../../assets/cores';

import CardRota from '../Shared/Inicial/CardRota';
import BtnNovaRota from '../Shared/Inicial/BtnNovaRota';
import MenuBar from '../Shared/MenuBar';

import rotas from '../../mocks/rotas';
import { useNavigation } from '@react-navigation/native';

export default function Inicial() {
   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Home Motorista'} />
         <ListaRotas />
         <BtnNovaRota />
      </View>
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
                  }}
               />
            );
         }}
         keyExtractor={({ nome }) => nome}
      />
   );
}

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
});
