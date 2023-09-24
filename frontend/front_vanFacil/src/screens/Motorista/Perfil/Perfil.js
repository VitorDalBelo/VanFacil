import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import MenuBar from '../../Shared/MenuBar';
import Texto from '../../../components/Texto';

import cores from '../../../../assets/cores';
import MapaRegiao from '../../Shared/Pesquisa/MapaRegiao';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Perfil() {
   const route = useRoute();
   const { foto, nome, descrição, regiaoDeAtuacao, donoDoPerfil } = route.params;

   const navigation = useNavigation();

   return (
      <>
         <MenuBar />
         <View style={estilos.molde}>
            <View style={estilos.topoPerfil}>
               <Image source={foto} style={estilos.foto} />
               <Texto style={estilos.textoNome}>{nome}</Texto>
            </View>
            <View style={estilos.info}>
               <Texto style={estilos.desc}>{descrição}</Texto>
               <Texto style={estilos.outraInfo}>{'numero telefone'}</Texto>
               <View style={estilos.caixaMapa}>
                  <MapaRegiao regiao={regiaoDeAtuacao} />
               </View>
               {donoDoPerfil && (
                  <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('DesenhaMapa', { regiaoDeAtuacao })}>
                     <Texto style={estilos.textoBotao}>Editar Dados</Texto>
                  </TouchableOpacity>
               )}
            </View>
         </View>
      </>
   );
}

const estilos = StyleSheet.create({
   molde: {
      margin: 10,
      flex: 1,
   },
   topoPerfil: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   foto: {
      width: 60,
      height: 60,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      marginRight: 10,
   },
   textoNome: {
      flex: 1,
      height: 40,
      backgroundColor: cores.branco,
      paddingHorizontal: 10,
      textAlignVertical: 'center',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      fontSize: 20,
   },
   info: {
      flex: 1,
   },
   outraInfo: {
      height: 40,
      marginVertical: 10,
      textAlignVertical: 'center',
      paddingLeft: 10,
      fontSize: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      backgroundColor: cores.branco,
   },
   desc: {
      backgroundColor: cores.branco,
      marginTop: 10,
      borderRadius: 5,
      paddingLeft: 10,
      paddingTop: 5,
      fontSize: 15,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      height: 100,
   },
   caixaMapa: {
      flex: 1,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
   },
   botao: {
      alignSelf: 'flex-start',
      padding: 10,
      borderRadius: 10,
      backgroundColor: cores.azulProfundo,
      color: cores.preto,
      marginTop: 10,

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
