import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import cores from '../../../assets/cores';

import CardRota from '../Shared/CardRota';

import rotas from '../../mocks/rotas';

export default function Inicial() {
   return (
      <>
         <ListaRotas />
         <BtnNovaRota />
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

function BtnNovaRota(style) {
   return (
      <TouchableOpacity style={[style, estilos.botao]}>
         <Feather name="plus" style={estilos.iconeBotao} />
      </TouchableOpacity>
   );
}

const estilos = StyleSheet.create({
   lista: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   botao: {
      position: 'absolute',
      bottom: 25,
      right: 25,
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      backgroundColor: cores.azulProfundo,
      borderRadius: 50,
   },
   iconeBotao: {
      fontSize: 30,
      color: cores.branco,
   },
});
