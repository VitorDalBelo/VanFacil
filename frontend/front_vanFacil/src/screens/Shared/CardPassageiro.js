import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import cores from '../../../assets/cores';
import Texto from '../../components/Texto';
import placeholder_photo from '../../../assets/placeholder_user_photo.png';

export default function CardPassageiro(props) {
   const [photoUri, setPhotoUri] = useState(placeholder_photo);

   useEffect(() => {
      console.log(props);
      if (props.photo != null) {
         setPhotoUri(props.google_account ? { uri: props.photo } : { uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${props.photo}` });
      }
   }, [props]);

   return (
      <View style={estilos.passageiro}>
         <Image source={photoUri} style={estilos.fotoPassageiro} />
         <View style={{ flex: 1 }}>
            <Texto style={estilos.texto}>{props.name}</Texto>
            <Texto style={estilos.textoAbaixo}>{props.address}</Texto>
         </View>
      </View>
   );
}

const estilos = StyleSheet.create({
   passageiro: {
      backgroundColor: cores.branco,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: cores.cinzaBorda,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
   },
   fotoPassageiro: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: cores.preto,
      marginRight: 15,
   },
   texto: {
      fontSize: 18,
   },
   textoAbaixo: {
      fontSize: 16,
      marginTop: 5,
      color: '#777777',
   },
});
