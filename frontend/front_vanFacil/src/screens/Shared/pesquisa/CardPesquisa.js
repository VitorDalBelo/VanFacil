import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

import Texto from '../../../components/Texto';

import cores from '../../../../assets/cores';



export default function CardPesquisa({photo , name, description, google_account,van_model, license_plate, aoPressionar }) {
   const photoUri = google_account ? photo : `${process.env.EXPO_PUBLIC_BACKEND_URL}${photo}`


   return (
      <TouchableOpacity style={estilos.cardPesquisa} onPress={aoPressionar}>
      <View style={estilos.topoCard}>
        {photo && <Image source={{ uri: photoUri }} style={estilos.imagem} />}

        <View style={estilos.infoContainer}>
          <View style={estilos.column}>
            <Texto style={estilos.label}>Nome:</Texto>
            <Texto style={estilos.text}>{name}</Texto>

            <Texto style={estilos.label}>Modelo da Van:</Texto>
            <Texto style={estilos.text}>{van_model}</Texto>
          </View>

          <View style={estilos.column}>
            <Texto style={estilos.label}>Placa:</Texto>
            <Texto style={estilos.text}>{license_plate}</Texto>
          </View>

        </View>

      </View>
      <View style={{width:"100%", overflow:"scroll", height:60 }}>
            <Texto style={estilos.label}>Descrição:</Texto>
            <Texto style={estilos.descriptionText}>{description}</Texto>
          </View>
    </TouchableOpacity>
   );
}

const larguraTela = Dimensions.get('screen').width;

const estilos = StyleSheet.create({
   cardPesquisa: {
      width: larguraTela - 40,
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
      marginBottom: 0,
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
      width: '100%',
      height: larguraTela * 0.6,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 10,
   },
   container: {
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    text: {
      fontSize: 16,
      marginBottom: 16,
    },

    infoContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex:1
    },
    descriptionText: {
      fontSize: 16,
      marginBottom: 16,
      numberOfLines: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
});
