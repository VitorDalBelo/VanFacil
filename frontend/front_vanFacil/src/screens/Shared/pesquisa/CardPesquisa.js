import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../../components/Texto';

import ImagemFalha from '../../../../assets/icon.png';
import cores from '../../../../assets/cores';

var img = ImagemFalha;

export default function CardPesquisa({ foto, nome, descrição, aoPressionar }) {
   img = foto;

   return (
      <TouchableOpacity style={estilos.cardPesquisa} onPress={aoPressionar}>
         <View style={estilos.topoCard}>
            <Image source={foto} style={estilos.imagem} />
            <Texto style={estilos.texto}>{nome}</Texto>
         </View>
         <View style={estilos.descCaixa}>
            <Texto style={estilos.desc}>{descrição}</Texto>
         </View>
      </TouchableOpacity>
   );
}

const larguraTela = Dimensions.get('screen').width;

const alturaImagem = Image.resolveAssetSource(img).height;
const larguraImagem = Image.resolveAssetSource(img).width;

const alturaCard = ((alturaImagem - 120) / larguraImagem) * larguraTela - 140;

const estilos = StyleSheet.create({
   cardPesquisa: {
      width: larguraTela - 40,
      height: alturaCard,
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'white',
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
      padding: 10,
      backgroundColor: cores.branco,
      width: '100%',
      height: 60,
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
      color: '#000',
      paddingLeft: 8,
      fontSize: 20,
      textAlignVertical: 'center',
      width: larguraTela - 110,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
   },
   descCaixa: {
      flex: 1,
      width: larguraTela - 60,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      margin: 10,
      padding: 10,
   },
   desc: {},
});
