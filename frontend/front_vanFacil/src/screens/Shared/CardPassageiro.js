import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import cores from '../../../assets/cores';
import Texto from '../../components/Texto';
import placeholder_photo from '../../../assets/placeholder_user_photo.png';

export default function CardPassageiro({ foto = placeholder_photo, nome, endereco }) {
   return (
      <View style={estilos.passageiro}>
         <Image source={foto} style={estilos.fotoPassageiro} />
         <View>
            <Texto style={estilos.texto}>{nome}</Texto>
            <Texto style={estilos.textoAbaixo}>{endereco}</Texto>
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
