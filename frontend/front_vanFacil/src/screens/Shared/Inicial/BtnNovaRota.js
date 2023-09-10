import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import cores from '../../../../assets/cores';
import { useNavigation } from '@react-navigation/native';

export default function BtnNovaRota({ telaMotorista = true }) {
   const navigation = useNavigation();
   const defineIcone = () => {
      return telaMotorista ? 'plus' : 'search';
   };

   const defineCaminho = () => {
      const caminho = telaMotorista ? 'M_Rota' : 'P_Pesquisa';
      return () => navigation.navigate(caminho);
   };

   return (
      <TouchableOpacity style={estilos.botao} onPress={defineCaminho()}>
         <Feather name={defineIcone()} style={estilos.iconeBotao} />
      </TouchableOpacity>
   );
}

const estilos = StyleSheet.create({
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

// onPress={() => navigation.navigate('P_pesquisa')}
