import React, { useReducer, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import Texto from '../../components/Texto';
import MapaRotaInativa from '../Shared/Rota/MapaRotaInativa';

import cores from '../../../assets/cores';

const numConfirmados = 10;
const numTotal = 15;

export default function Rota() {
   const [vai, inverterVai] = useReducer((vai) => !vai, true);
   const [volta, inverterVolta] = useReducer((volta) => !volta, true);

   const estilosSwitch = funcaoEstilo(vai, volta);

   return (
      <>
         <MenuBar nomeTela={'Rota Inativa Passageiro'} />
         <MapaRotaInativa />
         <View style={estilos.detalhesRota}>
            <View style={estilos.linhaDetalhe}>
               <Texto style={estilos.textoDetalhes}>Passageiros confirmados:</Texto>
               <Texto style={estilos.textoDetalhes}>
                  {numConfirmados}/{numTotal}
               </Texto>
            </View>

            <View style={estilos.linhaDetalhe}>
               <TouchableOpacity style={estilos.botao}>
                  <Texto style={estilos.textoBotao}>Mensagem</Texto>
               </TouchableOpacity>
               <TouchableOpacity style={estilos.botao}>
                  <Texto style={estilos.textoBotao}>Detalhes</Texto>
               </TouchableOpacity>
            </View>

            <View style={estilos.linhaDetalhe}>
               <TouchableOpacity
                  style={[estilos.botao, estilosSwitch.botaoIda]}
                  onPress={inverterVai}
               >
                  <Texto style={estilos.textoBotao}>{vai ? 'Vou' : 'Não vou'}</Texto>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[estilos.botao, estilosSwitch.botaoVolta]}
                  onPress={inverterVolta}
               >
                  <Texto style={estilos.textoBotao}>{volta ? 'Volto' : 'Não volto'}</Texto>
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
}

const funcaoEstilo = (vai, volta) =>
   StyleSheet.create({
      botaoIda: {
         backgroundColor: vai ? cores.azulProfundo : cores.vermelho,
      },
      botaoVolta: {
         backgroundColor: volta ? cores.azulProfundo : cores.vermelho,
      },
   });

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
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   textoDetalhes: {
      fontSize: 18,
      lineHeight: 42,
   },
   botao: {
      width: '48%',
      alignSelf: 'flex-start',
      alignItems: 'center',
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
      lineHeight: 30,
   },
   switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   switch: {
      marginLeft: 5,
   },
});
