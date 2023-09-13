import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../../components/Texto';

import ImagemFalha from '../../../../assets/icon.png';
import cores from '../../../../assets/cores';

import MapaRegiao from './MapaRegiao';

var img = ImagemFalha;

export default function CardPesquisa({ foto, nome, descrição, regiaoDeAtuacao, aoPressionar }) {
   img = foto;

   return (
      <TouchableOpacity style={estilos.cardPesquisa} onPress={aoPressionar}>
         <View style={estilos.topoCard}>
            <Image source={foto} style={estilos.imagem} />
            <Texto style={estilos.texto}>{nome}</Texto>
         </View>
         <Texto style={estilos.legendaMapa}>Área de atuação do motorista:</Texto>
         <View style={estilos.caixaMapa}>
            <MapaRegiao regiao={regiaoDeAtuacao} />
         </View>
      </TouchableOpacity>
   );
}

const larguraTela = Dimensions.get('screen').width;
const alturaCard = larguraTela * 0.8;

const estilos = StyleSheet.create({
   cardPesquisa: {
      width: larguraTela - 40,
      height: alturaCard,
      margin: 10,
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.branco,
      overflow: 'hidden',
      alignItems: 'baseline',

      // Android
      elevation: 4,

      //iOS
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
   },
   topoCard: {
      flexDirection: 'row',
      width: '100%',
      height: 40,
      marginBottom: 15,
   },
   imagem: {
      width: 40,
      height: 40,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      marginRight: 10,
   },
   texto: {
      flex: 1,
      color: cores.preto,
      paddingHorizontal: 10,
      fontSize: 20,
      textAlignVertical: 'center',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
   },
   legendaMapa: {
      fontSize: 16,
      marginBottom: 5,
   },
   caixaMapa: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 10,
   },
});
