import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import MenuBar from './Shared/MenuBar';
import Texto from '../components/Texto';
import { useRoute } from '@react-navigation/native';

import cores from '../../assets/cores';

export default function Perfil() {
   const route = useRoute();
   const { foto, nome, descrição } = route.params;

   return (
      <>
         <MenuBar />
         <ScrollView style={estilos.molde}>
            <View style={estilos.topoPerfil}>
               <Image source={foto} style={estilos.foto} />
               <Texto style={estilos.textoNome}>{nome}</Texto>
            </View>
            <View>
               <Texto style={estilos.desc}>{descrição}</Texto>
               <Texto style={estilos.textoNome}>{'numero telefone'}</Texto>
               <Texto style={estilos.textoNome}>{'outra informação'}</Texto>
               <Texto style={estilos.textoNome}>{'outra informação'}</Texto>
               <Texto style={estilos.textoNome}>{'outra informação'}</Texto>
               <Texto style={estilos.textoNome}>{'outra informação'}</Texto>
            </View>
         </ScrollView>
      </>
   );
}

const estilos = StyleSheet.create({
   molde: {
      marginHorizontal: 20,
      flex: 1,
   },
   topoPerfil: {
      flexDirection: 'row',
      marginTop: 20,
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
      flex: 1,
      height: 40,
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
   desc: {
      marginTop: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: cores.azulProfundo,
      flex: 1,
      height: 120,
      backgroundColor: cores.branco,
      paddingLeft: 10,
      paddingTop: 5,
      fontSize: 15,
   },
});
