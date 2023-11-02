import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import cores from '../../../assets/cores';
import Texto from '../../components/Texto';
import placeholder_photo from '../../../assets/placeholder_user_photo.png';

export default function CardPassageiro(props) {
   const [photoUri, setPhotoUri] = useState();

   useEffect(() => {
      if (props.passenger && props.passenger.user.google_account) {
         setPhotoUri(props.passenger.user.photo);
      } else if (props.passenger) {
         setPhotoUri(`${process.env.EXPO_PUBLIC_BACKEND_URL}${props.passenger.user.photo}`);
      }
   }, [props]);

   return (
      <>
         {props.passenger && (
            <View style={props.ausente ? estilos.ausente : estilos.passageiro}>
               {photoUri && <Image source={{ uri: photoUri }} style={estilos.fotoPassageiro} />}
               <View>
                  <Texto style={props.ausente ? estilos.textoAusente : estilos.texto}>{props.passenger.user.name}</Texto>
                  <Texto style={props.ausente ? estilos.textoAbaixoAusente : estilos.textoAbaixo}>{`${props.passenger.address.logradouro} ${
                     props.passenger.address.numero
                  } ${props.passenger.address.complemento ? props.passenger.address.complemento : ''}`}</Texto>
               </View>
            </View>
         )}
      </>
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
   ausente: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: cores.cinzaBorda,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: 'red',
   },
   ausente: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: cores.cinzaBorda,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: 'red',
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
   textoAusente: {
      fontSize: 18,
      color: 'white',
   },
   textoAbaixoAusente: {
      fontSize: 16,
      marginTop: 5,
      color: 'white',
   },
});
