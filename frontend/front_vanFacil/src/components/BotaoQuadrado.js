import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import cores from '../../assets/cores';

const tamanhoIcone = 24;

export default function BotaoQuadrado({ style = {}, tipo, nomeIcone, disabled, onPress }) {
   estiloPadrao = { backgroundColor: disabled ? 'gray' : cores.azulProfundo };

   const estiloVazio = Object.keys(style).length === 0;
   if (!estiloVazio) {
      estiloPadrao = style;
   }

   return (
      <TouchableOpacity style={[estilos.botao, estiloPadrao]} onPress={onPress} disabled={disabled}>
         <IconeBotao tipo={tipo} nome={nomeIcone} />
      </TouchableOpacity>
   );
}

function IconeBotao({ tipo, nome }) {
   switch (tipo) {
      case 'Feather':
         return <Feather name={nome} size={tamanhoIcone} style={estilos.icone} />;
      case 'Ionicons':
         return <Ionicons name={nome} size={tamanhoIcone} style={estilos.icone} />;
      default:
         return <Feather name={nome} size={tamanhoIcone} style={estilos.icone} />;
   }
}

const estilos = StyleSheet.create({
   botao: {
      height: tamanhoIcone + 20,
      width: tamanhoIcone + 20,
      alignSelf: 'flex-start',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
   },
   botaoAoLado: {
      marginRight: 10,
   },
   icone: {
      color: cores.branco,
   },
});
