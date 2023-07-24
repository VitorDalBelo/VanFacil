import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import cores from '../../../../assets/cores';

export default function BtnNovaRota({ telaMotorista = true }) {
   const defineIcone = () => {
      if (telaMotorista) {
         return 'plus';
      }
      return 'search';
   };

   return (
      <TouchableOpacity style={estilos.botao}>
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
