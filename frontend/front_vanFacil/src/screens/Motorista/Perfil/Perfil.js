import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import MenuBar from '../../Shared/MenuBar';
import Texto from '../../../components/Texto';

import cores from '../../../../assets/cores';
import MapaRegiao from '../../Shared/pesquisa/MapaRegiao';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Perfil() {
   const route = useRoute();
   const motorista = route.params;
   const regiaoDeAtuacao = motorista.regiaoDeAtuacao;

   const navigation = useNavigation();

   return (
      <>
         <MenuBar />
         <View style={estilos.molde}>
            <View style={estilos.topoPerfil}>
               <Image source={motorista.foto} style={estilos.foto} />
               <Texto style={estilos.textoNome}>{motorista.nome}</Texto>
            </View>
            <View style={estilos.info}>
               <Texto style={estilos.desc}>{motorista.descrição}</Texto>
               <Texto style={estilos.outraInfo}>{'numero telefone'}</Texto>
               <View style={estilos.caixaMapa}>
                  <MapaRegiao regiao={regiaoDeAtuacao} />
               </View>
               <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('DesenhaMapa', { regiaoDeAtuacao })}>
                  <Texto style={estilos.textoBotao}>Editar Dados</Texto>
               </TouchableOpacity>
            </View>
         </View>
      </>
   );
}

const estilos = StyleSheet.create({
   molde: {
      marginHorizontal: 20,
      marginVertical: 10,
      flex: 1,
   },
   topoPerfil: {
      flexDirection: 'row',
   },
   foto: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      marginRight: 15,
   },
   textoNome: {
      height: 40,
      flex: 1,
      marginTop: 10,
      paddingLeft: 10,
      paddingBottom: 5,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      textAlignVertical: 'bottom',
      backgroundColor: cores.branco,
      fontSize: 20,
   },
   info: {
      flex: 1,
   },
   outraInfo: {
      height: 40,
      marginVertical: 10,
      paddingLeft: 10,
      paddingBottom: 5,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      textAlignVertical: 'bottom',
      backgroundColor: cores.branco,
      fontSize: 20,
   },
   desc: {
      marginTop: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      height: 100,
      backgroundColor: cores.branco,
      paddingLeft: 10,
      paddingTop: 5,
      fontSize: 15,
   },
   caixaMapa: {
      flex: 1,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 10,
   },
   botao: {
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
