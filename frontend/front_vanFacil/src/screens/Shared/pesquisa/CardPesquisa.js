import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../../components/Texto';
import cores from '../../../../assets/cores';

export default function CardPesquisa({ foto, nome, descrição, aoPressionar }) {
   return (
      <TouchableOpacity style={estilos.cardPesquisa} onPress={aoPressionar}>
         <View style={estilos.info}>
            <View style={estilos.topoCard}>
               <Image source={foto} style={estilos.imagem} />
               <Texto style={estilos.textoNome}>{nome}</Texto>
            </View>
            <View style={estilos.descCaixa}>
               <Texto style={estilos.desc}>{descrição}</Texto>
            </View>
         </View>
      </TouchableOpacity>
   );
}

const larguraTela = Dimensions.get('screen').width;
const larguraCard = larguraTela - 20;

const estilos = StyleSheet.create({
   cardPesquisa: {
      width: larguraCard,
      margin: 10,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
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
   info: {
      padding: 10,
   },
   topoCard: {
      flexDirection: 'row',
      width: '100%',
      height: 40,
      marginBottom: 10,
   },
   imagem: {
      width: 40,
      height: 40,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      marginRight: 10,
   },
   textoNome: {
      flex: 1,
      color: cores.preto,
      paddingHorizontal: 10,
      fontSize: 20,
      textAlignVertical: 'center',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
   },
   descCaixa: {
      height: larguraCard * 0.3,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      padding: 10,
   },
   desc: { fontSize: 16 },
   legendaMapa: {
      fontSize: 16,
      marginTop: 10,
   },
   caixaMapa: {
      width: larguraCard,
      height: larguraCard * 0.8,
      overflow: 'hidden',
      borderTopWidth: 2,
      borderColor: cores.azulProfundo,
   },
   imagemMapa: {
      width: larguraCard,
      height: larguraCard * 0.8,
      borderRadius: 10,
      alignSelf: 'center',
   },
});
