import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../components/Texto';

import cores from '../../../assets/cores';

export default function CardPesquisa({ photo, name, description, google_account, van_model, license_plate, aoPressionar }) {
   const photoUri = google_account ? photo : `${process.env.EXPO_PUBLIC_BACKEND_URL}${photo}`;

   return (
      <TouchableOpacity style={estilos.cardPesquisa} onPress={aoPressionar}>
         <View style={estilos.topoCard}>
            {photo && <Image source={{ uri: photoUri }} style={estilos.imagem} />}
            <Texto style={estilos.textoNome}>{name}</Texto>
         </View>
         <View style={estilos.infoContainer}>
            <View style={{ flex: 2 }}>
               <Texto style={estilos.label}>Modelo da Van</Texto>
               <Texto style={estilos.infoText}>{van_model}</Texto>
            </View>

            <View style={{ flex: 1 }}>
               <Texto style={estilos.label}>Placa</Texto>
               <Texto style={estilos.infoText}>{license_plate}</Texto>
            </View>
         </View>

         <View style={estilos.descContainer}>
            <Texto style={estilos.label}>Descrição</Texto>
            <Texto style={estilos.infoText}>{description}</Texto>
         </View>
      </TouchableOpacity>
   );
}

const larguraTela = Dimensions.get('screen').width;
const larguraCard = larguraTela - 20;

const estilos = StyleSheet.create({
   cardPesquisa: {
      width: larguraCard,
      alignSelf: 'center',
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
   topoCard: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomColor: cores.azulProfundo,
      borderBottomWidth: 1,
   },
   imagem: {
      width: 60,
      height: 60,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: cores.azulProfundo,
   },
   label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: cores.preto,
   },
   textoNome: {
      flex: 1,
      color: cores.preto,
      paddingHorizontal: 10,
      fontSize: 20,
      textAlignVertical: 'center',
      marginLeft: 10,
   },
   infoContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderBottomColor: cores.azulProfundo,
      borderBottomWidth: 1,
   },
   infoText: {
      fontSize: 16,
      color: cores.cinzaEscuro,
   },
   descContainer: {
      padding: 10,
      height: larguraCard * 0.33,
   },
   descCaixa: {
      height: larguraCard * 0.3,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      padding: 10,
   },
});
