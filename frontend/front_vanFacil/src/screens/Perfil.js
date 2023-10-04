import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import MenuBar from './Shared/MenuBar';
import Texto from '../components/Texto';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/Auth/AuthContext';
import cores from '../../assets/cores';

export default function Perfil() {
   const route = useRoute();
   // const { foto, nome, descrição } = route.params;
   const {photoUri,user} = React.useContext(AuthContext)

   return (
      <>
         <MenuBar />
         <ScrollView style={estilos.molde}>
            <View style={estilos.topoPerfil}>
               <Image source={{uri:photoUri}} style={estilos.foto} />
               <Texto style={estilos.textoNome}>{user.name}</Texto>
            </View>
            <View>
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
      height: 60,
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
