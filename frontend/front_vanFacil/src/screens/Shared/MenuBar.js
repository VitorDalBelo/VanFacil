import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../context/Auth/AuthContext';
import Texto from '../../components/Texto';

import cores from '../../../assets/cores';
import { useNavigation } from '@react-navigation/native';
import useMotoristas from '../../hooks/useMotoristas';

export default function MenuBar({ nomeTela, mostraBtnPerfil = true }) {
   return (
      <View style={estilos.menuBar}>
         <Texto style={estilos.nomeTela}>{nomeTela}</Texto>
         {mostraBtnPerfil && <BotaoPerfil />}
      </View>
   );
}

function BotaoPerfil() {
   const navigation = useNavigation();
   const motoristas = useMotoristas();
   const { photoUri, user } = React.useContext(AuthContext);

   const defineCaminho = () => {
      if (user.profile == 'driver') {
         return navigation.navigate('M_Perfil', { donoDoPerfil: true });
      } else {
         return navigation.navigate('Perfil', { ...motoristas[1] });
      }
   };

   return (
      <TouchableOpacity style={estilos.botaoPerfil} onPress={defineCaminho}>
         <Image source={{ uri: photoUri }} style={estilos.fotoPerfil} />
      </TouchableOpacity>
   );
}

const estilos = StyleSheet.create({
   menuBar: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
      fontSize: 22,
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
   },
});
