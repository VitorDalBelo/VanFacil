import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../../components/Texto';

import ImagemFalha from '../../../../assets/icon.png';
import cores from '../../../../assets/cores';

var img = ImagemFalha;

export default function CardRota({ imagem, nome, aoPressionar }) {
   img = imagem;

   return (
      <TouchableOpacity style={estilos.cardRota} onPress={aoPressionar}>
         <Image source={imagem} style={estilos.imagem} />
         <View style={estilos.textContainer}>
            <Texto style={estilos.texto}>{nome}</Texto>
         </View>
      </TouchableOpacity>
   );
}

const larguraTela = Dimensions.get('screen').width;

const alturaImagem = Image.resolveAssetSource(img).height;
const larguraImagem = Image.resolveAssetSource(img).width;

const alturaCard = ((alturaImagem - 120) / larguraImagem) * larguraTela - 140;

const estilos = StyleSheet.create({
   cardRota: {
      width: larguraTela - 40,
      height: alturaCard,
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'white',
      overflow: 'hidden',
      flexDirection: 'row',
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
   imagem: {
      width: larguraTela - 40,
      height: alturaCard - 1,
   },
   textContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: 10,
      backgroundColor: cores.gelo,
      width: '100%',
      height: 48,
   },
   texto: {
      color: '#000',
      paddingLeft: 8,
      fontSize: 20,
   },
});