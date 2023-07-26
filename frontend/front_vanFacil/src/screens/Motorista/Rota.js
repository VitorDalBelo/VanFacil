import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Texto from '../../components/Texto';

import imagemMapa from '../../../assets/teste/ExemploMapa.png';
import cores from '../../../assets/cores';

const numConfirmados = 10;
const numTotal = 15;
const hora = 1;
const minuto = 25;

export default function Rota() {
   return (
      <>
         <Mapa />
         <View style={estilos.detalhesRota}>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Passageiros confirmados:</Texto>
               <Texto style={estilos.textoDetalhes}>
                  {numConfirmados}/{numTotal}
               </Texto>
            </View>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Tempo Estimado:</Texto>
               <Texto style={estilos.textoDetalhes}>
                  {hora}:{minuto}
               </Texto>
            </View>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Outra info</Texto>
            </View>

            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Mais info</Texto>
            </View>
            <View style={estilos.linhaDetalhe}>
               <TouchableOpacity style={estilos.btnIniciarRota}>
                  <Texto style={estilos.textoBotao}>Iniciar Rota</Texto>
               </TouchableOpacity>
               <TouchableOpacity style={estilos.btnIniciarRota}>
                  <Texto style={estilos.textoBotao}>Editar Rota</Texto>
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
}

function Mapa() {
   return (
      // Placeholder para a fução da API do Google Maps
      <View>
         <Image source={imagemMapa} />
      </View>
   );
}

const estilos = StyleSheet.create({
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
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   textoDetalhes: {
      fontSize: 18,
      lineHeight: 42,
   },
   btnIniciarRota: {
      alignSelf: 'flex-start',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      color: cores.preto,
      marginVertical: 10,

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
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
      fontSize: 18,
   },
});
