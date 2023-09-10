import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuBar from '../Shared/MenuBar';
import CardPesquisa from '../Shared/Pesquisa/CardPesquisa';

import Motoristas from '../../mocks/motoristas';

export default function Inicial() {
   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Pesquisa Motorista'} mostraBtnPerfil={false} />
         <ListaPesquisa />
      </View>
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

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
   },
});
