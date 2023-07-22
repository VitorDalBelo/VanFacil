import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import FotoPerfil from '../../../assets/teste/Gataruga.png';
import cores from '../../../assets/cores';
import { Feather } from '@expo/vector-icons';

export default function MenuBar({ nomeTela }) {
   return (
      <View style={estilos.menuBar}>
         <TouchableOpacity style={estilos.botaoMenu}>
            <Feather name="menu" style={estilos.iconeMenu} />
         </TouchableOpacity>

         <Text style={estilos.nomeTela}>{nomeTela}</Text>

         <TouchableOpacity style={estilos.botaoPerfil}>
            <Image source={FotoPerfil} style={estilos.fotoPerfil} />
         </TouchableOpacity>
      </View>
   );
}

const estilos = StyleSheet.create({
   menuBar: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: cores.cinzaClaro,
      paddingVertical: 5,
      paddingHorizontal: 20,
   },
   botaoMenu: {
      width: 33,
      height: 33,
      alignItems: 'center',
      justifyContent: 'center',
   },
   iconeMenu: {
      fontSize: 30,
   },
   botaoPerfil: {},
   fotoPerfil: {
      width: 33,
      height: 33,
      borderRadius: 50,
   },
   nomeTela: {
      fontSize: 18,
      fontWeight: 'bold',
   },
});
