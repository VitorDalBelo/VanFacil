import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MenuBar from '../Shared/MenuBar';
import CardPesquisa from '../Shared/pesquisa/CardPesquisa';

import useMotoristas from '../../hooks/useMotoristas';

export default function Pesquisa() {
   return (
      <View style={estilos.container}>
         <MenuBar nomeTela={'Pesquisa Motorista'} mostraBtnPerfil={false} />
         <ListaPesquisa />
      </View>
   );
}

function ListaPesquisa() {
   const motoristas = useMotoristas();
   const navigation = useNavigation();
   return (
      <FlatList
         data={motoristas}
         renderItem={({ item }) => {
            return (
               <CardPesquisa
                  {...item}
                  aoPressionar={() => {
                     navigation.navigate('M_Perfil', { ...item, donoDoPerfil: false });
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
