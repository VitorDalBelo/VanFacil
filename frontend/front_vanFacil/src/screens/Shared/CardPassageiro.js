import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import cores from '../../../assets/cores';
import Texto from '../../components/Texto';

export default function CardPassageiro({ foto, nome, endereco }) {
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
   },
   fotoPassageiro: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderWidth: 0.3,
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
