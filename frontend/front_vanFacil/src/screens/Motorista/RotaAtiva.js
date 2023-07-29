import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';

import fotoPerfil from '../../../assets/teste/Haingrindi.png';

import cores from '../../../assets/cores';

const restantes = 10;

const passageiro = {
   nome: 'Revert Richards',
   distancia: 3,
};

export default function Rota() {
   return (
      <>
         <MapaRotaInativa />
         <View style={estilos.detalhesRota}>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Passageiros restantes:</Texto>
               <Texto style={estilos.textoDetalhes}>{restantes}</Texto>
            </View>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Próximo(a) passageiro(a):</Texto>
            </View>
            <View style={estilos.linhaDetalhe}>
               <Passageiro {...passageiro} />
            </View>
         </View>
      </>
   );
}

function Passageiro({ nome, distancia }) {
   return (
      <View style={estilos.passageiro}>
         <Image source={fotoPerfil} style={estilos.fotoPassageiro} />
         <View>
            <Texto style={estilos.texto}>{nome}</Texto>
            <Texto style={estilos.textoAbaixo}>{distancia} km de distância</Texto>
         </View>
      </View>
   );
}

const estilos = StyleSheet.create({
   texto: {
      fontSize: 18,
   },
   detalhesRota: {
      width: '100%',
      backgroundColor: cores.branco,
      position: 'absolute',
      bottom: 0,
      justifyContent: 'space-around',
   },
   linhaDetalhe: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ECECEC',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   textoDetalhes: {
      fontSize: 18,
      lineHeight: 42,
   },
   passageiro: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
   },
   fotoPassageiro: {
      width: 80,
      height: 80,
      borderRadius: 10,
      borderColor: cores.preto,
      borderWidth: 0.3,
      marginRight: 15,
   },
   textoAbaixo: {
      marginTop: 5,
      fontSize: 16,
      color: '#777777',
   },
});
