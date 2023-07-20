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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f0f0f0',
      paddingVertical: 5,
      paddingHorizontal: 15,
   },
   botaoMenu: {
      width: 40,
      height: 40,
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
