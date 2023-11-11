import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../components/Texto';
import placeholder_photo from '../../../assets/placeholder_user_photo.png';
import cores from '../../../assets/cores';

export default function CardPesquisa({ photo, name, description, google_account, van_model, license_plate, aoPressionar }) {
   const [photoUri, setPhotoUri] = useState(placeholder_photo);
   useEffect(() => {
      if (photo != null) {
         setPhotoUri(google_account ? { uri: photo } : { uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${photo}` });
      }
   }, []);

   return (
      <TouchableOpacity style={estilos.cardPesquisa} onPress={aoPressionar}>
         <View style={[estilos.topoCard, estilos.bordaAbaixo]}>
            {photo && <Image source={photoUri} style={estilos.imagem} />}
            <Texto style={estilos.textoNome}>{name}</Texto>
         </View>
         <View style={[estilos.infoContainer, estilos.bordaAbaixo]}>
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
      backgroundColor: cores.branco,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 10,
      overflow: 'hidden',

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
   bordaAbaixo: {
      borderBottomColor: cores.cinza,
      borderBottomWidth: 1,
   },
   topoCard: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
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
   },
   infoText: {
      fontSize: 16,
      color: cores.cinzaEscuro,
   },
   descContainer: {
      padding: 10,
      height: larguraCard * 0.35,
   },
});
