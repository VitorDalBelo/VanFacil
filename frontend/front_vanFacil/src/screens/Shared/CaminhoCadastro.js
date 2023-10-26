import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import cores from '../../../assets/cores';
import Texto from '../../components/Texto';

export default function TesteNavegação() {
   const navigation = useNavigation();

   return (
      <View style={estilos.container}>
         <View style={estilos.tituloContainer}>
            <Texto style={estilos.textoTitulo}>Cadastro</Texto>
            <View style={estilos.linha}></View>
         </View>

         <View style={estilos.botoesContainer}>
            <Texto style={estilos.textoMsg}>Como deseja utilizar o aplicativo?</Texto>
            <TouchableOpacity style={estilos.button} onPress={() => navigation.navigate('CadastroMotorista')}>
               <Texto style={estilos.textoBotao}>Como motorista</Texto>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.button} onPress={() => navigation.navigate('CadastroPassageiro')}>
               <Texto style={estilos.textoBotao}>Como passageiro</Texto>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const alturaTela = Dimensions.get('screen').height;

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: '5%',
      backgroundColor: cores.branco,
   },
   tituloContainer: {
      width: '100%',
      position: 'absolute',
      top: alturaTela * 0.1,
      alignSelf: 'center',
      alignItems: 'center',
   },
   textoTitulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: cores.cinzaEscuro,
   },
   linha: {
      height: 2,
      width: '100%',
      backgroundColor: cores.azulProfundo,
      borderRadius: 5,
      marginTop: 10,
   },
   botoesContainer: {
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
   },
   textoMsg: {
      color: cores.cinzaEscuro,
      fontSize: 22,
      paddingBottom: 10,
   },
   button: {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: cores.azulProfundo,
      borderRadius: 5,
      marginVertical: 10,
   },
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
      fontSize: 20,
   },
});
